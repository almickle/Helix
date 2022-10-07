import { useState, useEffect } from "react";
import Console from "./Console";
import Panel from "./panel/Panel"
import Main from "./Main";
import Header from "./header/Header";



export default function Home () {

    const consoleHeight = 22
    const mainWidth = 84
    const mainHeight = 100 - consoleHeight
    const panelWidth = 100 - mainWidth
    const headerHeight = 5

    const [user, setUser] = useState({username: 'guest'})

    const [inputData, setInputData] = useState(['BRCA2', 'human'])
    const [reload, setReload] = useState(false)

    const [geneData, setGeneData] = useState({taxname: '', symbol: '', chromosomes: [], genomic_ranges: [], transcripts: [{protein: ''}], annotations: [{assemblies_in_scope: [{name: ''}]}]})
    const [sequenceID, setSequenceID] = useState({ accession: 'NC_000013.11', range: [32315508, 32400268], strand: 1 })
    const [transcriptIndex, setTranscriptIndex] = useState(0)

    const [presentView, setPresentView] = useState('DNA')

    const [config, setConfig] = useState(['root', [['Gene']], [['Transcript 1', 'Transcript 2', 'Transcript 3', 'Transcript 4', 'Transcript 5']], [['Protein A1', 'Protein A2'], ['Protein B1', 'Protein B2', 'Protein B3'], ['Protein C1'], ['Protein D1', 'Protein D2', 'Protein D3']]])
    const [libraryConfig, setLibraryConfig] = useState([])
    const [rerenderLibrary, setRerenderLibrary] = useState(false)

    useEffect(() => {
        const transcripts = geneData.transcripts.map((transcript, index) => {
            return (
                `Transcript ${index+1}`
            )
        })
        const proteins = geneData.transcripts.map((transcript) => {
            if (transcript.protein) {
                return (
                    [transcript.protein.name]
                )
            } else return ['non-coding rna']
        })
        setConfig(['root', [[geneData.symbol]], [transcripts], proteins])
    }, [geneData])

    useEffect(() => { // needs work

        const libraryGenes = []
        const configStateLoader = []

        fetch('https://fierce-springs-30684.herokuapp.com/genelibrary', {
            credentials: 'include'
        })
        .then(resp => resp.json())
        .then(data => {
            data.forEach((gene) => {
                libraryGenes.push({symbol: gene.symbol, taxon: gene.taxon})
            })
        })
        .then(() => libraryGenes.forEach((gene) => {
            fetch('https://api.ncbi.nlm.nih.gov/datasets/v1/gene/symbol/' + gene.symbol + '/taxon/' + gene.taxon)
            .then(resp => resp.json())
            .then(data => {
                const preConfig = ['root']
                const libraryGeneData = data.genes[0].gene
                preConfig.push([[libraryGeneData.symbol]])
                const transcripts = libraryGeneData.transcripts.map((transcript, index) => {
                    return (
                        `Transcript ${index+1}`
                    )
                })
                preConfig.push([transcripts])
                const proteins = libraryGeneData.transcripts.map((transcript) => {
                    if (transcript.protein) {
                        return (
                            [transcript.protein.name]
                        )
                    } else return ['non-coding rna']
                })
                preConfig.push(proteins)
                configStateLoader.push(preConfig)
            })
        })).then(() => setLibraryConfig(configStateLoader))
    }, [user, rerenderLibrary])


    function handleSearchSubmit(event) {
        if(event.nativeEvent.type === 'submit') {
            event.preventDefault()
        }

        const species = document.getElementById('species-select').value
        const gene = document.getElementById('gene-search').value

        if(gene !== inputData) { // this has a hole
            setInputData([gene, species])
            setReload(!reload)
            setPresentView('DNA')
        }
        // insert modal trigger if search error
        document.getElementById('gene-search').value = ''
    }
    

    return (
        <div id="home" style={{ height: '100vh', width: '100%', display: "flex", flexDirection: 'column' }}>
            <Header headerHeight={headerHeight} handleSearchSubmit={handleSearchSubmit} setUser={setUser} user={user}/>
            <div style={{ height: `${100-headerHeight}%`, width: '100%', display: "flex", flexDirection: 'row' }}>
                <Panel panelWidth={panelWidth} geneData={geneData} setGeneData={setGeneData} setSequenceID={setSequenceID} setReload={setReload} reload={reload} setPresentView={setPresentView} setTranscriptIndex={setTranscriptIndex} user={user} config={config} libraryConfig={libraryConfig} setInputData={setInputData}/>
                <div style={{ width: `${mainWidth}%`, display: 'flex', flexDirection: 'column' }}>
                    <Main mainHeight={mainHeight} mainWidth={mainWidth} inputData={inputData} reload={reload} setReload={setReload} geneData={geneData} setGeneData={setGeneData} setSequenceID={setSequenceID} sequenceID={sequenceID} setTranscriptIndex={setTranscriptIndex} presentView={presentView} transcriptIndex={transcriptIndex} rerenderLibrary={rerenderLibrary} setRerenderLibrary={setRerenderLibrary} />
                    <Console consoleHeight={consoleHeight} mainWidth={mainWidth} panelWidth={panelWidth} />
                </div>
            </div>
        </div>
    )
}