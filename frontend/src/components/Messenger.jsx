import { useContext } from 'react';
import { AppBar, Toolbar, styled, Box } from '@mui/material';

// import { AccountContext } from '../context/AccountProvider.jsx';

//components
import ChatDialog from './chat/ChatDialog.jsx';
import LoginDialog from '../pages/Login.jsx';
import { useSelector } from 'react-redux';
import Login from '../pages/Login.jsx';

const Component = styled(Box)`
    height: 100vh;
    background: #DCDCDC;
`;

const Header = styled(AppBar)`
    background-color: #00A884;
    height: 125px;
    box-shadow: none;
`;
    
const LoginHeader = styled(AppBar)`
    background: #00bfa5;
    height: 200px;
    box-shadow: none;
`;

const Messenger = () => {
    // const { account } = useContext(AccountContext);
    const user=useSelector((state)=> state.user?.user)
    return (
        // <Component>
        <>
            {
                user ? 
                <>
                    <Header>
                        <Toolbar></Toolbar>
                    </Header>
                    <ChatDialog />
                </>
                :
                <>
                    {/* <LoginHeader>
                        <Toolbar></Toolbar>
                    </LoginHeader> */}
                    <Login/>
                </>
            }
        
        </>
    )
}

export default Messenger;