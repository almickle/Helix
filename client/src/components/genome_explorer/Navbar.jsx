import { Link } from 'react-router-dom'
import Home from './assets/Home.jpeg'
import ProteinIcon from './assets/ProteinIcon.jpeg'


export default function Navbar ( { navbarWidth } ) {

    return (
        <div style={{ display: "flex", flexDirection: 'column', height: '100%', width: `${navbarWidth}%` }}>
            <div style={{ width: '100%', height: '5%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <img src={Home} alt='home icon' style={{ height: '140%', borderRadius: 15, zIndex: 4, borderStyle: 'solid', borderWidth: 2, borderColor: 'rgb(40, 40, 40)' }}/>
            </div>
            <div style={{ display: "flex", flexDirection: 'column', height: '100%', width: '100%', marginTop: 11, borderRight: 'solid', borderWidth: 2, borderColor: 'rgb(40, 40, 40)', boxSizing: 'border-box' }}>
                <Link to='/protein_explorer' style={{ height: '4%', width: '100%', marginTop: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <img src={ProteinIcon} alt='protein icon' style={{ height: '90%' }}/>
                </Link>
                <Link to='/' style={{ height: '4%', width: '100%', marginTop: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <span>Link</span>
                </Link>
                <Link to='/' style={{ height: '4%', width: '100%', marginTop: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <span>Link</span>
                </Link>
                <Link to='/' style={{ height: '4%', width: '100%', marginTop: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <span>Link</span>
                </Link>
            </div>
        </div>
    )
}