

export default function Sidebar ( { sidebarWidth } ) {

    const sidebarStyle = { 
        height: '100%', width: `${sidebarWidth}%`, 
        // borderStyle: 'solid', borderWidth: 1, borderColor: 'rgb(140, 140, 140)',
        backgroundColor: "rgb(40, 40, 40)",
        position: "relative"
    }

    return (
        <div style={sidebarStyle}>

        </div>
    )
}