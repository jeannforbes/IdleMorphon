var width = 1200,
    height = 750,
    fill = d3.scale.category20();

//Node Types
var currentNodeType = 0,
    nodeTypes = ["node", "storage", "collector"];
    nodeSizes = [20, 30, 10]
    nodeCost = [5, 100, 20];

//Resources
var resourceOrange = 200, resourceOrangeCap = 250;

//BASIC GRAPH FUNCTIONALITY
var selected_node = null,
    selected_link = null,
    mousedown_link = null,
    mousedown_node = null,
    mouseup_node = null;

var outer = d3.select("#svgcontainer")
  .append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .attr("pointer-events", "all");

var vis = outer
  .append('svg:g')
    .call(d3.behavior.zoom().on("zoom", rescale))
    .on("dblclick.zoom", null)
  .append('svg:g')
    .on("mousemove", mousemove)
    .on("mousedown", mousedown)
    .on("mouseup", mouseup);

vis.append('svg:rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'white');

var force = d3.layout.force()
    .size([width, height])
    .nodes([{}])
    .linkDistance(100)
    .charge(-200)
    .on("tick", tick);

var drag_line = vis.append("line")
    .attr("class", "drag_line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", 0);

var nodes = force.nodes(),
    links = force.links(),
    node = vis.selectAll(".node"),
    link = vis.selectAll(".link");

d3.select(window)
    .on("keydown", keydown);

redraw();

function mousedown() {
  if (!mousedown_node && !mousedown_link) {
    // allow panning if nothing is selected
    vis.call(d3.behavior.zoom().on("zoom"), rescale);
    return;
  }
}

function mousemove() {
  if (!mousedown_node) return;

  // update drag line
  drag_line
      .attr("x1", mousedown_node.x)
      .attr("y1", mousedown_node.y)
      .attr("x2", d3.svg.mouse(this)[0])
      .attr("y2", d3.svg.mouse(this)[1]);

}

function mouseup() {
  if (mousedown_node) {
    drag_line
      .attr("class", "drag_line_hidden")

    if (!mouseup_node && resourceOrange >= nodeCost[currentNodeType]) {
      var point = d3.mouse(this),
        node = {x: point[0], y: point[1]},
        n = nodes.push(node);

      selected_node = node;
      selected_link = null;
      
      links.push({source: mousedown_node, target: node});

      resourceOrange -= nodeCost[currentNodeType];
    }

    redraw();
  }
  resetMouseVars();
}

function resetMouseVars() {
  mousedown_node = null;
  mouseup_node = null;
  mousedown_link = null;
}

//Updates every tick!
function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

window.setInterval(collectResources(), 3000);

function collectResources(){
  var addOrange = 0;
  var collectors = document.getElementsByClassName('collector');
  for(var i=0; i<collectors.length; i++){
    addOrange += 0.01;
  }

  resourceOrange += addOrange;

  //Update gauges
  //gaugeOrange.update(((resourceOrange*100)/resourceOrangeCap).toFixed(0));
  console.log(resourceOrange);
}

function rescale() {
  trans=d3.event.translate;
  scale=d3.event.scale;

  vis.attr("transform",
      "translate(" + trans + ")"
      + " scale(" + scale + ")");
}

function redraw() {

  link = link.data(links);

  link.enter().insert("line", ".node")
      .attr("class", "link")
      .on("mousedown", 
        function(d) { 
          mousedown_link = d; 
          if (mousedown_link == selected_link) selected_link = null;
          else selected_link = mousedown_link; 
          selected_node = null; 
          redraw(); 
        })

  link.exit().remove();

  link
    .classed("link_selected", function(d) { return d === selected_link; });

  node = node.data(nodes);

  node.enter().insert("circle")
      .attr("class", nodeTypes[currentNodeType])
      .attr("r", nodeSizes[currentNodeType])
      .on("mousedown", 
        function(d) { 
          // disable zoom
          vis.call(d3.behavior.zoom().on("zoom"), null);

          mousedown_node = d;
          if (mousedown_node == selected_node) selected_node = null;
          else selected_node = mousedown_node; 
          selected_link = null; 

          // reposition drag line
          drag_line
              .attr("class", "link")
              .attr("x1", mousedown_node.x)
              .attr("y1", mousedown_node.y)
              .attr("x2", mousedown_node.x)
              .attr("y2", mousedown_node.y);

          redraw(); 
        })
      .on("mousedrag",
        function(d) {
          // redraw();
        })
      .on("mouseup", 
        function(d) { 
          if (mousedown_node) {
            mouseup_node = d; 
            if (mouseup_node == mousedown_node) { resetMouseVars(); return; }

            // add link
            var link = {source: mousedown_node, target: mouseup_node};
            links.push(link);

            // select new link
            selected_link = link;
            selected_node = null;

            // enable zoom
            vis.call(d3.behavior.zoom().on("zoom"), rescale);
            redraw();
          } 
        });

  node.exit().transition()
      .attr("r", 0)
    .remove();

  node
    .classed("node_selected", function(d) { return d === selected_node; });

  

  if (d3.event) {
    d3.event.preventDefault();
  }

  force.start();

}

function spliceLinksForNode(node) {
  toSplice = links.filter(
    function(l) { 
      return (l.source === node) || (l.target === node); });
  toSplice.map(
    function(l) {
      links.splice(links.indexOf(l), 1); });
}

function keydown() {
  //if (!selected_node && !selected_link) return;
  switch (d3.event.keyCode) {
    case 8: // backspace
    case 46: { // delete
      if (selected_node) {
        nodes.splice(nodes.indexOf(selected_node), 1);
        spliceLinksForNode(selected_node);
      }
      else if (selected_link) {
        links.splice(links.indexOf(selected_link), 1);
      }
      selected_link = null;
      selected_node = null;
      redraw();
      break;
    }
    case 32: {
      currentNodeType++;
      if(currentNodeType > nodeTypes.length-1){currentNodeType = 0;}
      console.log(nodeTypes[currentNodeType]);
    }
  }
}