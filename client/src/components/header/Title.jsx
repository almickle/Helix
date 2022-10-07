import DNAIcon from '../assets/DNAIcon.png'
export default function Title ( ) {


    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
            <img src={DNAIcon} style={{ height: '70%', marginRight: 5}} alt='DNA logo icon'/>
            <span style={{ fontSize: 28, color: 'rgb(255, 255, 255)', fontWeight: 600 }}>Helix</span>
        </div>
    )
}