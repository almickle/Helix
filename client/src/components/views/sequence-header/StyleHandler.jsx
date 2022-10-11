import { useEffect } from 'react'
import { useState } from 'react'
import Circles from '../../assets/Circles.png'

export default function StyleHandler ( { sequenceStyle, setSequenceStyle } ) {

    const [styleColor, setStyleColor] = useState()
    const [isStyle, setIsStyle] = useState(false)

    useEffect(() => {
        if(isStyle === true) {
            setStyleColor('white')
        }
        else {
            setStyleColor('unset')
        }
    }, [isStyle])


    function setStyling() {
        setSequenceStyle(!sequenceStyle)
        setIsStyle(!isStyle)
    }

    return (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 6, paddingRight: 6, backgroundColor: styleColor }}>
            <img onClick={setStyling} src={Circles} style={{ height: '80%', cursor: 'pointer' }} alt="style icon: set styling options" />
        </span>
    )
}