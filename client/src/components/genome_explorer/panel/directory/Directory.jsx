import Entry from "./Entry";

export default function Directory ( { config, geneData, geneIndex, setGeneData, setTranscriptIndex, setPresentView, setSequenceID, setInputData, reload, setReload } ) {


    const renderLevel = 0

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: 'fit-content', width: '100%', marginLeft: 13, marginBottom: 6, marginTop: 3 }}>
                <Entry config={config} geneData={geneData} geneIndex={geneIndex} setGeneData={setGeneData} setInputData={setInputData} entryIndex={0} previousIndex={0} renderLevel={renderLevel} setTranscriptIndex={setTranscriptIndex} setPresentView={setPresentView} setSequenceID={setSequenceID} reload={reload} setReload={setReload}/>
            </div>  
        )
}
