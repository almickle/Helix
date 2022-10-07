import { useEffect, useState } from "react"
import CheckYes from '../assets/CheckYes.png'
import CheckNo from '../assets/CheckNo.png'

export default function Inputs ( { inputValues, setInputValues, inputs } ) {

    const [passwordIcon, setPasswordIcon] = useState()

    const checkYes = <img style={{ height: 18, marginTop: 4 }} src={CheckYes} alt='passwords match'/>
    const checkNo = <img style={{ height: 18, marginTop: 4 }} src={CheckNo} alt='passwords do not match'/>


    useEffect(() => {
        if(inputValues !== null) { 
            if(inputValues.confirm) {
                if(inputValues.password === inputValues.confirm && inputValues.confirm) {
                    setPasswordIcon(checkYes)
                }
                if(inputValues.password !== inputValues.confirm && inputValues.confirm) {
                    setPasswordIcon(checkNo)
                }
            }
            else {
                setPasswordIcon()
            }
            
        }
        //eslint-disable-next-line
    }, [inputValues])


    function handleInputChange(event) {
        const key = (event.target.id).toLowerCase()
        setInputValues({ ...inputValues, [key]: event.target.value})
    }

    const inputElements = inputs.map((label, index) => {

        if(index === 2 || index === 3) {
            return (
                <div key={label} className="input">
                    <input className="input" onChange={handleInputChange} autoComplete="off" id={label} type='text' style={{ marginBottom: 10, width: 140 }}></input>
                    <span className="input" style={{ position: 'absolute', right: 41 }}>{passwordIcon}</span>
                </div>
            )
        } 
        else {
            return (
                <input className="input" key={label} onChange={handleInputChange} autoComplete="off" id={label} type='text' style={{ marginBottom: 10, width: 140 }}></input>
            )
        }
    })

    return (
        <div className="input" style={{ display: 'flex', flexDirection: 'column', height: 'fit-content', width: 'fit-content' }}>
            {inputElements}
        </div>
    )
}