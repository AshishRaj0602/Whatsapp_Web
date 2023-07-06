import React from 'react'
import UserProvider from '../context/UserProvider'
import AccountProvider from '../context/AccountProvider'
import Messenger from '../components/Messenger'
import { useSelector } from 'react-redux'
import Login from './Login'

const Home = () => {
    const user=useSelector((state)=>state.user.user);
  return (
    <div>
      <UserProvider>
          <AccountProvider>
            {<Messenger/>}
          </AccountProvider>
        </UserProvider>
    </div>
  )
}

export default Home
