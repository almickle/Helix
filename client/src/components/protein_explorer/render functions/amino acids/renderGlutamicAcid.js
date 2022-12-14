import { MeshBuilder, Vector3 } from "@babylonjs/core"
import renderSpheres from "../renderSpheres"

export default function renderGlutamicAcid (residue, scene) {

    if(residue.length === 14 || residue.length === 6 || residue.length === 10) {

    } else {
        const filteredResidue = residue.filter((atom) => atom.atom_type !== 'N' && atom.atom_type !== 'C' && atom.atom_type !== 'CA' && atom.atom_type !== 'O')
        const vectorAtoms = filteredResidue.map((atom) => new Vector3(atom.x, atom.y, atom.z))
        
        const main = residue.filter((atom) => atom.atom_type === 'N' || atom.atom_type === 'CA' || atom.atom_type === 'CB' || atom.atom_type === 'CG' || atom.atom_type === 'CD' || atom.atom_type === 'OE1').map((atom) => new Vector3(atom.x, atom.y, atom.z))
        const carboxy = residue.filter((atom) => atom.atom_type === 'CD' || atom.atom_type === 'OE2').map((atom) => new Vector3(atom.x, atom.y, atom.z))

        MeshBuilder.CreateTube('main', {path: main, radius: 0.2}, scene)
        MeshBuilder.CreateTube('main', {path: carboxy, radius: 0.2}, scene)

        renderSpheres(vectorAtoms, filteredResidue, scene)
    }

    return
}