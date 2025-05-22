import React from 'react';
import StockChart from './components/StockChart';
import Heatmap from './components/HeatMap';
import { Container, Tabs, Tab } from '@mui/material';

function App() {
  const [tab, setTab] = React.useState(0);

  return (
    <Container>
      <Tabs value={tab} onChange={(e, v) => setTab(v)} centered sx={{ mt: 4 }}>
        <Tab label="Stock Price Chart" />
        <Tab label="Correlation Heatmap" />
      </Tabs>

      {tab === 0 && <StockChart />}
      {tab === 1 && <Heatmap />}
    </Container>
  );
}

export default App;
