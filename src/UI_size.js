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


// UI component for defining plot sizes
class Size {
  constructor() {
    this.panel = createDiv();
    this.panel.addClass("range-panel");

    this.graph = 800;
    this.strip = 35;
    this.axis_w = 50;
    this.axis_interval = 50;

    // Graph size
    this.graphInput = this.createSetting("Graph size", 800, value => {
      this.graph = value;
    });

    // Marginal strip width
    this.stripInput = this.createSetting("Strip width", 35, value => {
      this.strip = value;
    });

    // Axis label interval
    this.axis_intervalInput = this.createSetting("Axis interval", 50, value => {
      this.axis_interval = value;
    });
  }

  // Create a labeled numeric input
  createSetting(label, initialValue, callback) {
    let row = createDiv();
    row.addClass("size-row");
    row.parent(this.panel);

    let textInput = createSpan(label);
    textInput.addClass("size-label");
    textInput.parent(row);

    let input = createInput(String(initialValue), "number");
    input.addClass("size-input");
    input.parent(row);

    input.input(() => {
      let value = Number(input.value());
      value = max(0, value);
      input.value(value);
      callback(value);
    });

    return input;
  }

  // Find and set the appropriate axis text size
  setTextSize() {
    let sizeText = 18;
    let c = 20;

    while (c > 0) {
      textSize(sizeText);

      this.axis_w = textWidth("0".repeat(String(PAEData.data.length).length));
      this.axis_w *= 1.25;

      if (this.axis_w > this.axis_interval) {
        sizeText--;
      } else {
        break;
      }

      c--;
    }
  }
}
