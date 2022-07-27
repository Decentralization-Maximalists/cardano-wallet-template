import React from 'react';
import {ReusableProvider} from 'reusable';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { ClanIconBar } from "../../components/ClanIconBar/ClanIconBar";
import { MenuBar } from "../../components/MenuBar/MenuBar.jsx";


const App = () => {
  return (
    <ReusableProvider>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <MenuBar />        
        </header>
        <div className="App-content" >
          <div style={{marginTop: "50px"}}>
            <ClanIconBar />
          </div>
        </div>
      </div>
    </ReusableProvider>
  );
}

export default App;
