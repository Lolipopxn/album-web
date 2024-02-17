import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';

export default function Navbar() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const handleBack = () => {
        navigate('/');
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
            <HomeIcon sx={{ ml: 1 }} onClick={handleBack}/>
        </a> 
        
        </div>
    );
}
