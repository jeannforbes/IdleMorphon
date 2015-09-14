ArrayList<Node> nodes;
boolean dragging, draggingNode; 
float dragX, dragY;

void setup() {
  nodes = new ArrayList<Node>();

  size(500, 500);
}

void mouseClicked() {
  boolean insideNode = false, unselect = false;
  for (Node n : nodes) {
    if (n.insideNode(mouseX, mouseY)) { 
      insideNode = true;
      n.selected = true;
    }
  }
  if (!insideNode) {
    for (Node n : nodes) {
      if (n.selected) {
        unselect = true; 
        n.selected = false;
      }
    }
    if (!unselect) {
      nodes.add(new Node(mouseX, mouseY));
    }
  }
}

void mousePressed() {
  dragging = true;
  draggingNode = false;
  for (Node n : nodes) {
    if (n.insideNode(mouseX, mouseY)) { 
      dragging = false;
      draggingNode = true;
    }
  }
  dragX = mouseX; 
  dragY = mouseY;
}

void mouseReleased() {
  dragging = false;
  draggingNode = false;
}

void step(Node n) {
  if (dragging) {
    fill(0, 5);
    stroke(0);
    rectMode(CORNERS);
    rect(mouseX, mouseY, dragX, dragY);
  }

  if (insideRect(n.x, n.y, dragX, dragY, mouseX, mouseY)) {
    n.selected = true;
  } else if (dragging) {
    n.selected = false;
  }

  if (draggingNode && n.selected) {
    n.x += mouseX - pmouseX;
    n.y += mouseY - pmouseY;
  }

  for (Node m : nodes) {
    n.connect(m);
    if (n.insideNode(m.x, m.y, 30) && !n.selected && !m.selected) {
      if (n.x > m.x) {
        n.x++; 
        m.x--;
      } else {
        n.x--; 
        m.x++;
      }
      if (n.y > m.y) { 
        n.y++; 
        m.y--;
      } else {
        n.y--; 
        m.y++;
      }
    }
  }
}

void draw() {
  background(255);

  for (Node n : nodes) {
    n.display();
    step(n);
  }
}

boolean insideRect(float a, float b, float c, float d, float e, float f) {
  float x1 = Math.min(c, e);
  float x2 = Math.max(c, e);
  float y1 = Math.min(d, f);
  float y2 = Math.max(d, f);

  if (a > x1 && a < x2 && b <y2 && b > y1) { 
    return true;
  }
  return false;
}