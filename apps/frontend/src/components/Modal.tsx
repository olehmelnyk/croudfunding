import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ReactComponentElement, ReactElement, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '.5rem',
  boxShadow: 24,
  p: '1rem',
};

interface Props {
  buttonText: string;
  modalContent: ReactElement;
}

export default function BasicModal(props: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box style={{ width: '100%' }}>
      <Button onClick={handleOpen} fullWidth>
        {props.buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{props.modalContent}</Box>
      </Modal>
    </Box>
  );
}
