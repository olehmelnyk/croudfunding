import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import BasicModal from '../components/Modal';

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

export function App() {
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const getActiveCampaigns = async () => {
      // TODO: get baseUrl from .env file
      // TODO: move this effect into a custom hook file
      const response = await fetch('http://localhost:3333/api/campaigns');
      const campaigns = await response.json();

      setActiveCampaigns(campaigns);
    };
    getActiveCampaigns();
  }, []);

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        {activeCampaigns.map((campaign) => {
          return (
            <Card>
              <CardContent>
                <Typography variant="h4">{campaign.name}</Typography>
                <Typography variant="body1">{campaign.description}</Typography>
                <Divider style={{ margin: '1rem 0' }} />
                <Box
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography>
                    <span role="img" aria-label="goal">
                      🎯
                    </span>
                    <b> Goal: </b>
                    {campaign.goal} {campaign.fiat_currency}
                  </Typography>
                  <Typography>
                    <span role="img" aria-label="raised">
                      💪
                    </span>
                    <b> Rised: </b>
                    {campaign.amount} {campaign.fiat_currency}
                  </Typography>
                  <Typography>
                    <span role="img" aria-label="status">
                      🟢
                    </span>
                    <b> Status: </b>
                    {campaign.status}
                  </Typography>
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Typography>
                    <span role="img" aria-label="expiration">
                      📅
                    </span>
                    <b> Expiration date: </b>
                    {new Date(campaign.expiration_date).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <BasicModal campaign={campaign} />
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
}

export default App;
