import React, { useState, useEffect } from 'react';
import { connectedWallet } from "../../hooks/connectedWalletHook";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { SelectWalletPopup } from "../WebWallet/SelectWalletPopup";

export const MenuBar = () => {

  const [ connectedwallet, setConnectedWallet ] = connectedWallet();
  
  const checkWalletStatus = async () => {
    
    console.log("Connected Wallet", JSON.parse(connectedwallet));
  };

  useEffect(()=>{
    checkWalletStatus();
  },[])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar style={{background: "#000000", color: "#ffffff"}}>
          <Typography className="h3" style={{textAlign: "left", fontfamily: 'Aldrich'}} component="div" sx={{ flexGrow: 1 }} >
            Cardano Wallet Template: 
          </Typography>
          <SelectWalletPopup />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
