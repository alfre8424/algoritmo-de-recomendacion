import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

interface IAppDialogProps {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  actionButtons?: React.ReactNode[];
  useCloseButton?: boolean;
  onClose: () => void;
}

function AppSimpleDialog({
  isOpen,
  title,
  content,
  actionButtons,
  useCloseButton = true,
  onClose
}: IAppDialogProps) {

  return <Dialog
    fullScreen={false}
    maxWidth="lg"
    open={isOpen}
  >
    {
      title &&
      <div className="flex flex-row justify-between">
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <button
          className='mr-[1rem]'
          onClick={onClose}
        >
          X
        </button>
      </div>
    }
    <DialogContent
      sx={{ padding: '0px' }}
    >
      {content}
    </DialogContent>
    {
      useCloseButton &&
      <DialogActions>
        {
          actionButtons ? actionButtons.map((actionButton, index) => {
            return <React.Fragment key={index}>
              {actionButton}
            </React.Fragment>
          }) :
            <Button autoFocus onClick={onClose}>
              Aceptar
            </Button>
        }
      </DialogActions>
    }
  </Dialog >
}

export default AppSimpleDialog;
