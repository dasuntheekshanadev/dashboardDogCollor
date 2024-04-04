import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { SunIcon, WaterIcon } from '@heroicons/react/solid'; // Assuming you have SunIcon and WaterIcon components
import firebaseConfig from '../config/firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const TemperatureHumidityComponent = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const firebaseRefTemp = firebase.database().ref('environment/temperature');
      const firebaseRefHumidity = firebase.database().ref('environment/humidity');

      firebaseRefTemp.on('value', (snapshot) => {
        const tempData = snapshot.val();
        if (tempData !== null) {
          setTemperature(tempData);
        }
      });

      firebaseRefHumidity.on('value', (snapshot) => {
        const humidityData = snapshot.val();
        if (humidityData !== null) {
          setHumidity(humidityData);
        }
      });

      return () => {
        firebaseRefTemp.off(); // Unsubscribe from temperature updates
        firebaseRefHumidity.off(); // Unsubscribe from humidity updates
      };
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Environment Data</h1>
      <div className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-3">
            <SunIcon className="h-6 w-6 mr-2 text-yellow-500" /> {/* Adjust icon size and color */}
            <h2 className="text-lg font-semibold text-gray-800">Temperature</h2>
          </div>
          <div className="mb-3">
            {temperature !== null ? (
              <p className="text-lg text-gray-600">Temperature: {temperature} °C</p>
            ) : (
              <p className="text-lg text-gray-600">Fetching temperature data...</p>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-800">Humidity</h2>
          </div>
          <div>
            {humidity !== null ? (
              <p className="text-lg text-gray-600">Humidity: {humidity} %</p>
            ) : (
              <p className="text-lg text-gray-600">Fetching humidity data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureHumidityComponent;
