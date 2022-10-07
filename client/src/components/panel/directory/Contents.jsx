import Entry from "./Entry"

export default function Contents ( { renderLevel, config, geneIndex, geneData, setGeneData, entryIndex, setTranscriptIndex, setPresentView, setSequenceID, setInputData, reload, setReload } ) {
    
    const entryElements = config[renderLevel+1][entryIndex].map((entry, index) => {
        
        return (
            <Entry key={entry} config={config} geneIndex={geneIndex} geneData={geneData} setGeneData={setGeneData} renderLevel={renderLevel} entryIndex={index} previousIndex={entryIndex} setTranscriptIndex={setTranscriptIndex} setPresentView={setPresentView} setSequenceID={setSequenceID} setInputData={setInputData} reload={reload} setReload={setReload}/>
        )
    })

        return (
            <div id='directory-contents' style={{ display: 'flex', flexDirection: 'column', height: 'fit-content', marginLeft: renderLevel*5+20 }}>
                {entryElements}
            </div>
        )
}