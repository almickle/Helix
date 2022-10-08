import { useEffect, useState } from "react"
import Inputs from "./Inputs"
import Labels from "./Labels"
import DNAIcon from '../assets/DNAIcon.png'
import '../style/modalAnimation.css'

export default function LoginModal ( { loginModalVisible, setLoginModalVisible, setModalVisible, setUser } ) {

    const [modalVisibility, setModalVisibility] = useState('hidden')
    const [animation, setAnimation] = useState([])

    const [loginObject, setLoginObject] = useState(null)
    const [inputValues, setInputValues] = useState(null)

    const loginInputs = ['Username', 'Password']
    const labels = ['Username', 'Password']



    useEffect(() => {
        if(loginModalVisible === true) {
            setModalVisibility('visible')
            setAnimation(['sideEnter', '0.5s'])
        }
        else {
            setAnimation(['modalLeave', '0.1s'])
            setTimeout(() => {
                setModalVisibility('hidden')
            }, 80)
        }
      }, [loginModalVisible])

    useEffect(() => {
        if(inputValues !== null) {
            if(inputValues.username && inputValues.password) {
                setLoginObject(inputValues)
            }
        }
    }, [inputValues])


    function handleLogin() {
        if(loginObject !== null) {
                fetch('https://www.helixgenomes.com/login', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(loginObject)
                })
                .then(resp => {
                        if(resp.ok) {
                            resp.json().then(user => setUser(user)).then(() => setLoginModalVisible(false))
                        }
                })
        }
    }

    function handleSwitchSignup() {
        setLoginModalVisible(false)
        setModalVisible(true)
    }


    const modalStyle = {
        visibility: modalVisibility, 
        zIndex: 4, 
        height: 280, width: 300, 
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
        <form className='login-modal' autoComplete="off">
            <div style={modalStyle} className="login-modal">
                <div className="login-modal" style={{ display: 'flex', flexDirection: 'row', height: 'fit-content', width: 'fit-content', marginBottom: 32 }}>
                    <span className="login-modal" style={{ display: 'flex', alignItems: 'center', fontSize: 24 }}>Welcome to<img className='login-modal' src={DNAIcon} style={{ height: 26, marginLeft: 6, marginRight: 2 }} alt='helix logo'/><span className='login-modal' style={{ fontSize: 26, fontWeight: 600 }}>Helix</span></span>
                </div>
                <div className="login-modal" style={{ display: 'flex', flexDirection: 'row', height: 'fit-content', width: 'fit-content' }}>
                    <Labels labels={labels}/>
                    <Inputs inputs={loginInputs} inputValues={inputValues} setInputValues={setInputValues}/>
                </div>
                <span className="login-modal" onClick={handleLogin} style={{ height: 30, width: 'fit-content', borderRadius: 15, backgroundColor: "#007CC7", paddingLeft: 10, paddingRight: 10, marginTop: 12, marginBottom: 16, display: 'flex', alignItems: 'center', color: 'white', cursor: 'pointer', fontWeight: 500 }}>Login</span>
                <span className="login-modal">Don't have an account? <span className="login-modal" onClick={handleSwitchSignup} style={{ color: "#007CC7", cursor: 'pointer' }}>Signup</span></span>
            </div>
        </form>
    )
}
