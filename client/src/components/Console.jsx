

export default function Console ( { consoleHeight } ) {

    return (
        <div id='console' style={{ zIndex: 2, height: `${consoleHeight}%`, width: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', borderTop: 'solid', borderWidth: 1 }}>
            {/* <img src={Chromosome} style={{ height: '100%' }}/> */}
        </div>
    )
}