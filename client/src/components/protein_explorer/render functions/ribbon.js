

export default function renderRibbon ( {backbones} ) {

    const offset = 1
        const offsetPoints = backbones[chain].map((atom) => {
            return (
                new Vector3(atom.x+offset, atom.y, atom.z)
            )
        })

        const ribbon = MeshBuilder.CreateRibbon('ribbon', { pathArray: [splinePoints, offsetPoints], closeArray: true }, scene)   

}

 // const myCurve = Curve3.CreateCatmullRomSpline(splinePoints, 10, false)
            // const offsetCurve = Curve3.CreateCatmullRomSpline(offsetPoints, 10, false)
            // // MeshBuilder.CreateLines(`chain ${index}`, {points: myCurve.getPoints() }, scene)
    
            // // console.log(myCurve.getPoints)
    
            // const ribbon = MeshBuilder.CreateRibbon('ribbon', { pathArray: [myCurve.getPoints(), offsetCurve.getPoints()], offset: 0, closeArray: true }, scene)
            
            // const tube = MeshBuilder.CreateTube('tube', { path: splinePoints, radius: 1, cap: 3 }, scene)
            // const tube2 = MeshBuilder.CreateTube('tube', { path: myCurve.getPoints(), radius: 0.8, cap: 3 }, scene)
            //       tube.setPivotPoint(centroid)

// const myMesh = ribbon
            //       switch (chain) {
            //         case 'A':
            //             myMesh.material = chainAMaterial
            //             break;
            //         case 'B':
            //             myMesh.material = chainBMaterial
            //             break;
            //         case 'C':
            //             myMesh.material = chainCMaterial
            //             break;
            //         case 'D':
            //             myMesh.material = chainDMaterial
            //             break;
            //         case 'E':
            //                 myMesh.material = chainEMaterial
            //                 break;
            //         case 'F':
            //             myMesh.material = chainFMaterial
            //             break;
            //         default:
            //             myMesh.material = chainAMaterial
            //             break;
            //       }