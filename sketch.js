// ┌────────────────────────────────────────────────────────────┐ \\
// │            ────  ┌────────────────────┐  ────                 │ \\
// │            ────  │   Daniele  Piccolo   │  ────                 │ \\
// │            ────  └────────────────────┘  ────                 │ \\
// │ GitHub   : https://github.com/DanyEr12LX/                        │ \\
// │ LinkedIn : https://www.linkedin.com/in/daniele-piccolo-biomol/   │ \\
// │ ORCID    : https://orcid.org/0009-0000-3563-2292                 │ \\
// │ Mail     : daniele.piccolo98@gmail.com                           │ \\
// │                                                                  │ \\
// │ #  AlphaFold Predicted Aligned Error (PAE) matrix visualization. │ \\
// └────────────────────────────────────────────────────────────┘ \\



// UI components
let fileUploader; // Handles JSON file uploads
let rangePanel;   // Manages domain boundaries and colors
let size;

// PAE data loaded from the JSON file
let PAEData;


function setup() {
  size = new Size();
  
  createCanvas(size.graph + size.strip + size.axis_w, 
               size.graph + size.strip + size.axis_w);
  noLoop();

  // Right container
  let sidebar = createDiv();
  sidebar.addClass("sidebar");

  fileUploader = new FileUploader();
  fileUploader.panel.parent(sidebar);
  fileUploader.loadDemo();
  
  size.panel.parent(sidebar);
  
  rangePanel = new RangePanel();
  rangePanel.panel.parent(sidebar);
}


// Draw the PAE matrix and its annotations
function DrawGraph() { 
  // find correct text size and
  size.setTextSize()
  rangePanel.rangeIndexing()
  
  resizeCanvas(size.graph + size.strip + size.axis_w + size.axis_w * 0.5, 
               size.graph + size.strip + size.axis_w + size.axis_w * 0.5);
  
  background(255);
  colorMode(HSB, 360, 1, 1);
  rectMode(CORNER)
  noStroke();
  resetMatrix();
  translate(size.strip + size.axis_w, size.strip + size.axis_w);
  
  // Draw the PAE matrix using a color map:
  // - Hue represents the residue domain.
  // - Saturation represents the normalized PAE value.
  for(let y = 0; y < PAEData.data.length; y++) {
    for(let x = 0; x < PAEData.data.length; x++) {   
      let s = 1 - (PAEData.data[y][x] / PAEData.maxV);
      let mx = max(x, y)
      let col = mx < rangePanel.domini_indexed.length 
        ? rangePanel.domini_indexed[max(x, y)] 
        : 0
      
      fill(col, s, 1)
      square(x * size.w, y * size.w, size.w);
    }  
  }

  // Grid lines
  strokeWeight(0.5);
  stroke(0, 0, 0.5);
  noFill();
  drawingContext.setLineDash([5]);
  for(let i = 0; i < PAEData.data.length; i += size.axis_interval ) {
    line(0, i * size.w, size.graph, i * size.w)
    line(i * size.w, 0, i * size.w, size.graph)  
  }
  drawingContext.setLineDash([0]);
 
  // Plot Domain Boundaries
  noFill();
  strokeWeight(1);
  for(let p of rangePanel.domain_ranges) {
    stroke(p.col, 1, 1)
    line(0, size.w * (p.idx-1), size.w * (p.idx-1), size.w * (p.idx-1))
    line(size.w * (p.idx-1), 0, size.w * (p.idx-1), size.w * (p.idx-1))
  }
 
  // Marginal color strips to indicate domain assignments
  rectMode(CORNERS)
  for(let p of rangePanel.domain_ranges) {
    fill(p.col, 1, 1)
    stroke(p.col, 1, 0.5);
    
    rect(-size.strip, size.w * (p.idx-1), 0, size.w * PAEData.data.length)
    rect(size.w * (p.idx-1), -size.strip, size.w * PAEData.data.length, 0)
  }
 
  // Residue Indices along both matrix axes
  resetMatrix();
  noStroke();
  fill(1, 0, 0);
  for(let y = 0; y < PAEData.data.length; y+= size.axis_interval) {    
    // vertical axis
    textAlign(RIGHT, CENTER);
    text(y, size.axis_w * 0.875, size.w * y + size.strip + size.axis_w)

    // horizontal axis
    textAlign(CENTER, BOTTOM);
    text(y, size.w * y + size.strip + size.axis_w, size.axis_w * 0.875)
  }
}
