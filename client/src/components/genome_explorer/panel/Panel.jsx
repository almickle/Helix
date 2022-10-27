import { useState } from "react"
import Bookmark from "./Bookmark"
import Directory from "./directory/Directory"

export default function Panel ( { panelWidth, config, geneData, setGeneData, setTranscriptIndex, setPresentView, setSequenceID, setInputData, libraryConfig, reload, setReload } ) {

    const [directoryVisibility, setDirectoryVisibility] = useState([false, false, false])


    function handleClick(event) {
        switch (event.target.id) {
            case 'Current Selection':
                setDirectoryVisibility([!directoryVisibility[0], directoryVisibility[1], directoryVisibility[2]])
                if (event.target.style.transform === 'rotate(0deg)') {
                    event.target.style.transform = 'rotate(90deg)'
                }
                else {
                    event.target.style.transform = 'rotate(0deg)'
                }
                break
            case 'Library':
                setDirectoryVisibility([directoryVisibility[0], !directoryVisibility[1], directoryVisibility[2]])
                if (event.target.style.transform === 'rotate(0deg)') {
                    event.target.style.transform = 'rotate(90deg)'
                }
                else {
                    event.target.style.transform = 'rotate(0deg)'
                }
                break
            case 'Projects':
                setDirectoryVisibility([directoryVisibility[0], directoryVisibility[1], !directoryVisibility[2]])
                if (event.target.style.transform === 'rotate(0deg)') {
                    event.target.style.transform = 'rotate(90deg)'
                }
                else {
                    event.target.style.transform = 'rotate(0deg)'
                }
                break

            default:
                break;
        }
    }

    const currentSelection = () => {
            if(directoryVisibility[0] === true) {
                return (
                    <Directory config={config} geneIndex={0} geneData={geneData} setGeneData={setGeneData} setInputData={setInputData} setTranscriptIndex={setTranscriptIndex} setPresentView={setPresentView} setSequenceID={setSequenceID} reload={reload} setReload={setReload}/>
                )
            }
            else {
                return <div></div>
            }
    }

    const libraryDirectories = () => {
        const directoryElements = libraryConfig.map((configArray, index) => {
            return (
                <Directory key={configArray[1][0]} config={configArray} geneIndex={index} geneData={geneData} setGeneData={setGeneData} setInputData={setInputData} setTranscriptIndex={setTranscriptIndex} setPresentView={setPresentView} setSequenceID={setSequenceID} reload={reload} setReload={setReload}/>
            )
        })

        if(directoryVisibility[1] === true) {
            return (
                directoryElements
            )
        }
        else {
            return <div></div>
        }
    }




    return (
        <div id='panel' style={{ height: '100%', width: `${panelWidth}%`, backgroundColor: 'rgb(250, 250, 250', display: 'flex', justifyContent: 'flex-end', borderRight: 'solid', borderWidth: 1 }}>
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: 'white', paddingLeft: 5, paddingTop: 5 }}>
                <Bookmark label='Current Selection' handleClick={handleClick} />
                    {currentSelection()}
                <Bookmark label='Library' handleClick={handleClick} />
                    {libraryDirectories()}
                <Bookmark label='Projects' handleClick={handleClick} />
            </div>
        </div>
    )
}
