import { useState, useEffect } from 'react'
import PaintBrush from '../../assets/PaintBrush.png'
import BookIcon from '../../assets/BookIcon.png'
import Annotation from '../Annotation'
import Note from '../Note'

export default function AnnotationHandler ( { annotationText, geneData, annotations, setAnnotationText, setTriggerAnnotation, triggerAnnotation } ) {

    const [annotationSequence, setAnnotationSequence] = useState([])
    const [triggerHighlight, setTriggerHighlight] = useState(false)
    const [isAnnotating, setIsAnnotating] = useState(false)
    const [annotationToggle, setAnnotationToggle] = useState(false)
    const [paintbrushColor, setPaintbrushColor] = useState()
    const [bookColor, setBookColor] = useState()


    // custom annotation handling
    function handleAddAnnotation() {
        setIsAnnotating(!isAnnotating)
    }

    useEffect(() => {
        console.log('fired')
        if(isAnnotating === true) { // bug: need fixing; event handler cleanup etc
            document.addEventListener('mousedown', handleStartDrag)
            document.addEventListener('mouseup', handleDragEnd)
        }
        return () => {
            document.removeEventListener('mousedown', handleStartDrag)
            document.removeEventListener('mouseup', handleDragEnd)
        }
        // eslint-disable-next-line
    }, [isAnnotating, triggerHighlight])

    const highlightedBp = []

    function handleStartDrag(event) {
        highlightedBp.splice(0, highlightedBp.length)
        if(event.target.className === 'bp') {
            document.getElementById(event.target.id).style.backgroundColor = 'yellow'
            highlightedBp.push(event.target.id)
            document.addEventListener('mouseover', handleWhileDragging)
        }
    }

    function handleWhileDragging(event) {
        const basepair = event.target.id
        if(event.target.className === 'bp') {
            if(parseInt(basepair) === parseInt(Math.max(...highlightedBp)+1) || parseInt(basepair) ===  parseInt(Math.min(...highlightedBp)-1)) {
                document.getElementById(event.target.id).style.backgroundColor = 'yellow'
                highlightedBp.push(event.target.id)
            }
        }
    }

    function handleDragEnd() {
        if(highlightedBp.length > 1) {
            const bpLowToHigh = highlightedBp.sort((a, b) => a - b)
            setAnnotationSequence(bpLowToHigh)
            document.removeEventListener('mouseover', handleWhileDragging)
            document.removeEventListener('mousedown', handleStartDrag)
        }
    }

    useEffect(() => {
        if(annotationSequence.length > 1) { // note: configure for flexibility and ?transcript index?        
            setAnnotationText(<Annotation basepairs={annotationSequence} transcriptIndex={null} isProtein={false} annotationToggle={annotationToggle} triggerAnnotation={triggerAnnotation} setTriggerAnnotation={setTriggerAnnotation} setAnnotationText={setAnnotationText} setTriggerHighlight={setTriggerHighlight} triggerHighlight={triggerHighlight} geneData={geneData}/>)
        }
        // eslint-disable-next-line
    }, [annotationSequence])

    useEffect(() => {
        console.log('annotationText')
        console.log(annotationText)
    }, [annotationText])

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
        else { // bug: click away note close overrides new annotation
        //    setAnnotationText(null)
        }
    }

    useEffect(() => { // bug: remove event listener when gene changes
        if(annotationToggle === true) {
            document.addEventListener('click', showNote)
        } 
        return () => {
            document.removeEventListener('click', showNote)
        }
        // eslint-disable-next-line
    }, [annotationToggle])



    return (
        <div style={{ height: '100%', width: 'fit-content', display: 'flex', flexDirection: 'row' }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 12, paddingRight: 12, backgroundColor: bookColor }}><img onClick={toggleAnnotations} src={BookIcon} style={{ height: '72%', cursor: 'pointer' }} alt="paint icon: make an annotation" /> </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 6, paddingRight: 6, backgroundColor: paintbrushColor}}><img onClick={handleAddAnnotation} src={PaintBrush} style={{ height: '115%', cursor: 'pointer' }} alt="paint icon: make an annotation" /> </span>
        </div>
    )
}