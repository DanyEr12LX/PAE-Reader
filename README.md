# PAE-Reader

An interactive **AlphaFold Predicted Aligned Error (PAE) matrix visualizer** built with `p5.js`, featuring visualization with `JSON` upload, customizable residue boundaries and colors, and adjustable display settings.

A sample dataset (`NLGN4X`) is loaded automatically.

Upload an **AlphaFold PAE JSON** file to visualize your own data.

## Live Demo

Try it directly in your browser:

- [**GitHub** Pages](https://danyer12lx.github.io/PAE-Reader/)
- [**p5.js** Web Editor](https://editor.p5js.org/DanyEr12LX/full/ygjGmG-QC)

## Input Data Format

PAE-Reader accepts JSON files from the [AlphaFold Protein Structure Database](https://alphafold.ebi.ac.uk/). The application reads `predicted_aligned_error` and `max_predicted_aligned_error` from the first element of the JSON array.

```json
[
  {
    "predicted_aligned_error": [
      [0, 1, 4],
      [1, 0, 3],
      [4, 3, 0]
    ],
    "max_predicted_aligned_error": 31.75
  }
]
```

## Run Locally

Requires Python 3 and an internet connection (p5.js is loaded from CDN).

```bash
git clone https://github.com/DanyEr12LX/PAE-Reader.git
cd PAE-Reader
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

## Technologies

[p5.js](https://p5js.org/) · JavaScript · [AlphaFold](https://alphafold.ebi.ac.uk/)

## Scientific References

- Jumper, J. et al. (2021). [Highly accurate protein structure prediction with AlphaFold](https://doi.org/10.1038/s41586-021-03819-2). *Nature*.
- Bertoni, D. et al. (2025). [AlphaFold Protein Structure Database 2025](https://doi.org/10.1093/nar/gkaf1226). *Nucleic Acids Research*.

Demo dataset: human Neuroligin-4, X-linked (NLGN4X), AlphaFold model AF-Q8N0W4-F1, version 6.

## License

Licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See [LICENSE](LICENSE).

## Contact

**Daniele Piccolo**

<div>
  <a href="https://github.com/DanyEr12LX/">
    <img src="https://raw.githubusercontent.com/DanyEr12LX/DanyEr12LX/refs/heads/main/icons/contacts/github.svg"   alt="GitHub"   title="GitHub"  width="55" height="55" /></a> 
  &nbsp;
  <a href="https://www.linkedin.com/in/daniele-piccolo-biomol">
    <img src="https://raw.githubusercontent.com/DanyEr12LX/DanyEr12LX/refs/heads/main/icons/contacts/linkedin.svg" alt="Linkedin" title="Linkedin" width="55" height="55" /></a> 
  &nbsp;
  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=daniele.piccolo98@gmail.com">
    <img src="https://raw.githubusercontent.com/DanyEr12LX/DanyEr12LX/refs/heads/main/icons/contacts/gmail.svg"    alt="GMail"    title="GMail"    width="55" height="55" /></a>
  &nbsp;
  <a href="https://orcid.org/0009-0000-3563-2292">
    <img src="https://raw.githubusercontent.com/DanyEr12LX/DanyEr12LX/refs/heads/main/icons/contacts/orcid.svg"   alt="ORCID"     title="ORCID"    width="55" height="55" /></a>
</div>

