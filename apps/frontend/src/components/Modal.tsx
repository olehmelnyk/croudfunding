import { Divider,  } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useFormik } from 'formik';
import z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import Campaign, { ICampaign } from '../components/Campaign';
import DonationForm from './DonationForm';
import Snackbar from './Snackbar';

interface Props {
  campaign: ICampaign;
}

const validationSchema = z.object({
  amount: z
    .number()
    .refine((number) => number > 0, 'Insert a valid donation amount'),
  fiat_currency: z.string(),
  nickname: z
    .string()
    .regex(/^[a-z0-9_]*$/i, 'Insert a valid nickname: only A-Za-z0-9_ allowed'),
});

export default function BasicModal(props: Props) {
  const formik = useFormik({
    initialValues: {
      amount: '',
      fiat_currency: props.campaign.fiat_currency,
      nickname: '',
    },
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: async (values, { resetForm }) => {
      await fetch(
        `${process.env.NX_BASE_URL_BACKEND_API_BASE_URL}/donate/${props.campaign.id}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      resetForm();
      handleClose();

      // TODO: implement a success and error messages based on response from the server
      setShowSnackbar(true);

      // TODO: update amount of received donations (millions of donations can be received as the same time - should we refetch all campaigns periodically? what about caching?)
    },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  return (
    <Box style={{ width: '100%' }}>
      <Button onClick={handleOpen} fullWidth>
        Donate
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            borderRadius: '.5rem',
            boxShadow: 24,
            p: '1rem',
          }}
        >
          <Campaign campaign={props.campaign} />
          <Divider style={{ margin: '1rem 0' }} />
          <DonationForm formik={formik} />
        </Box>
      </Modal>
     <Snackbar showSnackbar={showSnackbar} severity='success' message='Donation received successfully' />
    </Box>
  );
}
