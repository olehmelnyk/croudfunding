import { Stack, Typography, TextField, Button } from '@mui/material';

interface IProps {
  formik: any;
}

export const DonationForm = (props: IProps) => {
  const { formik } = props;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h6">Make a donation:</Typography>
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
          size="small"
        />
        <TextField
          label="Currency"
          name="fiat_currency"
          disabled
          value={formik.values.fiat_currency}
          onChange={formik.handleChange}
          error={
            formik.touched.fiat_currency && Boolean(formik.errors.fiat_currency)
          }
          helperText={
            formik.touched.fiat_currency && formik.errors.fiat_currency
          }
          size="small"
        />
        <TextField
          label="Nickname"
          name="nickname"
          value={formik.values.nickname}
          onChange={formik.handleChange}
          error={formik.touched.nickname && Boolean(formik.errors.nickname)}
          helperText={formik.touched.nickname && formik.errors.nickname}
          size="small"
        />
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default DonationForm;
