import renderMethionine from "./amino acids/renderMethionine";
import renderPhenylalanine from './amino acids/renderPhenylalanine'
import renderGlycine from "./amino acids/renderGlycine";
import renderAlanine from "./amino acids/renderAlanine";
import renderIsoleucine from "./amino acids/renderIsoleucine";
import renderSerine from "./amino acids/renderSerine";
import renderCysteine from "./amino acids/renderCysteine";
import renderLysine from "./amino acids/renderLysine";
import renderArginine from "./amino acids/renderArginine";
import renderTryptophan from "./amino acids/renderTryptophan";
import renderProline from './amino acids/renderProline'
import renderLeucine from "./amino acids/renderLeucine";
import renderTyrosine from "./amino acids/renderTyrosine";
import renderValine from "./amino acids/renderValine";
import renderAsparticAcid from "./amino acids/renderAsparticAcid";
import renderGlutamicAcid from "./amino acids/renderGlutamicAcid";
import renderHistidine from "./amino acids/renderHistidine";
import renderAsparagine from "./amino acids/renderAsparagine";
import renderGlutamine from "./amino acids/renderGlutamine";
import renderThreonine from "./amino acids/renderThreonine";


export default function renderAminos (residues, keys, scene) {
    keys.forEach((key) => {
        residues[key].forEach((residue) => {
            if(residue) {
                switch (residue[0].residue) {
                case 'MET':
                    renderMethionine(residue, scene)
                    break;
                case 'PHE':
                    renderPhenylalanine(residue, scene)
                    break;
                case 'GLY':
                    renderGlycine(residue, scene)
                    break;
                case 'ALA':
                    renderAlanine(residue, scene)
                    break;
                case 'SER':
                    renderSerine(residue, scene)
                    break
                case 'CYS':
                    renderCysteine(residue, scene)
                    break;
                case 'LYS':
                    renderLysine(residue, scene)
                    break;
                case 'ARG':
                    renderArginine(residue, scene)
                    break
                case 'TRP':
                    renderTryptophan(residue, scene)
                    break
                case 'PRO':
                    renderProline(residue, scene)
                    break
                case 'LEU':
                    renderLeucine(residue, scene)
                    break
                case 'ILE':
                    renderIsoleucine(residue, scene)
                    break
                case 'TYR':
                    renderTyrosine(residue, scene)
                    break
                case 'VAL':
                    renderValine(residue, scene)
                    break
                case 'ASP':
                    console.log(residue)
                    renderAsparticAcid(residue, scene)
                    break
                case 'GLU':
                    renderGlutamicAcid(residue, scene)
                    break
                case 'HIS':
                    console.log(residue)
                    renderHistidine(residue, scene)
                    break
                case 'ASN':
                    renderAsparagine(residue, scene)
                    break
                case 'GLN':
                    console.log(residue)
                    renderGlutamine(residue, scene)
                    break
                case 'THR':
                    renderThreonine(residue, scene)
                    break
                default:
                    break;
            }}
        })   
    })

    return
}