import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon } from '@mui/material';
import { connectedWallet } from "../../hooks/connectedWalletHook";
import Alert from '@mui/material/Alert';
import * as CSLwasm from "@emurgo/cardano-serialization-lib-asmjs";
import { OgmiosWS, wsp } from "../../api/OgmiosApi"; 
let Buffer = require('buffer/').Buffer;

export const SelectWalletPopup = ( {} ) => {
  const [open, setOpen] = useState(false);
  const [ wallets, setWallets ] = useState([]);
  const [ connectedwallet, setConnectedWallet ] = connectedWallet();
  const [ status, setStatus ] = useState();
  
  const handleClickOpen = () => {
    setOpen(true);
    pollWallets();
  };

  const handleClose = () => {
    setStatus();
    setOpen(false);
  };

  const pollWallets = async (count = 0) => {
    const wallets = [];
    console.log(window.cardano)
    for(const key in window.cardano) {
      if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
        wallets.push(key);
      }
    }
    setWallets(wallets);
    console.log("wallets", wallets)

    if (wallets.length === 0 && count < 3) {
      setTimeout(() => {
        pollWallets(count + 1);
      }, 1000);
      return;
    }
  };

  const connectToWallet = async ( selectedWallet ) => {
    setStatus({type: "info", message: `connecting to ${selectedWallet}`});
    try {
      const walletApi = await window.cardano[selectedWallet].enable();
      console.log("api", walletApi);

      const getUsedAddressRes = await walletApi.getUsedAddresses();
      console.log("used addresses", getUsedAddressRes.length);

      if(getUsedAddressRes.length === 0) return setStatus({type: "warning", message: "Looks like you don't have any used addresses in this wallets account."})

      const walletApiVer = await window.cardano[selectedWallet].apiVersion;
      //console.log("wallet api ver", walletApiVer);
      const walletName = window.cardano[selectedWallet].name;
      //console.log("wallet name", walletName);
      const walletIcon = window.cardano[selectedWallet].icon;
      //console.log("wallet name", walletIcon);

      const address = CSLwasm.Address.from_bytes(Buffer.from(getUsedAddressRes[0], "hex")).to_bech32();
      //console.log("First used address" , address);

      // localStorage.setItem("changeAddress", changeAddress);

			const stake_cred = CSLwasm.BaseAddress?.from_address(CSLwasm.Address.from_bech32(address))?.stake_cred();
			// console.log("stake cred", stake_cred);
			const reward_addr_bytes = new Uint8Array(29);
			reward_addr_bytes.set([0xe1], 0);
			reward_addr_bytes.set(stake_cred.to_bytes().slice(4, 32), 1);
			const reward_addr = CSLwasm.RewardAddress.from_address(CSLwasm.Address.from_bytes(reward_addr_bytes)); 
			const stake_addr = reward_addr.to_address().to_bech32();
      const stakePKH = Buffer.from(reward_addr_bytes).toString("hex").slice(2)

      wsp("Query", { "query": { "delegationsAndRewards": [ stakePKH ] }});

      OgmiosWS.onmessage = ( e ) => {
        const results = JSON.parse(e.data);
        console.log("ogmiso raw result", results.result);

        const newConnectedWallet = {
          selectedWallet,
          walletName,
          walletIcon,
          walletApiVer,
          baseAddr: address,
          stakeAddr: stake_addr,
          delegatePool: results.result[stakePKH].delegate
        }
  
        console.log("connected wallet", newConnectedWallet);
        setConnectedWallet(JSON.stringify(newConnectedWallet));
        
        setStatus({type: "success", message: `Thank you for connecting your ${walletName} wallet. You are ready to Enter The Rondala.`})
      };

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {console.log("connected", connectedwallet)
      }
      { 
        connectedwallet === null ?
        <Button onClick={handleClickOpen} className="rainbow-box" style={{color: "#fff"}}>
          Connect Wallet
        </Button>
        :
        <Button onClick={handleClickOpen} className="rainbow-box" style={{color: "#fff"}}>
          <img src={JSON.parse(connectedwallet).walletIcon}  alt={JSON.parse(connectedwallet).walletIcon} height="25" />
          {JSON.parse(connectedwallet).baseAddr.slice(0, 8)}...
					{JSON.parse(connectedwallet).baseAddr.slice(-2)}

        </Button>
      }

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{color: "#fff"}}> 
          { connectedwallet === null ?  "Select a wallet?" : "Connected to Wallet: " + JSON.parse(connectedwallet).walletName + "<br/> Delegated to Pool" + JSON.parse(connectedwallet).delegatePool}

        </DialogTitle>
        <DialogContent>
          <span style={{color: "#fff"}}>Available Wallets:</span>
          {wallets.length > 0 ? 
            wallets.map( (wallet) => 
              <>
                { 
                  wallet === "nami" && 
                  <div style={{margin: 5}}>
                    <Button onClick={()=>connectToWallet("nami")} style={{ justifyContent: "flex-start", background: "linear-gradient(to right bottom, #e1f0f1, #349ea3)", minWidth: "400px", minHeight: "50px", borderRadius: "10px", color: "#000", fontWeight: "bold", fontSize: "18px", textTransform: 'none'}}><img src="assets/wallets-logos/nami.png" height="50px" alt="Nami Icon" />Nami</Button>
                  </div>
                }
                { 
                  wallet === "eternl" && 
                  <div style={{margin: 5}}>
                    <Button onClick={()=>connectToWallet("eternl")} style={{ justifyContent: "flex-start", background: "linear-gradient(to right bottom, #fe685b, #b156dd, #4af8d5)", minWidth: "400px", minHeight: "50px", borderRadius: "10px", color: "#000", fontWeight: "bold", fontSize: "18px", textTransform: 'none'}}><img src="assets/wallets-logos/eternl.png" height="50px" alt="eternl Icon" />Eternl</Button>
                  </div>
                }
                { 
                  wallet === "flint" && 
                  <div style={{margin: 5}}>
                    <Button onClick={()=>connectToWallet("nami")} style={{justifyContent: "flex-start", background: "linear-gradient(to right bottom, #f9d9bc, #ff7513)", minWidth: "400px", minHeight: "50px", borderRadius: "10px", color: "#000", fontWeight: "bold", fontSize: "18px", textTransform: 'none'}}><img src="assets/wallets-logos/flint.png" height="50px" alt="flint Icon" />Flint</Button>
                  </div>
                }
              </>
            ) :
            <>
              <div style={{margin: 5}}>
                You have no wallets installed or your browser doesnt support extensions.
              </div>
            </>
          }
          { status && <Alert severity={status.type}>Yo Sovereign, <br/>{status.message} </Alert> }
        </DialogContent>
        <DialogActions>
          { status && status.type==="success" && <Button onClick={()=>handleClose()}>Close</Button> }
        </DialogActions>
      </Dialog>
    </>
  );
}
