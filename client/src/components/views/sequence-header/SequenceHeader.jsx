import { useEffect, useState } from 'react'
import Bookmark from '../../assets/Bookmark.png'
import BookmarkColored from '../../assets/BookmarkColored.png'
import CopyIcon from '../../assets/CopyIcon.png'
import Circles from '../../assets/Circles.png'
import SeqRange from './SeqRange'
import AnnotationHandler from './AnnotationHandler'


export default function SequenceHeader ( { geneData, setTriggerAnnotation, triggerAnnotation, annotations, setAnnotationText, sequenceStyle, setSequenceStyle, rerenderLibrary, setRerenderLibrary, rawSequence, handleAddAnnotation, isAnnotating } ) {

    const headerSize = 60

    const [inLibrary, setInLibrary] = useState(false)
    const [bookmarkIcon, setBookmarkIcon] = useState(Bookmark)


    // note: should migrate header icon functionalities to specialized components

    function setStyling() {
        setSequenceStyle(!sequenceStyle)
    }

    function handleAddToClipboard() {
        navigator.clipboard.writeText(rawSequence)
    }

    function handleAddToLibrary() {
        if(inLibrary === true) {
            fetch('/removegene', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ symbol: geneData.symbol })
            })
            .then(() => {
                setRerenderLibrary(!rerenderLibrary)
                setInLibrary(false)
            })
        }
        else {
            fetch('/addgene', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ symbol: geneData.symbol, taxon: geneData.taxname })
            })
            .then(() => {
                setRerenderLibrary(!rerenderLibrary)
                setInLibrary(true)
            })
        }
    }

    // get library
    useEffect(() => {
        const library = []
        fetch('/genelibrary', {
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include'
        })
        .then(resp => resp.json())
        .then(data => {
            data.forEach((gene) => {
                library.push(gene.symbol)
            })
            if(library.includes(geneData.symbol)) {
                setInLibrary(true)
            } 
            else {
                setInLibrary(false)
            }
        })
    }, [geneData])

    // check if in library
    useEffect(() => {
        if(inLibrary === true) { // bug: should only add to library if post successful
            setBookmarkIcon(BookmarkColored)
        } 
        else {
            setBookmarkIcon(Bookmark)
        }
    }, [inLibrary])




    
    // note: need to style header and icons

    return (
        <div id="header" style={{ zIndex: 2, position: 'fixed', height: headerSize, width: '70%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(220, 220, 220)', borderRadius: '0px 0px 10px 10px' }}>
            <div style={{ width: '20%' }}>
                <SeqRange />
            </div>
            <div style={{ height: '100%', width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 6, paddingRight: 6 }}><img onClick={setStyling} src={Circles} style={{ height: '80%', cursor: 'pointer' }} alt="paint icon: make an annotation" /> </span>
                <AnnotationHandler geneData={geneData} annotations={annotations} setAnnotationText={setAnnotationText} setTriggerAnnotation={setTriggerAnnotation} triggerAnnotation={triggerAnnotation}/>
            </div>
            <div style={{ height: '100%', width: '20%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 6, paddingRight: 6 }}><img onClick={handleAddToLibrary} src={bookmarkIcon} style={{ height: '110%', cursor: 'pointer' }} alt="bookmark icon: add to library" /> </span>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 6, paddingRight: 6 }}><img onClick={handleAddToClipboard} src={CopyIcon} style={{ height: '100%', cursor: 'pointer' }} alt="copy icon: add to clipboard" /> </span>
            </div>
        </div>
    )
}