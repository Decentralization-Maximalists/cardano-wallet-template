import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export const SelectWalletPopup = ( {} ) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} className="rainbow-box" style={{color: "#fff"}}>
        Temaplte
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{color: "#fff"}}> 
            Dialog Template
        </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
            <Button onClick={()=>handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
