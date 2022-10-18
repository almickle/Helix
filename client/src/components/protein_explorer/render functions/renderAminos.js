import renderMethionine from "./amino acids/renderMethionine";
import renderPhenylalanine from './amino acids/renderPhenylalanine'
import renderGlycine from "./amino acids/renderGlycine";
import renderAlanine from "./amino acids/renderAlanine";
import renderIsoleucine from "./amino acids/unfinished/renderIsoleucine";
import renderSerine from "./amino acids/renderSerine";
import renderCysteine from "./amino acids/renderCysteine";
import renderLysine from "./amino acids/renderLysine";
import renderArginine from "./amino acids/renderArginine";
import renderTryptophan from "./amino acids/renderTryptophan";
import renderProline from './amino acids/renderProline'


export default function renderAminos (residues, keys, scene) {
    keys.forEach((key) => {
        residues[key].forEach((residue) => {
            if(residue) {
                switch (residue[0].residue) {
                // case 'MET':
                //     renderMethionine(residue, scene)
                //     break;
                // case 'PHE':
                //     renderPhenylalanine(residue, scene)
                //     break;
                // case 'GLY':
                //     renderGlycine(residue, scene)
                //     break;
                // case 'ALA':
                //     renderAlanine(residue, scene)
                //     break;
                // case 'SER':
                //     renderSerine(residue, scene)
                //     break
                // case 'CYS':
                //     renderCysteine(residue, scene)
                //     break;
                // case 'LYS':
                //     renderLysine(residue, scene)
                //     break;
                // case 'ARG':
                //     renderArginine(residue, scene)
                //     break
                // case 'TRP':
                //     renderTryptophan(residue, scene)
                //     break
                case 'PRO':
                    console.log(residue)
                    renderProline(residue, scene)
                    break
                default:
                    break;
            }}
        })   
    })

    return
}