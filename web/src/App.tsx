import './App.css';
import { styled } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Music from './views/Music';
import Artists from './views/Music/Artists';
import Artist from './views/Music/Artist';
import Albums from './views/Music/Albums';
import Shows from './views/Music/Shows';
import ShowDetail from './views/Music/Show';
import Venues from './views/Music/Venues';
import VenueDetail from './views/Music/Venue';
import SetlistFM from './views/Music/SetlistFM';

const App: React.FC = (): React.ReactElement => {
  return (
    <div className="App">
      <Header/>
      <ContentWrapper>
        <ContentCard>
          <Routes>
            <Route path="/music" element={<Music></Music>}>
              <Route path="/music/artists" element={<Artists></Artists>}></Route>
              <Route path="/music/artists/:id" element={<Artist></Artist>}></Route>
              <Route path="/music/albums" element={<Albums></Albums>}></Route>
              <Route path="/music/shows" element={<Shows></Shows>}></Route>
              <Route path="/music/shows/:id" element={<ShowDetail></ShowDetail>}></Route>
              <Route path="/music/venues" element={<Venues></Venues>}></Route>
              <Route path="/music/venues/:id" element={<VenueDetail></VenueDetail>}></Route>
              <Route path="/music/setlistfm" element={<SetlistFM></SetlistFM>}></Route>
            </Route>
          </Routes>
        </ContentCard>
      </ContentWrapper>
    </div>
  );
}

const ContentWrapper = styled('div')({
  padding: '20px',
})

const ContentCard = styled('div')({
  margin: '0 auto',
  background: 'white',
  padding: '40px',
  maxWidth: '1100px',
  borderRadius: '5px',
  boxShadow: '4px 4px 4px rgba(0,0,0,0.05)',
})

export default App;
