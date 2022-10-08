import { useEffect, useState } from 'react'
import Bookmark from '../assets/Bookmark.png'
import BookmarkColored from '../assets/BookmarkColored.png'
import CopyIcon from '../assets/CopyIcon.png'
import PaintBrush from '../assets/PaintBrush.png'
import Circles from '../assets/Circles.png'
import BookIcon from '../assets/BookIcon.png'
import Note from './Note'


export default function SequenceHeader ( { geneData, annotations, annotationToggle, setAnnotationToggle, setAnnotationText, sequenceStyle, setSequenceStyle, rerenderLibrary, setRerenderLibrary, rawSequence, handleAddAnnotation, isAnnotating } ) {

    const labelMargin = 7
    const headerSize = 60

    const [inLibrary, setInLibrary] = useState(false)
    const [bookmarkIcon, setBookmarkIcon] = useState(Bookmark)
    const [paintbrushColor, setPaintbrushColor] = useState()

    const [bookColor, setBookColor] = useState()


    function setStyling() {
        setSequenceStyle(!sequenceStyle)
    }

    function handleAddToClipboard() {
        navigator.clipboard.writeText(rawSequence)
    }

    function handleAddToLibrary() {
        if(inLibrary === true) {
            fetch('https://www.helixgenomes.com/removegene', {
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
            fetch('https://www.helixgenomes.com/addgene', {
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
        fetch('https://www.helixgenomes.com/genelibrary', {
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
        if(inLibrary === true) {
            setBookmarkIcon(BookmarkColored)
        } 
        else {
            setBookmarkIcon(Bookmark)
        }
    }, [inLibrary])

    // enable annotating
    useEffect(() => {
        if(isAnnotating === true) {
           setPaintbrushColor('white')
        } 
        else {
            setPaintbrushColor('unset')
        }
    }, [isAnnotating])


    function toggleAnnotations () {
        setAnnotationToggle(!annotationToggle)
    }

    function showAnnotations(annotations) {
        const basepairIDs = []
        annotations.forEach((annotation) => {
            for(let i=annotation.begin; i <= annotation.end; i++) {
                basepairIDs.push(i)
            }
        })
        basepairIDs.forEach((id) => {
            document.getElementById(id).style.backgroundColor = 'yellow'
        })
    }

    function hideAnnotations(annotations) {
        const basepairIDs = []
        setAnnotationText(null)
        annotations.forEach((annotation) => {
            for(let i=annotation.begin; i <= annotation.end; i++) {
                basepairIDs.push(i)
            }
        })
        basepairIDs.forEach((id) => {
            if(document.getElementById(id)) {
                document.getElementById(id).style.backgroundColor = 'unset'
            }
        })
    }

    useEffect(() => {
        if(annotationToggle === true) {
            setBookColor('white')
            showAnnotations(annotations)
        } 
        else {
            setBookColor('unset')
            hideAnnotations(annotations)
        }
        // eslint-disable-next-line
    }, [annotationToggle, annotations])


    function showNote(event) {
        if(event.target.className === 'bp') {
            annotations.forEach((annotation) => {
                const basepairIDs = []
                for(let i=annotation.begin; i <= annotation.end; i++) {
                    basepairIDs.push(i)
                }
                basepairIDs.forEach((id) => {
                    if(parseInt(event.target.id) === id) {
                        setAnnotationText(<Note basepairs={basepairIDs} content={annotation}/>)
                    }
                })                 
            })
        }
        else {
            setAnnotationText(null)
        }
    }

    useEffect(() => {
        if(annotationToggle === true) {
            document.addEventListener('click', showNote)
        } 
        return () => {
            document.removeEventListener('click', showNote)
        }
        // eslint-disable-next-line
    }, [annotationToggle])



    


    return (
        <div id="header" style={{ zIndex: 2, position: 'fixed', height: headerSize, width: '70%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(220, 220, 220)', borderRadius: '0px 0px 10px 10px' }}>
            <span style={{ display: 'flex', flexDirection: 'row', marginLeft: `${labelMargin/6}%`, marginRight: `${labelMargin/6}%` }}>Add feature</span>
            <span style={{ display: 'flex', flexDirection: 'row', marginLeft: `${labelMargin/6}%`, marginRight: `${labelMargin/6}%` }}>Add feature</span>
            <span style={{ display: 'flex', flexDirection: 'row', marginLeft: `${labelMargin/6}%`, marginRight: `${labelMargin/6}%` }}>Add feature</span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 6, paddingRight: 6 }}><img onClick={setStyling} src={Circles} style={{ height: '80%', cursor: 'pointer' }} alt="paint icon: make an annotation" /> </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 12, paddingRight: 12, backgroundColor: bookColor }}><img onClick={toggleAnnotations} src={BookIcon} style={{ height: '72%', cursor: 'pointer' }} alt="paint icon: make an annotation" /> </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 6, paddingRight: 6, backgroundColor: paintbrushColor}}><img onClick={handleAddAnnotation} src={PaintBrush} style={{ height: '115%', cursor: 'pointer' }} alt="paint icon: make an annotation" /> </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 6, paddingRight: 6 }}><img onClick={handleAddToLibrary} src={bookmarkIcon} style={{ height: '110%', cursor: 'pointer' }} alt="bookmark icon: add to library" /> </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 6, paddingRight: 6 }}><img onClick={handleAddToClipboard} src={CopyIcon} style={{ height: '100%', cursor: 'pointer' }} alt="copy icon: add to clipboard" /> </span>
        </div>
    )
}