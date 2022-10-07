import { useState } from "react"
import { useEffect } from "react"
import XMLParser from 'react-xml-parser'
import SequenceRender from "./SequenceRender"
import InfoPanel from "./InfoPanel"
import LoadingGIF from "./LoadingGIF"
import SequenceHeader from "./SequenceHeader"
import Annotation from "./Annotation"

export default function ViewProtein ( { geneData, annotationText, setAnnotationText, sequenceID, transcriptIndex, reload, rerenderLibrary, setRerenderLibrary } ) {

    const dnaContainerSize = 90
    const infoPanelLabels = {type: 'Protein', unit: 'aa', info: ['Isoform', geneData.transcripts[transcriptIndex].protein.isoform_name]}

    const [visibility, setVisibility] = useState('hidden')
    const [iconVisibility, setIconVisibility] = useState('visible')
    const [showMoreButton, setShowMoreButton] = useState()

    const [rawSequence, setRawSequence] = useState('')
    const [sequenceArray, setSequenceArray] = useState([])
    const [selectedRegion, setSelectedRegion] = useState([0, 10000])
 
    const [sequenceStyle, setSequenceStyle] = useState(false)
    const [basePairColors, setBasePairColors] = useState({A: 'black', T: 'black', G: 'black', C: 'black'})

    const [annotationSequence, setAnnotationSequence] = useState([])
    const [isAnnotating, setIsAnnotating] = useState(false)
    const [triggerHighlight, setTriggerHighlight] = useState(false)
    const [triggerAnnotation, setTriggerAnnotation] = useState(false)
    const [annotationToggle, setAnnotationToggle] = useState(false)
    const [annotations, setAnnotations] = useState([])


    useEffect(() => {
        fetch('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=sequences&id=' + sequenceID + '&rettype=FASTA&retmode=xml')
        .then(resp => resp.text())
        .then(data => { const seq = new XMLParser().parseFromString(data).children[0].children[0].children[6].value
                        setRawSequence(seq)
                        setSequenceArray(seq.split(''))
        })
    }, [sequenceID])


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



    // custom annotation handling
    function handleAddAnnotation() {
        setIsAnnotating(!isAnnotating)
    }


    useEffect(() => {
        if(isAnnotating === true) {
            document.addEventListener('mousedown', handleStartDrag, {once: true})
            document.addEventListener('mouseup', handleDragEnd, {once: true})
        }
        // eslint-disable-next-line
    }, [isAnnotating, triggerHighlight])

    const highlightedBp = []

    function handleStartDrag(event) {
        highlightedBp.splice(0, highlightedBp.length)
        if(event.target.className === 'bp') {
            document.getElementById(event.target.id).style.backgroundColor = 'yellow'
            highlightedBp.push(event.target.id)
            document.addEventListener('mouseover', handleWhileDragging)
        }
    }

    function handleWhileDragging(event) {
        const basepair = event.target.id
        if(event.target.className === 'bp') {
            if(parseInt(basepair) === parseInt(Math.max(...highlightedBp)+1) || parseInt(basepair) ===  parseInt(Math.min(...highlightedBp)-1)) {
                document.getElementById(event.target.id).style.backgroundColor = 'yellow'
                highlightedBp.push(event.target.id)
            }
        }
    }

    function handleDragEnd() {
        const bpLowToHigh = highlightedBp.sort((a, b) => a - b)
        setAnnotationSequence(bpLowToHigh)
        document.removeEventListener('mouseover', handleWhileDragging)
    }

    useEffect(() => {
        if(annotationSequence.length > 1) {
            setAnnotationText(<Annotation basepairs={annotationSequence} transcriptIndex={transcriptIndex} isProtein={true} annotationToggle={annotationToggle} triggerAnnotation={triggerAnnotation} setTriggerAnnotation={setTriggerAnnotation} setAnnotationText={setAnnotationText} setTriggerHighlight={setTriggerHighlight} triggerHighlight={triggerHighlight} geneData={geneData}/>)
        }
        // eslint-disable-next-line
    }, [annotationSequence])

    // get annotations
    useEffect(() => {
        fetch('https://calm-escarpment-52610.herokuapp.com/annotations', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ symbol: geneData.symbol })
            })
            .then(resp => resp.json())
            .then(data => setAnnotations(data))
    }, [geneData, triggerAnnotation])





    return (
        <div id="workspace" style={{ height: 'fit-content', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
            <SequenceHeader geneData={geneData} annotations={annotations} annotationToggle={annotationToggle} setAnnotationToggle={setAnnotationToggle} handleAddAnnotation={handleAddAnnotation} setAnnotationText={setAnnotationText} triggerAnnotation={triggerAnnotation} sequenceStyle={sequenceStyle} setSequenceStyle={setSequenceStyle} rerenderLibrary={rerenderLibrary} setRerenderLibrary={setRerenderLibrary} rawSequence={rawSequence} isAnnotating={isAnnotating}/>
            <SequenceRender sequenceArray={sequenceArray} annotationText={annotationText} setIconVisibility={setIconVisibility} setVisibility={setVisibility} visibility={visibility} basePairColors={basePairColors} selectedRegion={selectedRegion} setShowMoreButton={setShowMoreButton} setSelectedRegion={setSelectedRegion} reload={reload}/>
            <LoadingGIF iconVisibility={iconVisibility} dnaContainerSize={dnaContainerSize}/>
            {showMoreButton}
            <InfoPanel geneData={geneData} sequenceArray={sequenceArray} infoPanelLabels={infoPanelLabels}/>
        </div>
    )
}



