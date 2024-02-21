import React, { useState } from 'react';
import '../StyleCSS/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ImageIcon from '@mui/icons-material/Image';

export default function Navbar() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true);

    const handleHome = () => {
        navigate('/');
        window.location.reload();
      };

    const handleUserPrivate = () => {
        navigate('/ViewGallery');
        window.location.reload();
    };

    const handleAdd = () => {
        navigate('/Add');
        window.location.reload();
    };

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`Navbar-left ${collapsed ? 'collapsed' : ''}`}>
          {collapsed ? 
          <IconButton onClick={toggleSidebar} sx={{ ml: 1 }}>
            <ArrowForwardIosIcon /> 
            <ArrowForwardIosIcon />
          </IconButton>
          
          
          : <IconButton onClick={toggleSidebar} sx={{ ml: 22 }}>
                <ArrowBackIosNewIcon />
                <ArrowBackIosNewIcon />
            </IconButton>
          }
        <a className='active'>
            <HomeIcon sx={{ ml: 1 }} onClick={handleHome}/> 
        </a> 
        <a className='active'>
            <AddIcon sx={{ ml: 1 }} onClick={handleAdd}/>
        </a> 
        <a className='active'>
            <ImageIcon sx={{ ml: 1 }} onClick={handleUserPrivate}/>
        </a> 
        
        </div>
    );
}
