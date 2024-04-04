// App.js
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MapComponent from './components/MapComponent';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import HeartRateComponent from './components/HeartRateComponent';
import TemperatureHumidityComponent from './components/TemperatureHumidityComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/map' element={<MapComponent />} />
        </Routes>
        <div className="container mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <HeartRateComponent />
            <TemperatureHumidityComponent />
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
