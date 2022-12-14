import { Stack, Card, CardContent, CardActions } from '@mui/material';
import { useEffect, useState } from 'react';
import Campaign, { ICampaign } from './Campaign';
import BasicModal from './Modal';

export const CampaignList = () => {
  const [activeCampaigns, setActiveCampaigns] = useState<ICampaign[]>([]);

  useEffect(() => {
    const getActiveCampaigns = async () => {
      // TODO: move this effect into a custom hook file
      // TODO: load more campaigns on scroll
      const response = await fetch(
        `${process.env.NX_BASE_URL_BACKEND_API_BASE_URL}/campaigns`
      );
      const campaigns = await response.json();

      setActiveCampaigns(campaigns);
    };
    getActiveCampaigns();
  }, []);

  return (
    <Stack spacing={3}>
      {activeCampaigns.map((campaign) => {
        return (
          <Card key={campaign.id}>
            <CardContent>
              <Campaign campaign={campaign} />
            </CardContent>
            <CardActions>
              <BasicModal campaign={campaign} />
            </CardActions>
          </Card>
        );
      })}
    </Stack>
  );
};

export default CampaignList;
