

export default function Footer ( ) {

    const footerStyle = { 
        height: '5.2%', width: '40%', 
        borderRadius: 20, borderStyle: 'solid', borderWidth: 1, borderColor: 'rgb(140, 140, 140)',
        backgroundColor: "rgb(40, 40, 40)", color: 'white',
        position: "absolute", bottom: '2%', marginRight: '40%', marginLeft: '30%',
        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    }

    return (
        <div style={footerStyle}>
            <span>Toggle amino</span>
        </div>
    )
}