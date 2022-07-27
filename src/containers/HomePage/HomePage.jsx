import React, {useEffect } from 'react';
import {ReusableProvider} from 'reusable';
import CssBaseline from '@mui/material/CssBaseline';
import './HomePage.css';
import { MenuBar } from "../../components/MenuBar/MenuBar.jsx";


const HomePage = () => {
  return (
    <ReusableProvider>
      <div>
      <CssBaseline />
        <div>
          <MenuBar />        
        </div>
      </div>
    </ReusableProvider>
  );
}

export default HomePage;
