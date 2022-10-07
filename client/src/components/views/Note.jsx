

export default function Note ( { basepairs, content } ) {


    const annotationStyle = {
        height: 'fit-content', width: 200,
        position: 'absolute', 
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white', 
        border: 'solid', borderWidth: 1, borderRadius: 10,
        left: document.getElementById(basepairs[0]).offsetLeft+((basepairs.length*20-180)/2), top: document.getElementById(basepairs[0]).offsetTop+30-document.getElementById('main').scrollTop,
    }


    return (
        <div id='note' style={annotationStyle}>
            <span style={{ fontSize: 18, marginTop: 10, marginBottom: 6, fontWeight: 600, textAlign: 'left', width: '80%', borderBottom: 'solid', paddingBottom: 6, borderWidth: 1 }}>{content.title}</span>
            <span style={{ textAlign: 'left', width: '80%' }}>{content.body}</span>
            <span style={{ fontSize: 14, fontWeight: 600, marginTop: 8, marginBottom: 10, textAlign: 'right', width: '80%'}}>{content.begin}...{content.end}</span>
        </div>
    )
}