import { useContext, useEffect, useState } from 'react';

import { styled, Box, Typography } from "@mui/material";

import { UserContext } from '../../../context/UserProvider';
import { AccountContext } from '../../../context/AccountProvider';

import { setConversation, getConversation, getMessages } from '../../../utils/services/Api.js';
import { defaultProfilePicture } from '../../../constants/data';
import { formatDate } from '../../../utils/common-utils';
import { useSelector } from 'react-redux';

const Component = styled(Box)`
    height: 45px;
    display: flex;
    padding: 13px 0;
    cursor: pointer;
`;
    
const Image = styled('img') ({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%',
});

const Container = styled(Box)`
    display: flex;
`;

const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: #00000099;
    margin-right: 20px;
`;

const Text = styled(Typography)`
    display: block;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
`;

const Conversation = ({ user }) => {
    const url = user.picture || defaultProfilePicture;
    const { setPerson } = useContext(UserContext);
    const {newMessageFlag }  = useContext(AccountContext);
    const account = useSelector(state=> state.user?.user);

    const [message, setMessage] = useState({});

    useEffect(() => {
        const getConversationMessage = async() => {
            const data = await getConversation({ senderId: account?._id, receiverId: user?._id });
            let mess=await getMessages(data?._id);
            let latest=mess?.pop();
            if(latest) setMessage({ text: latest?.text, timestamp: latest?.updatedAt });
        }
        getConversationMessage();
    }, [newMessageFlag]);

    const getUser = async () => {
        setPerson(user);
        await setConversation({ senderId: account?._id, receiverId: user?._id });
    }

    return (
        <Component onClick={() => getUser()} style={{height:'90%'}}>
            <Box style={{margin:'0 10px'}}>
                <Image src={url} alt="display picture" />
            </Box>
            <Box style={{width: '100%'}}>
                <Container >
                    <Typography >{user.name}</Typography>
                    { 
                        message?.text && 
                        <Timestamp>{formatDate(message?.timestamp)}</Timestamp>        
                    }
                </Container>
                <Box>
                    <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
                </Box>
            </Box>
        </Component>
    )
}

export default Conversation;