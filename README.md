<div>
  <img src="./client/src/components/genome_explorer/assets/DNAIcon.png" width="40" />
  <span style="margin-bottom:20px">Helix Genomes</span>
</div>

Helix Genomes is an application designed to provide an intuitive way to interface with genetic information. This includes gene sequences, transcripts, and protein sequences. Additionally, navigating to the protein viewing tab displays a 3-dimensional representation of a given protein structure located via PDB ID. Functionality to be added in the future includes: BLAST sequence alignment, a sequence edititor, and more 3D functionality.

The navbar located above the sequence includes tools used to interact with the sequence. The copy icon copies the current sequence to clipboard, the bookmark icon adds the sequence to the user's library (must have account to use), the paint icon enables annotating of the sequence, the book icon shows annotations that have been made by the user, the DNA magnifying glass icon shows sequence features (pink is exon, green is CDS). The search bar in the sequence navbar allows the selection of a particular region of the given sequence. The search bar in the top header allows searching of genes by symbol. 

The panel on the lefthand side of the screen shows the current selection and the user's library. Clicking on either tab opens a dropdown menu showing the gene symbol, all associated transcripts, and their protein products (non-coding rna if the transcript is non-coding). The panel on the far left is for navigation to other parts of the site. Currently, only sequence-viewer and protein-viewer are available.

The protein-viewer, accessed by the alpha-helix icon in the left corner, shows 3D visualizations of proteins. Functionality here is limited as development is still in progress. However, the tool still enables viewing of many PDB entries, though some fail due to either a parsing error in the file or rendering error on the frontend. Fixes are planned for both fronts. If interested in the PDB parsing utility visit my package on npm at https://www.npmjs.com/package/mmcif-parser or github https://github.com/almickle/mmCIF-parser. Additionally, the GUI is non-functional, though this is also planned in the future. Nonetheless, the renderings are beautiful and hopefully are enjoyed for what they are.

The application is still in development and many of the features are not fully functional. Nonetheless, the base functionality is there. Feel free to explore the application at https://www.helixgenomes.com. Please view on desktop.

