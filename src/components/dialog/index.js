import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PropTypes from 'prop-types';

export default function BasicDialog(props) {
    console.log('Dialog')

  return (
      <Dialog
        open={ props.open }
        onClose={ props.onClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
              {props.title}
          </DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  {props.content}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <button onClick={ props.onClose } >Disagree</button>
              <button onClick={ props.handleDialog } 
            >
                  Agree
              </button>
          </DialogActions>
      </Dialog>
  );
}

BasicDialog.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
	open: PropTypes.bool,
	onClose: PropTypes.func,
    handleDialog: PropTypes.func
}