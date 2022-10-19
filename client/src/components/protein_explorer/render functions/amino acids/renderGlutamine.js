import { MeshBuilder, Vector3 } from "@babylonjs/core"
import renderSpheres from "../renderSpheres"


export default function renderGlutamine (residue, scene) {
    
    if(residue.length === 14) {
        const configurationResidue = residue.filter((atom, i) => i === 0 || i === 1 || i === 2 || i === 3 || i === 5 || i === 7 || i === 9 || i === 11 | i === 13 )
        const filteredResidue = configurationResidue.filter((atom) => atom.atom_type !== 'N' && atom.atom_type !== 'C' && atom.atom_type !== 'CA' && atom.atom_type !== 'O')
        const vectorAtoms = filteredResidue.map((atom) => new Vector3(atom.x, atom.y, atom.z))

        const main = configurationResidue.filter((atom) => atom.atom_type === 'N' || atom.atom_type === 'CA' || atom.atom_type === 'CB' || atom.atom_type === 'CG' || atom.atom_type === 'CD' || atom.atom_type === 'NE2').map((atom) => new Vector3(atom.x, atom.y, atom.z))
        const amide = configurationResidue.filter((atom) => atom.atom_type === 'CD' || atom.atom_type === 'OE1').map((atom) => new Vector3(atom.x, atom.y, atom.z))

        MeshBuilder.CreateTube('main', {path: main, radius: 0.2}, scene)
        MeshBuilder.CreateTube('main', {path: amide, radius: 0.2}, scene)

        renderSpheres(vectorAtoms, filteredResidue, scene)

    } else {
        const filteredResidue = residue.filter((atom) => atom.atom_type !== 'N' && atom.atom_type !== 'C' && atom.atom_type !== 'CA' && atom.atom_type !== 'O')

        const vectorAtoms = filteredResidue.map((atom) => new Vector3(atom.x, atom.y, atom.z))
        const main = residue.filter((atom) => atom.atom_type === 'N' || atom.atom_type === 'CA' || atom.atom_type === 'CB' || atom.atom_type === 'CG' || atom.atom_type === 'CD' || atom.atom_type === 'NE2').map((atom) => new Vector3(atom.x, atom.y, atom.z))
        const amide = residue.filter((atom) => atom.atom_type === 'CD' || atom.atom_type === 'OE1').map((atom) => new Vector3(atom.x, atom.y, atom.z))

        MeshBuilder.CreateTube('main', {path: main, radius: 0.2}, scene)
        MeshBuilder.CreateTube('main', {path: amide, radius: 0.2}, scene)

        renderSpheres(vectorAtoms, filteredResidue, scene)
    }

    return
}