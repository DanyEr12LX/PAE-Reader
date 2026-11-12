// ┌──────────────────────────────────────────────────────────────────┐ \\
// │            ────  ┌────────────────────┐  ────                    │ \\
// │            ────  │  Daniele  Piccolo  │  ────                    │ \\
// │            ────  └────────────────────┘  ────                    │ \\
// │ GitHub   : https://github.com/DanyEr12LX/                        │ \\
// │ LinkedIn : https://www.linkedin.com/in/daniele-piccolo-biomol/   │ \\
// │ ORCID    : https://orcid.org/0009-0000-3563-2292                 │ \\
// │ Mail     : daniele.piccolo98@gmail.com                           │ \\
// │                                                                  │ \\
// │ #  AlphaFold Predicted Aligned Error (PAE) matrix visualization. │ \\
// └──────────────────────────────────────────────────────────────────┘ \\



// UI component for defining residue ranges and their associated colors.
class RangePanel {
  
  constructor() {
    // Domain boundaries (1-based, full-closed residue indices) and their assigned hues.
    this.domain_ranges = [
      { idx: 1  , col: 210 },
      { idx: 41 , col: 200 },
      { idx: 597, col: 280 },
      { idx: 675, col: 40  },
      { idx: 696, col: 330 }]

    // Stores the hue assigned to each residue index.
    this.domini_indexed = []
    
    colorMode(HSB, 360, 1, 1);
    
    this.panel = createDiv();
    this.panel.addClass("range-panel");
    this.renderRangePanel();
  }

  // Generate the input controls for each domain range
  renderRangePanel() {
    this.panel.html("")
    
    this.domain_ranges.forEach((range, index) => {
      let row = createDiv();
      row.addClass("range-row");
      row.parent(this.panel);

      // Residue index input
      let idxInput = createInput(String(range.idx), "number");
      idxInput.parent(row);
      idxInput.input(() => {
        let value = Number(idxInput.value());
        value = constrain(value, 0, PAEData.data.length);
        this.domain_ranges[index].idx = value;
        idxInput.value(value);  
      });

      // Domain color picker
      let colorInput = createInput(color(range.col, 1, 1).toString('#rrggbb') , "color");
      colorInput.parent(row);
      colorInput.input(() => {
        this.domain_ranges[index].col = hue(color(colorInput.value()));
      });

      // Remove the selected range
      let removeButton = createButton("×");
      removeButton.parent(row);
      removeButton.mousePressed(() => {
        this.domain_ranges.splice(index, 1);
        this.renderRangePanel();
      });
    });

    // Add a new domain range
    let addButton = createButton("+ Add Range");
    addButton.addClass("add-range");
    addButton.parent(this.panel);
  
    addButton.mousePressed(() => {
      this.domain_ranges.push({
        idx: this.domain_ranges[this.domain_ranges.length - 1].idx + 5,
        col: 100
      });   
      this.renderRangePanel();
    });
  
     // Validate the ranges and apply the updated configuration
    let updateButton = createButton("Update");
    updateButton.addClass("add-range");
    updateButton.parent(this.panel);
    
    updateButton.mousePressed(() => {
      let ok = true;
      
      // Ensure that all boundary indices are strictly increasing
      for(let i = 1; i < this.domain_ranges.length; i++) {
        if(this.domain_ranges[i].idx <= this.domain_ranges[i-1].idx) {
          console.log("Range Error on index range " + i)
          ok = false
          break
        }
      }

      // Rebuild the residue-to-color mapping and redraw the matrix
      if(ok) {
        this.rangeIndexing()
        DrawGraph()
      }
    });
  }

  // Expand domain ranges into a residue-by-residue hue lookup array
  rangeIndexing() {
    this.domini_indexed = []
    
    for(let i = 0; i < this.domain_ranges.length; i++) {

      // Stop if the current boundary exceeds the matrix dimensions
      if(this.domain_ranges[i].idx > PAEData.data.length) {
        console.log("Range Over")
        break
      }

      // Determine the exclusive end index of the current range
      let s = (i == (this.domain_ranges.length - 1) 
               ? (PAEData.data.length + 1) 
               : this.domain_ranges[i+1].idx)

      // Calculate the number of residues covered by this range
      let q = s - this.domain_ranges[i].idx
      // Assign the range hue to all residues within its boundaries
      let h = this.domain_ranges[i].col
      
      this.domini_indexed = this.domini_indexed.concat(Array(q).fill(h))
    }
  }
}



