import { MeshBuilder, Vector3 } from "@babylonjs/core"
import renderSpheres from "../renderSpheres"


export default function renderTyrosine (residue, scene) {

    const filteredResidue = residue.filter((atom) => atom.atom_type !== 'N' && atom.atom_type !== 'C' && atom.atom_type !== 'CA' && atom.atom_type !== 'O')
    const vectorAtoms = filteredResidue.map((atom) => new Vector3(atom.x, atom.y, atom.z))
    
    const main = residue.filter((atom) => atom.atom_type === 'N' || atom.atom_type === 'CA' || atom.atom_type === 'CB' || atom.atom_type === 'CG' || atom.atom_type === 'CD1' || atom.atom_type === 'CE1' || atom.atom_type === 'CZ' || atom.atom_type === 'OH').map((atom) => new Vector3(atom.x, atom.y, atom.z))
    const phenyl = residue.filter((atom) => atom.atom_type === 'CG' || atom.atom_type === 'CD2' || atom.atom_type === 'CE2' || atom.atom_type === 'CZ').map((atom) => new Vector3(atom.x, atom.y, atom.z))

    MeshBuilder.CreateTube('main', {path: main, radius: 0.2}, scene)
    MeshBuilder.CreateTube('main', {path: phenyl, radius: 0.2}, scene)

    renderSpheres(vectorAtoms, filteredResidue, scene)

    return
}