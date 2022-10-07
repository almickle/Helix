
export default function CollapsibleIcon ( { handleClick, label} ) {

    const iconHeight = 20
    const iconWidth = 20
    
    
    return (
        <div id={label} onClick={handleClick} style={{ height: iconHeight, width: iconWidth, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: 4 }}>
           <img id={label} src="https://cdn4.iconfinder.com/data/icons/interface-essential-1/24/button-parallel-vertical-lines-menu-navigation-three-hamburger-512.png" alt="drop down menu icon" style={{ height: iconHeight, transform: 'rotate(0deg)', cursor: 'pointer' }} />
        </div>
    )
}

