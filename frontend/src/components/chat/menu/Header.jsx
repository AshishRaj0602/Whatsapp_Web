import { useContext, useState } from 'react';

import { Box, styled } from '@mui/material';
import { Chat as MessageIcon } from '@mui/icons-material';

// import { AccountContext } from '../../../context/AccountProvider';

//components
import HeaderMenu from './HeaderMenu.jsx';
import InfoDrawer from '../../drawer/Drawer';
import { useSelector } from 'react-redux';
import { defaultProfilePicture } from '../../../constants/data.js';

const Component = styled(Box)`
    height: 44px;
    background: #ededed;
    display: flex;
    padding: 8px 16px;
    align-items: center;
`;

const Wrapper = styled(Box) `
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
        font-size: 41px;
        cursor: pointer;
    };
    & :first-of-type {
        margin-right: 8px;
        margin-top: 3px;
    }
`;
    
const Image = styled('img') ({
    height: 40,
    width: 40,
    borderRadius: '50%'
})

const Header = () => {
    
    const  account  = useSelector((state)=> state?.user?.user);
    const [openDrawer, setOpenDrawer] = useState(false);
    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    return (
        <>
            <Component>
                <Image src={account?.picture ? `${account?.picture}`:defaultProfilePicture} onClick={() => toggleDrawer()} />
                <Wrapper>
                    <MessageIcon />
                    <HeaderMenu/>
                </Wrapper>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
        </>
    )
}

export default Header;