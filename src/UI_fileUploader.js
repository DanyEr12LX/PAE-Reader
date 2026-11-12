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



// UI component for uploading and loading AlphaFold PAE JSON files.
class FileUploader {
  constructor() {
    this.panel = createDiv() 
    this.panel.addClass("range-panel");  

    // Create the file input and register its event handler
    this.uploader = createFileInput(
      file => this.JSONhandler(file)
    )
    
    this.uploader.parent(this.panel);
  }

  // Parse an uploaded JSON file and update the PAE matrix
  JSONhandler(file) {
    console.log(file)
    if (file.type === "application" && file.subtype === "json") {
      PAEData = {
        maxV: file.data[0].max_predicted_aligned_error,
        data: file.data[0].predicted_aligned_error
      }
      DrawGraph()
    }
  }

  // Load the default demonstration dataset
  loadDemo() {
    // demo: Neuroligin-4, X-linked, AlphaFold
    //       https://alphafold.ebi.ac.uk/entry/AF-Q8N0W4-F1
    //       see "citations.txt"
    
    loadJSON("demo.json", data => {
      PAEData = {
        maxV: data[0].max_predicted_aligned_error,
        data: data[0].predicted_aligned_error
      }
      DrawGraph()
    })   
  }
}
