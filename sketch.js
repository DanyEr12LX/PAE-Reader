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
  fileUploader = new FileUploader()
  fileUploader.loadDemo()
  
  size = new Size()
  
  rangePanel = new RangePanel()
  
  createCanvas(size.graph + size.strip + size.axis_w, 
               size.graph + size.strip + size.axis_w);
  noLoop();

}


// Draw the PAE matrix and its annotations
function DrawGraph() { 
  // find correct text size and
  size.setTextSize()
  
  resizeCanvas(size.graph + size.strip + size.axis_w, 
               size.graph + size.strip + size.axis_w);
  
  background(255);
  colorMode(HSB, 360, 1, 1);
  noStroke();
  resetMatrix();
  translate(size.strip + size.axis_w, size.strip + size.axis_w);

  let w = size.graph / PAEData.data.length
  
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
      square(x * w, y * w, w);
    }  
  }

  // Grid lines
  strokeWeight(0.5);
  stroke(0, 0, 0.5);
  noFill();
  drawingContext.setLineDash([5]);
  for(let i = 0; i < PAEData.data.length; i += size.axis_interval ) {
    line(0, i * w, size.graph, i * w)
    line(i * w, 0, i * w, size.graph)  
  }
  drawingContext.setLineDash([0]);
 
  // Domain Boundaries
  noFill();
  strokeWeight(1);
  for(let p of rangePanel.domain_ranges) {
    stroke(p.col, 1, 1)
    line(0, w * (p.idx-1), w * (p.idx-1), w * (p.idx-1))
    line(w * (p.idx-1), 0, w * (p.idx-1), w * (p.idx-1))
  }
 
  // Marginal color strips to indicate domain assignments
  resetMatrix();
  translate(size.axis_w, size.axis_w);
  for(let p of rangePanel.domain_ranges) {
    fill(p.col, 1, 1)
    stroke(p.col, 1, 0.5);
    rect(0, w * (p.idx-1) + size.strip, size.strip, height)
    rect(w * (p.idx-1) + size.strip, 0, width, size.strip)
  }
 
  // Residue Indices along both matrix axes
  resetMatrix();
  noStroke();
  fill(1, 0, 0);
  for(let y = 0; y < PAEData.data.length; y+= size.axis_interval) {    
    // vertical axis
    textAlign(RIGHT, CENTER);
    text(y, size.axis_w * 0.875, w * y + size.strip + size.axis_w)

    // horizontal axis
    textAlign(CENTER, BOTTOM);
    text(y, w * y + size.strip + size.axis_w, size.axis_w * 0.875)
  }
}
