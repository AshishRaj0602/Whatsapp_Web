import { useState, useContext } from 'react';

// import { MoreVert } from '@mui/icons-material';
import { MoreVert } from '@mui/icons-material';
import { Menu, MenuItem, styled } from '@mui/material';

import { AccountContext } from '../../../context/AccountProvider';

//components
import InfoDrawer from '../../drawer/Drawer';

const MenuOption = styled(MenuItem)`
    font-size: 14px
    padding: 15px 60px 5px 24px;
    color: #4A4A4A;
`;

// const Logout = styled()`
//     border: none;
//     box-shadow: none;
// `;

const HeaderMenu = () => {
    
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    
    const {  showlogoutButton } = useContext(AccountContext);


    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    

    const toggleDrawer = () => {
        setOpenDrawer(true);
    }



    return (
        <>
            <MoreVert onClick={handleClick} />
            <Menu
                anchorEl={open}
                keepMounted
                open={open}
                onClose={handleClose}
                getcontentanchorel={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuOption onClick={() => { handleClose(); toggleDrawer()}}>Profile</MenuOption>
                <MenuOption onClick={() => { handleClose(); }}>
                { showlogoutButton ?
                <button>LogOut</button>
                    /*<Logout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={onSignoutSuccess}
                    >
                    </Logout>*/ : null
                }
                </MenuOption>
            </Menu>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
        </>
    )
}

export default HeaderMenu;