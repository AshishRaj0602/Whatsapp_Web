import React from 'react'
import UserProvider from '../context/UserProvider'
import AccountProvider from '../context/AccountProvider'
import Messenger from '../components/Messenger'

const Home = () => {
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
