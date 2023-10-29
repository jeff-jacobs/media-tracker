import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Music from './views/Music';
import Artists from './views/Music/Artists/Artists';
import Artist from './views/Music/Artists/Artist';
import Albums from './views/Music/Albums/Albums';
import Shows from './views/Music/Shows/Shows';
import ShowDetail from './views/Music/Shows/Show';
import Venues from './views/Music/Venues';
import VenueDetail from './views/Music/Venue';
import SetlistFM from './views/Music/SetlistFM';
import ComingSoon from './views/ComingSoon';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = (): React.ReactElement => {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Header/>
        <div className="container">
          <Routes>
            <Route path="/music" element={<Music/>}>
              <Route path="/music/artists" element={<Artists/>}></Route>
              <Route path="/music/artists/:id" element={<Artist/>}></Route>
              <Route path="/music/albums" element={<Albums/>}></Route>
              <Route path="/music/shows" element={<Shows/>}></Route>
              <Route path="/music/shows/:id" element={<ShowDetail/>}></Route>
              <Route path="/music/venues" element={<Venues/>}></Route>
              <Route path="/music/venues/:id" element={<VenueDetail/>}></Route>
              <Route path="/music/setlistfm" element={<SetlistFM/>}></Route>
            </Route>
            <Route path="/movies" element={<ComingSoon/>}></Route>
            <Route path="/games" element={<ComingSoon/>}></Route>
            <Route path="/books" element={<ComingSoon/>}></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </div>
  );
}


export default App;
