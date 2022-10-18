import { MeshBuilder, Vector3 } from "@babylonjs/core"
import renderSpheres from "../renderSpheres"

export default function renderAsparticGlutamicAcid (residue, scene) {

    const vectorAtoms = residue.map((atom) => new Vector3(atom.x, atom.y, atom.z))
    
    const main = residue.filter((atom) => atom.atom_type === 'N' || atom.atom_type === 'CA' || atom.atom_type === 'CB' || atom.atom_type === 'CG' || atom.atom_type === 'CD' || atom.atom_type === 'OE1').map((atom) => new Vector3(atom.x, atom.y, atom.z))
    const carbonyl = residue.filter((atom) => atom.atom_type === 'O' || atom.atom_type === 'C' || atom.atom_type === 'CA').map((atom) => new Vector3(atom.x, atom.y, atom.z))
    const carboxy = residue.filter((atom) => atom.atom_type === 'CD' || atom.atom_type === 'OE2').map((atom) => new Vector3(atom.x, atom.y, atom.z))

    MeshBuilder.CreateTube('main', {path: main, radius: 0.2}, scene)
    MeshBuilder.CreateTube('main', {path: carbonyl, radius: 0.2}, scene)
    MeshBuilder.CreateTube('main', {path: carboxy, radius: 0.2}, scene)

    renderSpheres(vectorAtoms, residue, scene)

    return
}