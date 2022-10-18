import { MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core"


export default function renderSpheres(atomVectors, atoms, scene) {

    const oxygenMaterial = new StandardMaterial('material', scene)
                oxygenMaterial.diffuseColor = new Color3(.5, .5, .7);
                oxygenMaterial.specularColor = new Color3(1, 0.6, 0.87);
                oxygenMaterial.emissiveColor = new Color3(1, 0, 0);
                oxygenMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
    const carbonMaterial = new StandardMaterial('material', scene)
                carbonMaterial.diffuseColor = new Color3(.5, .5, .7);
                carbonMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                carbonMaterial.emissiveColor = new Color3(0.3, 0.3, 0.3);
                carbonMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
    const nitrogenMaterial = new StandardMaterial('material', scene)
                nitrogenMaterial.diffuseColor = new Color3(.5, .5, .7);
                nitrogenMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                nitrogenMaterial.emissiveColor = new Color3(0.2, 0, 1);
                nitrogenMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);
    const sulphurMaterial = new StandardMaterial('material', scene)
                sulphurMaterial.diffuseColor = new Color3(.5, .5, .7);
                sulphurMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
                sulphurMaterial.emissiveColor = new Color3(0.7, 0, .6);
                sulphurMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);


    atomVectors.forEach((vector, i) => {

        switch (atoms[i].atom) {
            case 'N':
                const nitrogen = MeshBuilder.CreateSphere('atom', {segments: 3, diameter: 0.9}, scene)
                nitrogen.setAbsolutePosition(vector)
                nitrogen.material = nitrogenMaterial
                break;
            case 'C':
                const carbon = MeshBuilder.CreateSphere('atom', {segments: 3, diameter: 1}, scene)
                carbon.setAbsolutePosition(vector)
                carbon.material = carbonMaterial
                break;
            case 'O':
                const oxygen = MeshBuilder.CreateSphere('atom', {segments: 3, diameter: 0.8}, scene)
                oxygen.setAbsolutePosition(vector)
                oxygen.material = oxygenMaterial
                break;
            case 'S':
                const sulphur = MeshBuilder.CreateSphere('atom', {segments: 3, diameter: 0.8}, scene)
                sulphur.setAbsolutePosition(vector)
                sulphur.material = sulphurMaterial
                break;
            default:
                break;
        }
    })

    return
}


// const chainDMaterial = new StandardMaterial('material', scene)
    //             chainDMaterial.diffuseColor = new Color3(.5, .5, .7);
    //             chainDMaterial.specularColor = new Color3(0.5, 0.6, 0.87);
    //             chainDMaterial.emissiveColor = new Color3(0, 1, 0);
    //             chainDMaterial.ambientColor = new Color3(0.23, 0.98, 0.53);