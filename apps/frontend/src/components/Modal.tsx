import { Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useFormik } from 'formik';
import z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

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

interface Campaign {
  id: string;
  name: string;
  description: string;
  goal: number;
  amount: number;
  status: string;
  expiration_date: string;
  fiat_currency: string;
}

interface Props {
  campaign: Campaign;
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
      await fetch(`http://localhost:3333/api/donate/${props.campaign.id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      resetForm();
      handleClose();
    },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
              <TextField
                label="Currency"
                name="fiat_currency"
                disabled
                value={formik.values.fiat_currency}
                onChange={formik.handleChange}
                error={
                  formik.touched.fiat_currency &&
                  Boolean(formik.errors.fiat_currency)
                }
                helperText={
                  formik.touched.fiat_currency && formik.errors.fiat_currency
                }
              />
              <TextField
                label="Nickname"
                name="nickname"
                value={formik.values.nickname}
                onChange={formik.handleChange}
                error={
                  formik.touched.nickname && Boolean(formik.errors.nickname)
                }
                helperText={formik.touched.nickname && formik.errors.nickname}
              />
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
