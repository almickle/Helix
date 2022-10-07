import { useState } from "react"
import Tab from "./Tab"
import Contents from "./Contents"

export default function Entry ( { config, geneData, setGeneData, geneIndex, renderLevel, previousIndex, entryIndex, setTranscriptIndex, setPresentView, setSequenceID, setInputData, reload, setReload } ) {

    const currentLevel = renderLevel + 1
    const [directoryOpen, setDirectoryOpen] = useState(false)

    const arrayHasIndex = (array, index) => Array.isArray(array) && array.hasOwnProperty(index)

    function isArray(array, index, entry) {
        if (arrayHasIndex(array, index) === true) {
            const nextArray = array[index]
            return (
                arrayHasIndex(nextArray, entry)
            )
        } else return false
    }

    let border = 1
    if(renderLevel === 0) {
        border = 0
    }
    if(renderLevel === 1 && entryIndex === config[renderLevel+1][previousIndex].length-1) {
        border = 0
    }

    if(currentLevel < config.length) {
        
        if(directoryOpen === true && isArray(config, (currentLevel+1), entryIndex)) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
                    <Tab label={config[currentLevel][previousIndex][entryIndex]} geneIndex={geneIndex} geneData={geneData} setGeneData={setGeneData} setDirectoryOpen={setDirectoryOpen} directoryOpen={directoryOpen} setTranscriptIndex={setTranscriptIndex} setPresentView={setPresentView} setSequenceID={setSequenceID} renderLevel={currentLevel} config={config} entryIndex={entryIndex} previousIndex={previousIndex} setInputData={setInputData} reload={reload} setReload={setReload}/> 
                    <div id={`R:${renderLevel}, P:${previousIndex}, E:${entryIndex}`} style={{ display: 'flex', flexDirection: 'row', height: 'fit-content', borderLeft: 'solid', borderWidth: border, borderColor: 'rgb(200, 200, 200)' }}>
                        <Contents config={config} geneIndex={geneIndex} geneData={geneData} setGeneData={setGeneData} renderLevel={currentLevel} entryIndex={entryIndex} previousIndex={previousIndex} setTranscriptIndex={setTranscriptIndex} setPresentView={setPresentView} setSequenceID={setSequenceID} setInputData={setInputData} reload={reload} setReload={setReload}/>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
                    <Tab label={config[currentLevel][previousIndex][entryIndex]} geneIndex={geneIndex} geneData={geneData} setGeneData={setGeneData} setDirectoryOpen={setDirectoryOpen} directoryOpen={directoryOpen} setTranscriptIndex={setTranscriptIndex} setPresentView={setPresentView} setSequenceID={setSequenceID} renderLevel={currentLevel} config={config} entryIndex={entryIndex} previousIndex={previousIndex} setInputData={setInputData} reload={reload} setReload={setReload}/>
                </div>
            )
        }
    }
}