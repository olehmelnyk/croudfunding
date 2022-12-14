import { Box, Typography, Divider } from '@mui/material';

export interface ICampaign {
  id: string;
  name: string;
  description: string;
  goal: number;
  amount: number;
  status: string;
  expiration_date: string;
  fiat_currency: string;
}

export interface IProps {
  campaign: ICampaign;
}

export const Campaign = (props: IProps) => {
  return (
    <Box>
      <Typography variant="h4">{props.campaign.name}</Typography>
      <Typography variant="body1">{props.campaign.description}</Typography>
      <Divider style={{ margin: '1rem 0' }} />
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          <span role="img" aria-label="goal">
            🎯
          </span>
          <b> Goal: </b>
          {props.campaign.goal} {props.campaign.fiat_currency}
        </Typography>
        <Typography>
          <span role="img" aria-label="raised">
            💪
          </span>
          <b> Rised: </b>
          {props.campaign.amount} {props.campaign.fiat_currency}
        </Typography>
        <Typography>
          <span role="img" aria-label="status">
            🟢
          </span>
          <b> Status: </b>
          {props.campaign.status}
        </Typography>
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography>
          <span role="img" aria-label="expiration">
            📅
          </span>
          <b> Expiration date: </b>
          {new Date(props.campaign.expiration_date).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Campaign;
