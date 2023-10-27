import './App.css';
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
import ComingSoon from './views/ComingSoon';

const App: React.FC = (): React.ReactElement => {
  return (
    <div className="App">
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
    </div>
  );
}


export default App;
