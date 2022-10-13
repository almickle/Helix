import { useState } from "react";
import ViewDNA from "./views/ViewDNA";
import ViewRNA from "./views/ViewRNA";
import ViewProtein from "./views/ViewProtein";

export default function Main ( { mainHeight, inputData, reload, setReload, setPeptideSequence, geneData, setGeneData, setSequenceID, sequenceID, presentView, transcriptIndex, rerenderLibrary, setRerenderLibrary } ) {

    const [annotationText, setAnnotationText] = useState(null)


    const sequenceView = () => {
        switch (presentView) {
            case 'DNA':
                return <ViewDNA inputData={inputData} annotationText={annotationText} setAnnotationText={setAnnotationText} reload={reload} setReload={setReload} geneData={geneData} setGeneData={setGeneData} setSequenceID={setSequenceID} sequenceID={sequenceID} rerenderLibrary={rerenderLibrary} setRerenderLibrary={setRerenderLibrary}/>
            case 'RNA':
                return <ViewRNA reload={reload} annotationText={annotationText} setAnnotationText={setAnnotationText} geneData={geneData} sequenceID={sequenceID} transcriptIndex={transcriptIndex} rerenderLibrary={rerenderLibrary} setRerenderLibrary={setRerenderLibrary}/>
            case 'Protein':
                return <ViewProtein reload={reload} setPeptideSequence={setPeptideSequence} annotationText={annotationText} setAnnotationText={setAnnotationText} geneData={geneData} sequenceID={sequenceID} transcriptIndex={transcriptIndex} rerenderLibrary={rerenderLibrary} setRerenderLibrary={setRerenderLibrary}/>
            default:
                break;
        }
    }


    function handleScroll() {
        if(document.getElementById('note')) {
            setAnnotationText(null)
        }
    }

    return (
        <div id='main' onScroll={handleScroll} style={{ height: `${mainHeight}%`, width: '100%', overflowY: 'scroll', display: 'flex', justifyContent: 'center' }}>
            {sequenceView()}
        </div>
    )
}