import Label from "./Label";

export default function Tab ( { geneData, config, geneIndex, setGeneData, setDirectoryOpen, label, directoryOpen, setTranscriptIndex, setPresentView, setSequenceID, renderLevel, entryIndex, previousIndex, setInputData, reload, setReload } ) {


        return (
            <div id={label} style={{ display: 'flex', flexDirection: 'row', height: 'fit-content' }}>
                <Label label={label} geneIndex={geneIndex} geneData={geneData} setGeneData={setGeneData} config={config} setInputData={setInputData} setDirectoryOpen={setDirectoryOpen} directoryOpen={directoryOpen} setTranscriptIndex={setTranscriptIndex} setPresentView={setPresentView} setSequenceID={setSequenceID} renderLevel={renderLevel} entryIndex={entryIndex} previousIndex={previousIndex} reload={reload} setReload={setReload}/>
            </div>
        )
}