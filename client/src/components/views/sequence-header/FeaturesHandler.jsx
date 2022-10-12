import { useEffect } from 'react'
import { useState } from 'react'
import DNA_Features from '../../assets/DNA_Features.png'

export default function FeaturesHandler ( { transcriptOptions, selectedRegion, geneData } ) {

    const [featuresColor, setFeaturesColor] = useState()
    const [isFeatures, setIsFeatures] = useState(false)
    const [selectVisibility, setSelectVisibility] = useState('hidden')
    const [featuresIndex, setFeaturesIndex] = useState(0)

    const {transcripts} = geneData
    const geneStart = parseInt(geneData.genomic_ranges[0].range[0].begin)

    useEffect(() => {
        if(isFeatures === true) {
            setFeaturesColor('white')
            if(transcriptOptions.visibility === true) {
                setSelectVisibility('visible')
            }
        }
        else {
            setFeaturesColor('unset')
            setSelectVisibility('hidden')
        }
        // eslint-disable-next-line
    }, [isFeatures])

    
    function setShowFeatures() {
        setIsFeatures(!isFeatures)
    }


    function handleFocus(event) {
        event.target.style.border = 'none'
        event.target.style.outline = 'none'
    }

    function handleChangeTranscript(event) {
        const optionIndex = event.target.value.split(' ')[1]-1
        setFeaturesIndex(optionIndex)
    }

    useEffect(() => {
        document.querySelectorAll('.bp').forEach((node) => {
            node.style.backgroundColor = 'unset'
        })

        if(transcripts[featuresIndex].exons && isFeatures === true) {
            const exonRangesRaw = transcripts[featuresIndex].exons.range
            const exonRanges = exonRangesRaw.map((range) => {
                return (
                    [parseInt(range.begin)-geneStart+1, parseInt(range.end)-geneStart+1]
                )
            })
            const exonArrays = exonRanges.map((range) => {
                const exon = []
                for(let i=range[0]; i <= range[1]; i++) {
                    exon.push(i)
                } 
                return (
                    exon
                )
            })
            exonArrays.forEach((exon) => {
                if(exon[exon.length-1] <= selectedRegion[1]+1 && exon[0] >= selectedRegion[0]+1) {
                    exon.forEach((bpIndex) => {
                        document.getElementById(bpIndex).style.backgroundColor = 'pink'
                    })
                }
            })
        }
    }, [featuresIndex, isFeatures])

    
    const selectOptions = transcriptOptions.transcripts.map((transcript, index) => {
        return (
            <option key={index} id={`Transcript: ${index}`} style={{ color: 'black' }}>Transcript {index+1}</option>
        )
    })




    return (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '9%', paddingLeft: 6, paddingRight: 6, backgroundColor: featuresColor }}>
            <img onClick={setShowFeatures} src={DNA_Features} style={{ height: '70%', cursor: 'pointer' }} alt="style icon: set styling options" />
            <div style={{ visibility: selectVisibility, width: '6%', height: 10, position: 'absolute', bottom: -10, display: 'flex', justifyContent: 'center' }}>
                <select onChange={handleChangeTranscript} id="transcript-feature-select" style={{ width: 'fit-content', height: 12, fontSize: 10, border: 'none', color: 'grey', marginLeft: 6 }} onFocus={handleFocus}>
                    {selectOptions}
                </select>
            </div>
        </span>
    )
}