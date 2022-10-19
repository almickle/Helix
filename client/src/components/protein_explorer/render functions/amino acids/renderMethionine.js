import { MeshBuilder, Vector3 } from "@babylonjs/core"
import renderSpheres from "../renderSpheres"


export default function renderMethionine (residue, scene) {
    
    const filteredResidue = residue.filter((atom) => atom.atom_type !== 'N' && atom.atom_type !== 'C' && atom.atom_type !== 'CA' && atom.atom_type !== 'O')
    const vectorAtoms = filteredResidue.map((atom) => new Vector3(atom.x, atom.y, atom.z))

    const main = residue.filter((atom) => atom.atom_type !== 'O' && atom.atom_type !== 'C').map((atom) => new Vector3(atom.x, atom.y, atom.z))

    MeshBuilder.CreateTube('main', {path: main, radius: 0.2}, scene)

    renderSpheres(vectorAtoms, filteredResidue, scene)

    return
}