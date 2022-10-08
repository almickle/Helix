

export default function SeqRange () {

    const radius = 30
    const height = 25

    function handleFocus(event) {
        event.target.style.border = 'none'
        event.target.style.outline = 'none'
    }

    function handleSubmit(event) {
        event.preventDefault()
        document.getElementById('range-begin').value = ''
        document.getElementById('range-end').value = ''
    }

    return (
        <div style={{height: height, width: 'fit-content', backgroundColor: 'white', borderRadius: radius, marginLeft: 20, display: 'flex', flexDirection: 'row', position: 'relative', zIndex: 3 }}>
            <form autoComplete='off' onSubmit={handleSubmit}>        
                <input id='range-begin' type='text' placeholder='1' style={{ height: height-2, width: 80, backgroundColor: 'white', borderRadius: radius, border: 'none' }} onFocus={(event) => handleFocus(event)}></input>
                <input id='range-end' type='text' placeholder='1000' style={{ height: height-2, width: 80, backgroundColor: 'white', borderRadius: radius, border: 'none' }} onFocus={(event) => handleFocus(event)}></input>
                <input type='submit' style={{ width: 0, height: 0, visibility: 'hidden', position: 'absolute' }}></input>
            </form>
        </div>
    )
}