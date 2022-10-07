import { useState, useEffect } from 'react'
import Login from './Login'
import SearchBar from './SearchBar'
import Title from './Title'
import Signup from './Signup'
import LoginModal from './LoginModal'

export default function Header ( { headerHeight, handleSearchSubmit, setUser, user } ) {

    const [modalVisible, setModalVisible] = useState(false)
    const [loginModalVisible, setLoginModalVisible] = useState(false)
    

    useEffect(() => {
        if(loginModalVisible || modalVisible) {
            document.addEventListener('click', handleClickAway)
        }
        // eslint-disable-next-line
    }, [modalVisible])

    function handleClickAway(event) {
        if(event.target.id !== 'login-button') {
            if(event.target.className !== 'login-modal' && event.target.className !== 'signup-modal' && event.target.className !== 'input' && event.target.className !== 'label') {
                setModalVisible(false)
                setLoginModalVisible(false)
                document.removeEventListener('click', handleClickAway)
            }
        }
    }


    return (
        <div style={{height: `${headerHeight}%`, width: '100%', backgroundColor: `rgb(200, 200, 200)`, display: 'flex', flexDirection: 'row', alignItems: 'center', zIndex: 3 }}>
            <SearchBar handleSearchSubmit={handleSearchSubmit} />
            <Title />
            <Login setUser={setUser} user={user} modalVisible={modalVisible} setModalVisible={setModalVisible} setLoginModalVisible={setLoginModalVisible} loginModalVisible={loginModalVisible}/>
            <Signup handleClickAway={handleClickAway} modalVisible={modalVisible} setModalVisible={setModalVisible} setLoginModalVisible={setLoginModalVisible} setUser={setUser} />
            <LoginModal handleClickAway={handleClickAway} loginModalVisible={loginModalVisible} setLoginModalVisible={setLoginModalVisible} setModalVisible={setModalVisible} setUser={setUser}/>
        </div>
    )
}