import { useEffect } from 'react'
import { useState } from 'react'
import DNA_Features from '../../assets/DNA_Features.png'

export default function FeaturesHandler ( { transcriptOptions } ) {

    const [featuresColor, setFeaturesColor] = useState()
    const [isFeatures, setIsFeatures] = useState(false)
    const [selectVisibility, setSelectVisibility] = useState('hidden')

    useEffect(() => {
        if(isFeatures === true) {
            setFeaturesColor('white')
            if(transcriptOptions.visibility === true) {
                setSelectVisibility('visible')
            }
        }
        else {
            setFeaturesColor('unset')
            setSelectVisibility('hidden')
        }
        // eslint-disable-next-line
    }, [isFeatures])

    
    function setShowFeatures() {
        setIsFeatures(!isFeatures)
    }


    function handleFocus(event) {
        event.target.style.border = 'none'
        event.target.style.outline = 'none'
    }

    
    const selectOptions = transcriptOptions.transcripts.map((transcript, index) => {
        return (
            <option style={{ color: 'black' }}>Transcript {index+1}</option>
        )
    })


    return (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '9%', paddingLeft: 6, paddingRight: 6, backgroundColor: featuresColor }}>
            <img onClick={setShowFeatures} src={DNA_Features} style={{ height: '70%', cursor: 'pointer' }} alt="style icon: set styling options" />
            <div style={{ visibility: selectVisibility, width: '6%', height: 10, position: 'absolute', bottom: -10, display: 'flex', justifyContent: 'center' }}>
                <select title='transcript-feature-select' id="transcript-feature-select" style={{ width: 'fit-content', height: 12, fontSize: 10, border: 'none', color: 'grey', marginLeft: 6 }} onFocus={handleFocus}>
                    {selectOptions}
                </select>
            </div>
        </span>
    )
}