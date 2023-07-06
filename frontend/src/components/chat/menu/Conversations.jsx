import { useState, useEffect, useContext } from 'react';

import { Box, styled, Divider } from '@mui/material';

import { AccountContext } from '../../../context/AccountProvider';

//components
import Conversation from './Conversation';
import { getAllUsers } from '../../../utils/services/Api'
import { useSelector } from 'react-redux';

const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
`;

const StyledDivider = styled(Divider)`
margin: 0 0 0 70px;
background-color: #e9edef;
opacity: .6;
`;

const Conversations = ({ text }) => {
    const [users, setUsers] = useState([]);
    const account=useSelector((state)=> state?.user?.user);
    const { setActiveUsers,socket } = useContext(AccountContext);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getAllUsers(account);
            let fiteredData = data?.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(fiteredData);
        }
        fetchData();
    }, [text]);

    useEffect(() => {
        socket.current.emit('addUser', account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        })
    }, [account])
    return (
        <Component>
            {
                users && users.map((user, index) => (
                    
                        <div key={index}>
        
                            <Conversation user={user} />
                            {
                                users.length !== (index + 1)  && <StyledDivider />
                            }
                        </div>
                ))
            }
        </Component>
    )
}

export default Conversations;