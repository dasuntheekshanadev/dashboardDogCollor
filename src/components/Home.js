import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-semibold mb-6 text-center">Welcome to Smart Dog Collar</h1>
      <p className="text-lg mb-8 text-center">Track your dog's location in real-time with our smart collar!</p>
      <div className="flex justify-center mb-8">
        <Link to="/map" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">Explore Map</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monitor Heart Rate</h2>
          <p className="text-lg mb-4">Keep track of your dog's heart rate with real-time updates.</p>
          <Link to="/" className="text-blue-500 hover:underline">Learn More</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Track Temperature & Humidity</h2>
          <p className="text-lg mb-4">Stay informed about your dog's environment with temperature and humidity data.</p>
          <Link to="/" className="text-blue-500 hover:underline">Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
