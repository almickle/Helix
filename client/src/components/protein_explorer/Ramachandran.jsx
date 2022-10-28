import { useState } from "react"
import Chart from "react-apexcharts"
import { useEffect } from "react"

export default function Ramachandran ( { proteinData } ) {

    // const [proteinData, setProteinData] = useState({torsion_angles: {A: []}})
    const [torsionAngles, setTorsionAngles] = useState()


    useEffect(() => { // needs work
        const ta = Object.keys(proteinData.torsion_angles)
        // const keys = Object.keys(proteinData.torsion_angles)
        const angles = proteinData.torsion_angles[ta[0]].map((residue) => [residue.phi, residue.psi])
        setTorsionAngles(angles)
    }, [proteinData])

    const chartConfig = {
        options: {
            xaxis: {
                min: -180,
                max: 180,
                tickAmount: 2,
                labels: {
                    formatter: function(val) {
                      return parseFloat(val).toFixed(0)
                    }
                }
            },
            yaxis: {
                min: -180,
                max: 180,
                tickAmount: 2,
                labels: {
                    formatter: function(val) {
                      return parseFloat(val).toFixed(0)
                    }
                }
            }
        },
        type: 'scatter',
        series: [
            {
                name: 'torsion angles',
                data: torsionAngles
            },
        ],
        width: '100%',
        height: '100%'
    }

    return (
        <div style={{ position: 'absolute', height: '50%', width: '20%', backgroundColor: 'white', left: 30, bottom: 30 }}>
            <Chart options={chartConfig.options} type={chartConfig.type} series={chartConfig.series} width={chartConfig.width} height={chartConfig.height}/>
        </div>
    )
}