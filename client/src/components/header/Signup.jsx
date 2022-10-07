import { useEffect, useState } from "react"
import Inputs from "./Inputs"
import Labels from "./Labels"
import DNAIcon from '../assets/DNAIcon.png'
import '../style/modalAnimation.css'

export default function Signup ( { modalVisible, setModalVisible, setLoginModalVisible, setUser } ) {

    const [modalVisibility, setModalVisibility] = useState('hidden')
    const [animation, setAnimation] = useState([])

    const [signupObject, setSignupObject] = useState(null)
    const [inputValues, setInputValues] = useState(null)

    const signupInputs = ['Username', 'Email', 'Password', 'Confirm']
    const labels = ['Username', 'Email', 'Password', 'Confirm']


    useEffect(() => {
        if(modalVisible === true) {
            setModalVisibility('visible')
            setAnimation(['modalEnter', '0.5s'])
        }
        else {
            setAnimation(['modalLeave', '0.3s'])
            setTimeout(() => {
                setModalVisibility('hidden')
            }, 200)
        }
      }, [modalVisible])

    useEffect(() => {
        if(inputValues !== null) {
            if(inputValues.username && inputValues.email && inputValues.password && inputValues.confirm) {
                if(inputValues.password === inputValues.confirm && inputValues.username.length >= 6 && inputValues.password.length >= 6) {
                    setSignupObject(inputValues)
                }
            }
        }
    }, [inputValues])


    function handleSignup() {
        if(signupObject !== null) {
            setModalVisible(false)
            fetch('https://fierce-springs-30684.herokuapp.com/signup', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupObject)
            })
            .then(resp => resp.json())
            .then(user => {
                if(user.id !== null) {
                    fetch('https://fierce-springs-30684.herokuapp.com/login', {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(signupObject)
                        })
                        .then(resp => resp.json())
                        .then(user => setUser(user))
                }
            })
        }
    }

    function handleSwitchLogin() {
        setModalVisible(false)
        setLoginModalVisible(true)
    }

    const modalStyle = {
        visibility: modalVisibility, 
        zIndex: 4, 
        height: 300, width: 300, 
        position: 'absolute', 
        top: '30%', left: '45%', 
        marginRight: '-50%', 
        backgroundColor: 'white', 
        borderStyle: 'solid', borderWidth: 1, borderRadius: 18, borderColor: 'grey', 
        boxShadow: '0px 0px 10px 0px grey',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        animationName: animation[0], animationDuration: animation[1]
    }
    


    return (
        <form className='signup-modal' autoComplete="off">
            <div style={modalStyle} className='signup-modal'>
                <div className='signup-modal' style={{ display: 'flex', flexDirection: 'row', height: 'fit-content', width: 'fit-content', marginBottom: 22 }}>
                    <span className='signup-modal' style={{ display: 'flex', alignItems: 'center', fontSize: 24 }}>Welcome to<img className='signup-modal' src={DNAIcon} style={{ height: 26, marginLeft: 6, marginRight: 2 }} alt='helix logo'/><span className='login-modal' style={{ fontSize: 26, fontWeight: 600 }}>Helix</span></span>
                </div>
                <div className='signup-modal' style={{ display: 'flex', flexDirection: 'row', height: 'fit-content', width: 'fit-content' }}>
                    <Labels labels={labels}/>
                    <Inputs inputs={signupInputs} inputValues={inputValues} setInputValues={setInputValues}/>
                </div>
                <span className='signup-modal' onClick={handleSignup} style={{ height: 30, width: 'fit-content', borderRadius: 15, backgroundColor: "#007CC7", paddingLeft: 10, paddingRight: 10, marginTop: 8, marginBottom: 8, display: 'flex', alignItems: 'center', color: 'white', cursor: 'pointer', fontWeight: 500 }}>Signup</span>
                <span className='signup-modal'>Already have an account? <span className='signup-modal' onClick={handleSwitchLogin} style={{ color: "#007CC7", cursor: 'pointer' }}>Login</span></span>
            </div>
        </form>
    )
}