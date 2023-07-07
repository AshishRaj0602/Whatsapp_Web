import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import { UserContext } from '../../../context/UserProvider'
import { getConversation } from '../../../utils/services/Api'
import { useSelector } from 'react-redux'
const ChatBox = () => {
  const {person}=useContext(UserContext);
  const account=useSelector(state=>state?.user?.user);
  const [conversation, setConversation]=useState({});
  useEffect(() => {
    const getConverSationDetails=async() => {
      let data=await getConversation({senderId:account._id,receiverId:person._id});
      setConversation(data);
    }
    getConverSationDetails();
  }, [person._id,account._id]);
  return (
    <Box>
      <ChatHeader person={person}/>
      <Messages person={person} conversation={conversation}/>
    </Box>
  )
}

export default ChatBox
