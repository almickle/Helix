import Home from '../../genome_explorer/assets/Home.jpeg'
import Title from '../../genome_explorer/header/Title'

export default function Header ( { headerHeight } ) {

    const headerStyle = {
        width: '100%', height: `${headerHeight}%`,
        // borderBottom: 'solid', borderColor: 'rgb(140, 140, 140)', borderWidth: 1,
        backgroundColor: "rgb(40, 40, 40)",
        display: 'flex', flexDirection: 'row',
        position: 'relative', zIndex: 1
    }

    return (
        <div style={headerStyle}>
            <div style={{ width: '4%', marginLeft: -11, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <img src={Home} alt='home icon' style={{ height: '140%', borderRadius: 15, zIndex: 4, borderStyle: 'solid', borderWidth: 2, borderColor: 'rgb(40, 40, 40)' }}/>
            </div>
            <Title />
        </div>
    )
}