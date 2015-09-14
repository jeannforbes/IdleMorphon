class Node {

  ArrayList<Node> nodes;
  float x, y, radius, connectRadius;
  boolean selected;

  public Node(float x, float y) {
    this.x = x;
    this.y = y;
    radius = 20;
    connectRadius = 70;

    nodes = new ArrayList<Node>();
  }

  //Checks if the coords are inside the node
  boolean insideNode(float nx, float ny) {
    if (radius > (float)Math.hypot(nx -x, ny -y)) {
      return true;
    }
    return false;
  }
  
  //Checks if the coords are inside a given radius to the node
  boolean insideNode(float nx, float ny, float r) {
    if (radius +r > (float)Math.hypot(nx -x, ny -y)) {
      return true;
    }
    return false;
  }

  //Adds a connection to the node if that node is within the connectRadius
  void connect(Node n) {
    
    float dist = (float)Math.hypot(n.x - x, n.y - y);
    
    if (connectRadius > dist && n!= this) {
      nodes.add(n);
    }
    else if(connectRadius < dist && n!= this){
      for(int i=0; i<nodes.size(); i++){
        nodes.remove(n);
      }
    }
  }

  void display() {
    if (!selected) {
      stroke(0);
      fill(0, 0);
    } else {
      stroke(120);
      fill(0, 0);
    }
    ellipseMode(RADIUS);
    ellipse(x, y, radius, radius);

    stroke(0, 0);
    fill(color(0, 0, 0, 10));
    //ellipse(x, y, connectRadius, connectRadius);
    
    if (!selected) {
      stroke(0);
    } else {
      stroke(120);
    }
    for (Node n : nodes) {
      line(x, y, n.x, n.y);
    }
  }
}