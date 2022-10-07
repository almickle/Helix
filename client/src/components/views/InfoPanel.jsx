
export default function InfoPanel ( { infoPanelLabels, geneData, sequenceArray } ) {

    const headerSize = 26
    let position = 200
    if(document.getElementById('console')) {
        position = document.getElementById('console').offsetHeight + 24
    }


    return (
        <div id="sequence-header" style={{ zIndex: 2, position: 'absolute', bottom: position, height: headerSize, width: '70%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'rgb(235, 235, 235)', borderRadius: headerSize/2, borderStyle: 'solid', borderWidth: 1, borderColor: 'rgb(220, 220, 220)', boxShadow: '0px 0px 8px 8px white' }}>
            <span style={{ display: 'flex', flexDirection: 'row', marginLeft: 40 }}>Species: {geneData.taxname} </span>
            <span style={{ display: 'flex', flexDirection: 'row', marginLeft: 40 }}>{infoPanelLabels.type}: {geneData.symbol}</span>
            <span style={{ display: 'flex', flexDirection: 'row', marginLeft: 40 }}>Length: {sequenceArray.length.toLocaleString("en-US")} {infoPanelLabels.unit} </span>
            <span style={{ display: 'flex', flexDirection: 'row', marginLeft: 40 }}>{infoPanelLabels.info[0]}: {infoPanelLabels.info[1]}</span>
            <span style={{ display: 'flex', flexDirection: 'row', marginLeft: 40 }}>Assembly: {geneData.annotations[0].assemblies_in_scope[0].name}</span>
            <span style={{ display: 'flex', flexDirection: 'row', marginLeft: 40 }}>Chromosome: {geneData.chromosomes[0]}</span>
        </div>
    )
}