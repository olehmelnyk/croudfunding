import { Container } from '@mui/material';
import CampaignList from '../components/CampaignList';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

export function App() {
  return (
    <Container maxWidth="md">
      <CampaignList />
    </Container>
  );
}

export default App;
