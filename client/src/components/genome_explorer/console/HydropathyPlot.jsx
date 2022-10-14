import { useEffect, useState } from "react"
import Chart from "react-apexcharts"

export default function HydropathyPlot ( { peptideSequence } ) {

    const [chartWidth, setChartWidth] = useState(0)
    const [hydropathyIndices, setHydropathyIndices] = useState([])
    const [xAxisLabels, setxAxisLabels] = useState([])
    // const [residueLength, setResidueLength] = useState(7)

    const residueLength = 7

    // const aminoAcids = {
    //     G: 'glycine/gly',
    //     A: 'alanine/ala',
    //     V: 'valine/val',
    //     C: 'cysteine/cys',
    //     P: 'proline/pro',
    //     L: 'leucine/leu',
    //     I: 'isoleucine/ile',
    //     M: 'methionine/met',
    //     W: 'tryptophan/trp',
    //     F: 'phenylalanine/phe',
    //     S: 'serine/ser',
    //     T: 'threonine/thr',
    //     Y: 'tyrosine/tyr',
    //     N: 'asparagine/asn',
    //     Q: 'glutamine/gln',
    //     K: 'lysine/lys',
    //     R: 'arginine/arg',
    //     H: 'histidine/his',
    //     D: 'aspartic acid/asp',
    //     E: 'glutamic acid/glu'
    // }

    const hydropathyRef = {
        G: -0.4,
        A: 1.8,
        V: 4.2,
        C: 2.5,
        P: -1.6,
        L: 3.8,
        I: 4.5,
        M: 1.9,
        W: -0.9,
        F: 2.8,
        S: -0.8,
        T: -0.7,
        Y: -1.3,
        N: -3.5,
        Q: -3.5,
        K: -3.9,
        R: -4.5,
        H: -3.2,
        D: -3.5,
        E: -3.5
    }

    useEffect(() => {
        setChartWidth(document.getElementById('console').offsetWidth - 10)
    }, [])

    useEffect(() => {
        const temp = peptideSequence.map((amino, index, array) => {
            if(index <= (array.length - residueLength)) {
                const residue = []
                for(let i = 0; i < residueLength; i++) {
                    residue.push(hydropathyRef[array[i+index]])
                }
                let total = 0
                let average = 0
                residue.forEach((value) => {
                    total += value
                })
                average = (total/residue.length).toFixed(2)
                return (
                    average
                )
            }
            else return null
        })
        for(let i = 0; i < (residueLength/2-0.5); i++) {
            temp.pop()
            temp.unshift(null)
        }
        setHydropathyIndices(temp)
        const labels = peptideSequence.map((aa, index) => index+1)
        setxAxisLabels(labels)

        // eslint-disable-next-line
    }, [peptideSequence, residueLength])


    const chartConfig = {
        options: {
          xaxis: {
            type: 'category',
            categories: xAxisLabels,
            tickPlacement: 'on',
            tickAmount: 50,
            labels: {
                show: true,
                alwaysRotate: false,
                rotate: 0,
                hideOverlappingLabels: true,
                showDuplicates: true,
            }
          },
          stroke: {
            width: 2
        }
        },
        series: [
          {
            name: 'Hydropathy Index',
            data: hydropathyIndices
          }
        ],
        type: 'line',
        width: chartWidth,
        height: '100%',
      }

    return (
        <Chart options={chartConfig.options} series={chartConfig.series} type={chartConfig.type} width={chartConfig.width} height={chartConfig.height}/>
    )
}