import { useState } from 'react'
import TrashIcon from '../assets/TrashIcon.png'
import EditIcon from '../assets/EditIcon.png'
import '../style/modalAnimation.css'

export default function Note ( { basepairs, content, setTriggerAnnotation, triggerAnnotation, setAnnotationText } ) {

    const [iconsVisibility, setIconsVisibility] = useState('hidden')
    const [animation, setAnimation] = useState([])

    const annotationStyle = {
        height: 'fit-content', width: 200,
        position: 'absolute', 
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white', 
        border: 'solid', borderWidth: 1, borderRadius: 10,
        left: document.getElementById(basepairs[0]).offsetLeft+((basepairs.length*20-180)/2), top: document.getElementById(basepairs[0]).offsetTop+30-document.getElementById('main').scrollTop,
    }

    function handleShowIcons() {
        setAnimation(['fadeIn', '1s'])
        setIconsVisibility('visible')
    }

    function handleHideIcons() {
        setAnimation(['fadeOut', '0.5s'])
        setTimeout(() => setIconsVisibility('hidden'), 500)
    }

    function deleteAnnotation() {
        setAnnotationText(null)
        basepairs.forEach((bp) => {
            document.getElementById(bp).style.backgroundColor = 'unset'
        })
        fetch('/deleteannotation', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id: content.id })
        })
        .then(() => setTriggerAnnotation(!triggerAnnotation))
    }


    return (
        <div id='note' style={annotationStyle} onMouseEnter={handleShowIcons} onMouseLeave={handleHideIcons}>
            <span style={{ fontSize: 18, marginTop: 10, marginBottom: 6, fontWeight: 600, textAlign: 'left', width: '80%', borderBottom: 'solid', paddingBottom: 6, borderWidth: 1 }}>{content.title}</span>
            <span style={{ textAlign: 'left', width: '80%', marginBottom: 4 }}>{content.body}</span>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', visibility: iconsVisibility, animationName: animation[0], animationDuration: animation[1] }}>
                    <img onClick={deleteAnnotation} src={TrashIcon} style={{ height: 20, cursor: 'pointer' }} alt='delete annotation'/>
                    <img src={EditIcon} style={{ height: 20, marginLeft: 6, cursor: 'pointer' }} alt='edit annotation'/>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, marginTop: 8, marginBottom: 10, textAlign: 'right', width: '80%'}}>{content.begin}...{content.end}</span>
            </div>
        </div>
    )
}