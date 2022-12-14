import { useState, useEffect } from "react"
import ShowMoreButton from "./ShowMoreButton"

export default function SequenceRender ( { reload, sequenceArray, setIconVisibility, setVisibility, visibility, basePairColors, selectedRegion, setShowMoreButton, setSelectedRegion, annotationText, editBox } ) {

    const rowSize = 20
    const rowMargin = 10
    const dnaContainerSize = 90
    const marginBottom = 30
    const headerMargin = 90

    const [isLoaded, setIsLoaded] = useState(false)
    const [bpPresent, setbpPresent] = useState([])
    const [renderSequence, setRenderSequence] = useState([])

    const [containerWidth, setContainerWidth] = useState()
    const [cellsPerRow, setCellsPerRow] = useState()
    const [rowCount, setRowCount] = useState()
    const [rowMarkersLeft, setRowMarkersLeft] = useState([])
    const [rowMarkersRight, setRowMarkersRight] = useState([])



    // resize handling
    window.addEventListener('resize', () => {
        setTimeout(() => {
            const width = document.getElementById('dna').offsetWidth
            setContainerWidth(width)
        }, 700)
    })

    // sequence config
    useEffect(() => {
        setRenderSequence(sequenceArray.slice(selectedRegion[0], selectedRegion[1]))
    }, [sequenceArray, selectedRegion])

    // show more
    useEffect(() => { // bug: show more button does not appear sometimes
        if(sequenceArray.length > selectedRegion[1] && renderSequence.length < sequenceArray.length ) {
            setShowMoreButton(<ShowMoreButton setSelectedRegion={setSelectedRegion} selectedRegion={selectedRegion} visibility={visibility}/>)
        } else setShowMoreButton()
        // eslint-disable-next-line
    }, [renderSequence, selectedRegion])


    // container formatting
    useEffect(() => {
        setContainerWidth(document.getElementById('dna').offsetWidth)
    }, [])

    useEffect(() => {
        setCellsPerRow(Math.floor(containerWidth / 20))
    }, [containerWidth])

    useEffect(() => {
        setRowCount(Math.ceil(renderSequence.length / cellsPerRow))
    }, [cellsPerRow, renderSequence])

    useEffect(() => {
        const rows = [1]
        for(let i = 1; i < rowCount; i++) {
            rows.push((i*cellsPerRow)+1)
        }
        const left = rows.map(num => num = num + selectedRegion[0])
        setRowMarkersLeft(left)
        const right = rows.map((num) => num = (num + cellsPerRow - 1 + selectedRegion[0]))
        right.pop()
        right.push(renderSequence.length + selectedRegion[0])
        setRowMarkersRight(right)
    }, [rowCount, cellsPerRow, renderSequence, selectedRegion])


    // building blocks
    const leftCounters = rowMarkersLeft.map((num) => {
        return (
            <span key={num} style={{height: rowSize, width: 'fit-content', textAlign: 'center', marginBottom: rowMargin }}>{num}</span>
        )
    })

    const rightCounters = rowMarkersRight.map((num) => {
        return (
            <span key={num} style={{height: rowSize, width: 'fit-content', textAlign: 'center', marginBottom: rowMargin }}>{num}</span>
        )
    })

    const basePairElements = renderSequence.map((bp, index) => {
        let color 
        switch (renderSequence[index]) { // need to handle amino acid styling
            case 'A':
                color = basePairColors.A
                break

            case 'T':
                color = basePairColors.T
                break

            case 'G':
                color = basePairColors.G
                break

            case 'C':
                color = basePairColors.C
                break;

            default:
                break
        }


        return (
            <span key={index} onClick={showBasePair} className='bp' id={index+1+selectedRegion[0]} style={{ height: rowSize, width: rowSize, justifyContent: 'center', display: 'flex', color: color }}>{renderSequence[index]}</span>
        )
    })

    const rowElements = rowMarkersLeft.map((row, index, array) => {
        if (index === (rowMarkersLeft.length - 1)) {
            const remainder = cellsPerRow - basePairElements.slice((array[index]-1-selectedRegion[0]), (renderSequence.length)).length
            const spaces = []
            for(let i=0; i < remainder; i++) {
                spaces.push(i)
            }
            const fillerElements = spaces.map(() => <span style={{ height: rowSize, width: rowSize }}></span>)
            return (
                <div key={array[index]} style={{ width: '100%', height: rowSize, marginBottom: rowMargin, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    {basePairElements.slice((array[index]-1-selectedRegion[0]), (renderSequence.length))}
                    {fillerElements}
                </div>
            )} 
        else {
            return (
                <div key={array[index]} style={{ width: '100%', height: rowSize, marginBottom: rowMargin, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    {basePairElements.slice((array[index]-1-selectedRegion[0]), (array[index+1]-1-selectedRegion[0]))}
                </div>
            )
        }
    })


    // styling
    useEffect(() => {
        document.querySelectorAll('.bp').forEach((element) => {
            const bp = element.textContent
            switch (bp) {
                case 'A':
                    element.style.color = basePairColors.A
                    break
    
                case 'T':
                    element.style.color = basePairColors.T
                    break
    
                case 'G':
                    element.style.color = basePairColors.G
                    break
    
                case 'C':
                    element.style.color = basePairColors.C
                    break;
    
                default:
                    break
            }
        })
    }, [basePairColors])

    // loading
    useEffect(() => {
        setbpPresent(document.querySelectorAll('.bp').length)
    }, [basePairElements])

    useEffect(() => {
        if(bpPresent === renderSequence.length && bpPresent > 1) {
            setIsLoaded(true)
        }
        else {
            setIsLoaded(false)
        }
    }, [bpPresent, renderSequence])

    useEffect(() => { // note: can remove loading gif after loaded?
        if (isLoaded === true) {
            setVisibility('visible')
            setIconVisibility('hidden')
        } 
        else {
            setVisibility('hidden')
            setIconVisibility('visible')
        }
        // eslint-disable-next-line
    }, [isLoaded])

    useEffect(() => {
        setIsLoaded(!isLoaded)
    // eslint-disable-next-line
    }, [reload])


    
    function showBasePair(event) { // note: should incorporate this functionality into a feature
        console.log('bp: ' + event.target.id)
    }

    



    return (
        <div id="container" style={{ zIndex: 0, height: `fit-content`, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: headerMargin, overflowX: 'clip' }}>
            <div id="column" style={{ visibility: visibility, height: '100%', width: `${(100 - dnaContainerSize) / 2}%`, display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>{leftCounters}</div>
                <div id="dna" style={{ visibility: visibility, width: `${dnaContainerSize}%`, height: '100%', justifyContent: 'center', marginBottom: marginBottom }}>
                    {rowElements}
                </div>
            <div id="column" style={{ visibility: visibility, height: '100%', width: `${(100 - dnaContainerSize) / 2}%`, display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>{rightCounters}</div>
            {annotationText}
            {editBox}
        </div>
    )
}
