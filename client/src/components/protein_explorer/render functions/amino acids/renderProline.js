import { MeshBuilder, Vector3 } from "@babylonjs/core"
import renderSpheres from "../renderSpheres"

export default function renderProline (residue, scene) {

    const filteredResidue = residue.filter((atom) => atom.atom_type !== 'N' && atom.atom_type !== 'C' && atom.atom_type !== 'CA' && atom.atom_type !== 'O')
    const vectorAtoms = filteredResidue.map((atom) => new Vector3(atom.x, atom.y, atom.z))
    
    const main = residue.filter((atom) => atom.atom_type === 'N' || atom.atom_type === 'CA' || atom.atom_type === 'CB' || atom.atom_type === 'CG' || atom.atom_type === 'CD').map((atom) => new Vector3(atom.x, atom.y, atom.z))
    const amine = residue.filter((atom) => atom.atom_type === 'CD' || atom.atom_type === 'N').map((atom) => new Vector3(atom.x, atom.y, atom.z))

    MeshBuilder.CreateTube('main', {path: main, radius: 0.2}, scene)
    MeshBuilder.CreateTube('main', {path: amine, radius: 0.2}, scene)

    renderSpheres(vectorAtoms, filteredResidue, scene)

    return
}