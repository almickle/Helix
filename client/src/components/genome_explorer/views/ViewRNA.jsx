import { useState } from "react"
import { useEffect } from "react"
import XMLParser from 'react-xml-parser'
import SequenceRender from "./SequenceRender"
import InfoPanel from "./InfoPanel"
import LoadingGIF from "./LoadingGIF"
import SequenceHeader from "./sequence-header/SequenceHeader"


export default function ViewRNA ( { geneData, annotationText, setAnnotationText, sequenceID, transcriptIndex, reload, rerenderLibrary, setRerenderLibrary } ) {

    const dnaContainerSize = 90
    const infoPanelLabels = {type: 'mRNA', unit: 'bp', info: ['Transcript', parseInt(transcriptIndex)+1]}

    const [visibility, setVisibility] = useState('hidden')
    const [iconVisibility, setIconVisibility] = useState('visible')
    const [showMoreButton, setShowMoreButton] = useState()

    const [rawSequence, setRawSequence] = useState('')
    const [sequenceArray, setSequenceArray] = useState([])
    const [selectedRegion, setSelectedRegion] = useState([0, 10000])
 
    const [sequenceStyle, setSequenceStyle] = useState(false)
    const [basePairColors, setBasePairColors] = useState({A: 'black', T: 'black', G: 'black', C: 'black'})

    const [triggerAnnotation, setTriggerAnnotation] = useState(false)
    const [annotations, setAnnotations] = useState([])


    useEffect(() => {
        fetch('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=sequences&id=' + sequenceID + '&rettype=FASTA&retmode=xml')
        .then(resp => resp.text())
        .then(data => { const seq = new XMLParser().parseFromString(data).children[0].children[0].children[6].value
                        setRawSequence(seq)
                        setSequenceArray(seq.split(''))
        })
    }, [sequenceID])


    // note: should migrate to a style specific component

    useEffect(() => {
        switch (sequenceStyle) {
            case false:
                setBasePairColors({A: 'black', T: 'black', G: 'black', C: 'black'})
                break;

            case true:
                setBasePairColors({A: 'blue', T: 'yellow', G: 'green', C: 'red'})
                break

            default:
                break
        }
    }, [sequenceStyle])


    // get annotations
    useEffect(() => { // note: need to configure for dna, rna, or protein
        fetch('/api/annotations', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ symbol: geneData.symbol, transcript: transcriptIndex, protein: false })
            })
            .then(resp => resp.json())
            .then(data => {
                setAnnotations(data)})
    }, [geneData, triggerAnnotation, transcriptIndex])



    useEffect(() => {
        console.log('geneData')
        console.log(geneData)
    }, [geneData])




    return (
        <div id="workspace" style={{ height: 'fit-content', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
            <SequenceHeader geneData={geneData} transcriptIdentifier={transcriptIndex} isProtein={false} transcriptOptions={{transcripts: [], visibility: false}} setSelectedRegion={setSelectedRegion} selectedRegion={selectedRegion} annotations={annotations} setAnnotationText={setAnnotationText} setTriggerAnnotation={setTriggerAnnotation} triggerAnnotation={triggerAnnotation} sequenceStyle={sequenceStyle} setSequenceStyle={setSequenceStyle} rerenderLibrary={rerenderLibrary} setRerenderLibrary={setRerenderLibrary} rawSequence={rawSequence} />
            <SequenceRender sequenceArray={sequenceArray} annotationText={annotationText} setIconVisibility={setIconVisibility} setVisibility={setVisibility} visibility={visibility} basePairColors={basePairColors} selectedRegion={selectedRegion} setShowMoreButton={setShowMoreButton} setSelectedRegion={setSelectedRegion} reload={reload}/>
            <LoadingGIF iconVisibility={iconVisibility} dnaContainerSize={dnaContainerSize}/>
            {showMoreButton}
            <InfoPanel geneData={geneData} sequenceArray={sequenceArray} infoPanelLabels={infoPanelLabels}/>
        </div>
    )
}



