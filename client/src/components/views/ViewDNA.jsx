import { useState, useEffect } from "react"
import XMLParser from 'react-xml-parser'
import InfoPanel from "./InfoPanel"
import LoadingGIF from "./LoadingGIF"
import SequenceRender from "./SequenceRender"
import SequenceHeader from "./sequence-header/SequenceHeader"


export default function ViewDNA ( { inputData, annotationText, setAnnotationText, geneData, setGeneData, setSequenceID, sequenceID, reload, setReload, rerenderLibrary, setRerenderLibrary } ) {

    const dnaContainerSize = 90
    const infoPanelLabels = {type: 'Gene', unit: 'bp', info: ['Transcripts', geneData.transcripts.length]}

    const [visibility, setVisibility] = useState('hidden')
    const [iconVisibility, setIconVisibility] = useState('visible')
    const [showMoreButton, setShowMoreButton] = useState()

    const [rawSequence, setRawSequence] = useState('')
    const [sequenceArray, setSequenceArray] = useState([])
    const [selectedRegion, setSelectedRegion] = useState([0, 10000])
 
    const [sequenceStyle, setSequenceStyle] = useState(false)
    const [basePairColors, setBasePairColors] = useState({A: 'black', T: 'black', G: 'black', C: 'black'})

    const [annotations, setAnnotations] = useState([])
    const [triggerAnnotation, setTriggerAnnotation] = useState(false)


    function fetchSuccessful (data) {
        if (data.genes[0].warnings) {
            return false
        } else return true
    }


    // sequence config and gene data
    useEffect(() => {
            fetch('https://api.ncbi.nlm.nih.gov/datasets/v1/gene/symbol/' + inputData[0] + '/taxon/' + inputData[1])
            .then((resp) => {
                if(resp.ok) {
                resp.json().then(data => {
                                    if(fetchSuccessful(data)) {
                                        if(true) { // bug: click the same gene gets stuck in loading loop
                                            const gene = data.genes[0].gene
                                            let strand
                                            if(gene.orientation === 'plus') {
                                                strand = 1
                                            }
                                            if(gene.orientation === 'minus') {
                                                strand = 2
                                            }
                                            setGeneData(gene)
                                            setSequenceID({ accession: gene.genomic_ranges[0].accession_version, range: [parseInt(gene.genomic_ranges[0].range[0].begin), parseInt(gene.genomic_ranges[0].range[0].end)], strand: strand})
                                        } else {
                                            setReload(!reload) }
                                    } else {
                                        setReload(!reload)
                                    }})
                }})
    // eslint-disable-next-line
    }, [inputData])


    useEffect(() => {
        if(sequenceID.accession) { // note: monkey-patch
            fetch('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=' + sequenceID.accession + '&strand=' + sequenceID.strand + '&seq_start=' + sequenceID.range[0] + '&seq_stop=' + sequenceID.range[1] + '&rettype=fasta&retmode=xml')
            .then(resp => resp.text())
            .then(data => {
                            const respArray = new XMLParser().parseFromString(data).children[0].children[0].children
                            const seq = new XMLParser().parseFromString(data).children[0].children[0].children[respArray.length-1].value
                            setRawSequence(seq)
                            setSequenceArray(seq.split(''))
                        })
        }
    }, [sequenceID])


    // note: should migrate to a style specific component?
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


    useEffect(() => {
        console.log('geneData')
        console.log(geneData)
    }, [geneData])



    // get annotations
    useEffect(() => { // note: need to configure for dna, rna, or protein
        fetch('/annotations', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ symbol: geneData.symbol })
            })
            .then(resp => {
                if(resp.ok) {
                    resp.json().then(data => setAnnotations(data))
                }})
    }, [geneData, triggerAnnotation])




    return (
        <div id="workspace" style={{ height: 'fit-content', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
            <SequenceHeader geneData={geneData} setSelectedRegion={setSelectedRegion} selectedRegion={selectedRegion} annotations={annotations} setAnnotationText={setAnnotationText} setTriggerAnnotation={setTriggerAnnotation} triggerAnnotation={triggerAnnotation} sequenceStyle={sequenceStyle} setSequenceStyle={setSequenceStyle} rerenderLibrary={rerenderLibrary} setRerenderLibrary={setRerenderLibrary} rawSequence={rawSequence} />
            <SequenceRender sequenceArray={sequenceArray} setIconVisibility={setIconVisibility} setVisibility={setVisibility} visibility={visibility} basePairColors={basePairColors} selectedRegion={selectedRegion} setShowMoreButton={setShowMoreButton} setSelectedRegion={setSelectedRegion} reload={reload} annotationText={annotationText}/>
            <LoadingGIF iconVisibility={iconVisibility} dnaContainerSize={dnaContainerSize}/>
            {showMoreButton}
            <InfoPanel geneData={geneData} sequenceArray={sequenceArray} infoPanelLabels={infoPanelLabels}/>
        </div>
    )
}