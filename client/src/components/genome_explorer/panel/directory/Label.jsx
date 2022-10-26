import { useEffect, useState } from "react"
import '../../style/onHover.css'

export default function Label ( { label, setGeneData, setInputData, setDirectoryOpen, directoryOpen, setTranscriptIndex, setPresentView, setSequenceID, renderLevel, config, previousIndex, entryIndex, reload, setReload } ) {

    const [triggerRender, setTriggerRender] = useState(false)

    
    useEffect(() => {
        setTriggerRender(!triggerRender)
        //eslint-disable-next-line
    }, [])
    

    function handleClickLabel() {
        setDirectoryOpen(!directoryOpen)
    }

    function handleDNA () {
        setPresentView('DNA')
        setInputData([config[1][0][previousIndex], 'Homo sapiens'])
        setReload(!reload)
    }

    function handleRNA (gene) {
        setPresentView('RNA')
        setSequenceID(gene.transcripts[entryIndex].accession_version)
        setTranscriptIndex(entryIndex)
        setReload(!reload)
    }

    function handleProtein (gene) {
        setPresentView('Protein')
        setSequenceID(gene.transcripts[previousIndex].protein.accession_version)
        setTranscriptIndex(previousIndex)
        setReload(!reload)
    }

    // note: configure for species

    function handleDoubleClickLabel() {
        switch (renderLevel) {
            case 1:
                handleDNA()
                break;

            case 2:
                fetch('https://api.ncbi.nlm.nih.gov/datasets/v1/gene/symbol/' + config[1][0] + '/taxon/human')
                    .then((resp) => resp.json())
                    .then((data) => {
                            const gene = data.genes[0].gene
                            setGeneData(gene)
                            handleRNA(gene)
                    })
                break;

            case 3:
                fetch('https://api.ncbi.nlm.nih.gov/datasets/v1/gene/symbol/' + config[1][0] + '/taxon/human')
                .then((resp) => resp.json())
                .then((data) => {
                            const gene = data.genes[0].gene
                            setGeneData(gene)
                            handleProtein(gene)
                })
                break;
        
            default:
                break;
        }
    }

    let bottomBorder = 1
    let topBorder = 1
    let tabBorderHeight = 0
    let borderRadius = 0

    if(document.getElementById(label)) {
        tabBorderHeight = document.getElementById(label).offsetHeight
    }

    if(entryIndex === config[renderLevel][previousIndex].length-1) {
        bottomBorder = 0
    }

    if(renderLevel === 1) {
        topBorder = 0
    }

    if(entryIndex !== config[renderLevel][previousIndex].length-1) {
        borderRadius = 0
    }


    const borderTopStyle = {
        height: tabBorderHeight/2, width: 12, 
        borderLeft: 'solid', borderLeftColor: 'rgb(200, 200, 200', borderLeftWidth: topBorder, 
        borderBottom: 'solid', borderColor: 'rgb(200, 200, 200', borderWidth: topBorder,
        borderRadius: `0px 0px 0px ${borderRadius*10}px`
    }

    
    return (
        <div onClick={handleClickLabel} onDoubleClick={handleDoubleClickLabel} id='directory-label' style={{ height: 'fit-content', width: 'fit-content', display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer', boxShadow: `${bottomBorder}px 0px 0px 0px rgb(200, 200, 200) inset` }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: tabBorderHeight }}>
                <div style={borderTopStyle}></div>
            </div>
            <span style={{ marginLeft: 5 }}>{label}</span>
        </div>
    )
}