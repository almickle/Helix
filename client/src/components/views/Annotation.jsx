import CheckYes from '../assets/CheckYes.png'
import CheckNo from '../assets/CheckNo.png'
import Note from './Note'
import { useEffect } from 'react'

export default function Annotation ( { basepairs, transcriptIndex, isProtein, annotationToggle, setAnnotationText, triggerAnnotation, setTriggerAnnotation, setTriggerHighlight, triggerHighlight, geneData } ) {


    const annotationStyle = {
        height: 200, width: 180,
        position: 'absolute', 
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white', 
        border: 'solid', borderWidth: 1, borderRadius: 10,
        left: document.getElementById(basepairs[0]).offsetLeft+((basepairs.length*20-180)/2), top: document.getElementById(basepairs[0]).offsetTop+30-document.getElementById('main').scrollTop,
        opacity: '90%'
    }

    function handleSaveAnnotation() {
        const title = document.getElementById('annotation-title').value
        const body = document.getElementById('annotation-body').value
        console.log('basepairs')
        console.log(basepairs)
        console.log('data')
        console.log('title: ' + title)
        console.log('body: ' + body)
        console.log('symbol: ' + geneData.symbol)
        console.log('begin: ' + basepairs[0])
        console.log('end: ' + basepairs[basepairs.length-1])
        if(annotationToggle === true) {
            setAnnotationText(<Note basepairs={basepairs} content={{title: title, body: body, begin: basepairs[0], end: basepairs[basepairs.length-1]}}/>)
        }
        else {
            setAnnotationText(null)
        }
        fetch('/newannotation', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    symbol: geneData.symbol,
                    transcriptIndex: transcriptIndex,
                    protein: isProtein,
                    title: title,
                    body: body,
                    begin: parseInt(basepairs[0]),
                    end: parseInt(basepairs[basepairs.length-1])
                })
            })
        .then(() => {
            setTriggerAnnotation(!triggerAnnotation)
            setTriggerHighlight(!triggerHighlight)
        })
    }  

    function handleCancelAnnotation() {
        setAnnotationText(null)
        basepairs.forEach((id) => {
            document.getElementById(id).style.backgroundColor = 'unset'
        })
        setTriggerHighlight(!triggerHighlight)
    }


    useEffect(() => {
        console.log('annotation sequence')
        console.log(basepairs)
    }, [basepairs])

    useEffect(() => {
        console.log('test')
    }, [])


    return (
        <div style={annotationStyle}>
            <input id='annotation-title' style={{ height: '14%', width: '78%', marginBottom: 10, fontSize: 16, marginTop: 12 }} type="text" placeholder='Annotation title..'></input>
            <textarea id='annotation-body' style={{ height: '50%', width: '80%' }} placeholder='custom text here'></textarea>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', height: '12%', width: '80%', marginTop: 7 }}>
                <img src={CheckNo} onClick={handleCancelAnnotation} style={{ height: '100%', cursor: 'pointer' }} alt='no x icon'/>
                <img src={CheckYes} onClick={handleSaveAnnotation} style={{ height: '100%', cursor: 'pointer' }} alt='yes check icon'/>
            </div>
        </div>
    )
}