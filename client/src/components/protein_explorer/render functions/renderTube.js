import { Curve3, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core"


export default function renderTube(backboneVectors, keys=[], scene) {

    const chainAMaterial = new StandardMaterial('material', scene)
                chainAMaterial.diffuseColor = new Color3(.5, .5, .7);
                chainAMaterial.specularColor = new Color3(0.3, 0.4, 0.5);
                chainAMaterial.emissiveColor = new Color3(.1, .6, .7);
                chainAMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
    
    const chainBMaterial = new StandardMaterial('material', scene)
                chainBMaterial.diffuseColor = new Color3(.5, .5, .7);
                chainBMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                chainBMaterial.emissiveColor = new Color3(0, 0, 1);
                chainBMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

    const chainCMaterial = new StandardMaterial('material', scene)
                chainCMaterial.diffuseColor = new Color3(.5, .5, .7);
                chainCMaterial.specularColor = new Color3(1, 0.6, 0.87);
                chainCMaterial.emissiveColor = new Color3(1, 0, 0);
                chainCMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

    const chainDMaterial = new StandardMaterial('material', scene)
                chainDMaterial.diffuseColor = new Color3(.5, .5, .7);
                chainDMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                chainDMaterial.emissiveColor = new Color3(0, 1, 0);
                chainDMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

    const chainEMaterial = new StandardMaterial('material', scene)
                chainEMaterial.diffuseColor = new Color3(.5, .5, .7);
                chainEMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                chainEMaterial.emissiveColor = new Color3(0.5, 0.5, 0);
                chainEMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

    const chainFMaterial = new StandardMaterial('material', scene)
                chainFMaterial.diffuseColor = new Color3(.5, .5, .7);
                chainFMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                chainFMaterial.emissiveColor = new Color3(0.5, 0, 0.5);
                chainFMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);

    // const materials = keys.map((key) => {
    //     const material = new StandardMaterial('material', scene)
    //         material.diffuseColor = new Color3(0.5, 0.5, 0.7)
    //         material.specularColor = new Color3(0.5, 0.5, 0.7)
    //         material.emissiveColor = new Color3(0.5, 0.5, 0.7)
    //         material.ambientColor = new Color3(0.5, 0.5, 0.7)
    //     return material
    // })

    // const backboneCarbonNitrogen = backboneVectors.map((chain) => chain.map((residue, index, array) => {if(residue){ return [residue[0], residue[2]]} else return null}))
    
    const backboneSegments = backboneVectors.map((chain, index, array) => {
        const segments = [[]]
        let n = 0
        chain.forEach((residue, i, array) => {
            if(residue !== null) {
                segments[n].push(residue)
                if(array[i+1] === null) {
                    segments.push([])
                    n++
                }
            }
            if(array[array.length-1] === null && i === array.length-1) segments.pop()
        })
        return segments
    })


    backboneSegments.forEach((chain, index) => {
        chain.forEach((segment) => {
            let array = []
            segment.forEach((residue) => array = [...array, ...residue])
            const spline = Curve3.CreateCatmullRomSpline(array, 4)
            const peptide = MeshBuilder.CreateTube('segment', { path: spline.getPoints(), radius: 0.5, cap: 3}, scene)
            switch (keys[index]) {
                case 'A':
                    peptide.material = chainAMaterial
                    break;
                case 'B':
                    peptide.material = chainBMaterial
                    break;
                case 'C':
                    peptide.material = chainCMaterial
                    break;
                case 'D':
                    peptide.material = chainDMaterial
                    break;
                case 'E':
                    peptide.material = chainDMaterial
                    break;
                case 'F':
                    peptide.material = chainEMaterial
                    break;
                default:
                    break;
            }
        })
    })
}


// backboneSegments.forEach((chain) => {
    //     chain.forEach((segment) => {
    //         segment.forEach((residue, i, array) => {
    //             if(i === 0) {
    //                 const amino = residue
    //                 amino.push(array[i+1][0])
    //                 const spline = Curve3.CreateCatmullRomSpline(amino, 4)
    //                 // MeshBuilder.CreateLines('line', { points: amino }, scene)
    //                 MeshBuilder.CreateTube('residue', { path: spline.getPoints(), radius: 0.5}, scene)
    //             }
    //             if(i === array.length-1) {
    //                 const amino = residue
    //                 // amino.unshift(array[i-1][2])
    //                 const spline = Curve3.CreateCatmullRomSpline(amino, 4)
    //                 // MeshBuilder.CreateLines('line', { points: amino }, scene)
    //                 MeshBuilder.CreateTube('residue', { path: spline.getPoints(), radius: 0.5}, scene)
    //             }
    //             if(i !== array.length-1 && i !== 0) {
    //                 const amino = residue
    //                 amino.push(array[i+1][0]); // amino.unshift(array[i-1][2])
    //                 const spline = Curve3.CreateCatmullRomSpline(amino, 4)
    //                 console.log(spline)
    //                 // MeshBuilder.CreateLines('line', { points: amino }, scene)
    //                 MeshBuilder.CreateTube('residue', { path: spline.getPoints(), radius: 0.5}, scene)
    //             }
    //         })
    //     })
    // })