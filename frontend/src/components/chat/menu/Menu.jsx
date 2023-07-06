import { useState } from 'react';

import { Box } from '@mui/material';

//components
import Header from './Header';
import Search from './Search.jsx';
import Conversations from './Conversations.jsx';

const Menu = () => {
    const [text, setText] = useState('');
    
    return (
        <Box>
             <Header/>
            <Search setText={setText} />
            <Conversations text={text} />
        </Box>
    )
}

export default Menu;