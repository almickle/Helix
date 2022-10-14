import { useEffect } from 'react'
import loginIcon from '../assets/loginIcon.png'

export default function Login ( { setUser, user, setModalVisible, modalVisible, setLoginModalVisible, loginModalVisible } ) {


    useEffect(() => {
        fetch('/me', {
            credentials: 'include',
        })
        .then(resp => {
            if(resp.ok) {
                resp.json().then(user => setUser(user))
            }
        })
        // eslint-disable-next-line
    }, [])

    function handleLogin() {
        if (user.username !== 'guest') {
            fetch('/logout', {
                method: 'DELETE',
                credentials: 'include',
            })
            .then(() => setUser({ username: 'guest' }))
        }
        else {
            if(modalVisible === true) {
                setModalVisible(false)
            }
            if(loginModalVisible === true) {
                setLoginModalVisible(false)
            }
            if(loginModalVisible === false && modalVisible === false) {
                setModalVisible(true)
            }
        }
    }



    return (
        <div onClick={handleLogin} id='login-icon' style={{ display: 'flex', height: '100%', width: 50, justifyContent: 'flex-end', alignItems: 'center', marginRight: '0.2%' }}>
            <span style={{ marginRight: 5 }}>{user.username}</span>
            <img id='login-button' src={loginIcon} style={{ height: '92%', cursor: 'pointer' }} alt='login icon' />
        </div>
    )
}