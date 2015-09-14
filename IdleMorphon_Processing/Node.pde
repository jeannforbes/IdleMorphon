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

  boolean insideNode(float nx, float ny) {
    if (radius > (float)Math.hypot(nx -x, ny -y)) {
      return true;
    }
    return false;
  }
  
  boolean insideNode(float nx, float ny, float r) {
    if (radius +r > (float)Math.hypot(nx -x, ny -y)) {
      return true;
    }
    return false;
  }

  void connect(Node n) {
    if (connectRadius > (float)Math.hypot(n.x - x, n.y - y) && n != this) {
      nodes.add(n);
    }
    else if(connectRadius < (float)Math.hypot(n.x - x, n.y - y) && n!= this){
      for(int i=0; i<nodes.size(); i++){
        if(nodes.get(i) == n){ nodes.remove(nodes.get(i)); }
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
    ellipse(x, y, connectRadius, connectRadius);
    
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