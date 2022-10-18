import { MeshBuilder, Vector3 } from "@babylonjs/core"
import renderSpheres from "../renderSpheres"

export default function renderTryptophan (residue, scene) {

    const vectorAtoms = residue.map((atom) => new Vector3(atom.x, atom.y, atom.z))
    
    const main = residue.filter((atom) => atom.atom_type === 'N' || atom.atom_type === 'CA' || atom.atom_type === 'CB' || atom.atom_type === 'CG' || atom.atom_type === 'CD2' || atom.atom_type === 'CE2' || atom.atom_type === 'CZ2' || atom.atom_type === 'CH2').map((atom) => new Vector3(atom.x, atom.y, atom.z))
    const carbonyl = residue.filter((atom) => atom.atom_type === 'O' || atom.atom_type === 'C' || atom.atom_type === 'CA').map((atom) => new Vector3(atom.x, atom.y, atom.z))
    const phenyl = residue.filter((atom) => atom.atom_type === 'CD2' || atom.atom_type === 'CE3' || atom.atom_type === 'CZ3' || atom.atom_type === 'CH2').map((atom) => new Vector3(atom.x, atom.y, atom.z))
    const imine = residue.filter((atom) => atom.atom_type === 'CG' || atom.atom_type === 'CD1' || atom.atom_type === 'NE1' || atom.atom_type === 'CE2').map((atom) => new Vector3(atom.x, atom.y, atom.z))

    MeshBuilder.CreateTube('main', {path: main, radius: 0.2}, scene)
    MeshBuilder.CreateTube('main', {path: carbonyl, radius: 0.2}, scene)
    MeshBuilder.CreateTube('main', {path: phenyl, radius: 0.2}, scene)
    MeshBuilder.CreateTube('main', {path: imine, radius: 0.2}, scene)

    renderSpheres(vectorAtoms, residue, scene)

    return
}