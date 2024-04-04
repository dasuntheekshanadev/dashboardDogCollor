import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { HeartIcon } from '@heroicons/react/solid';
import firebaseConfig from '../config/firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const HeartRateComponent = () => {
  const [heartRate, setHeartRate] = useState(null);

  useEffect(() => {
    const firebaseRef = firebase.database().ref('health/heart_rate');
    firebaseRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setHeartRate(data);
      }
    });

    return () => {
      firebaseRef.off(); // Unsubscribe from Firebase Realtime Database updates
    };
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Heart Rate</h1>
      <div className="max-w-xs mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <HeartIcon className="h-6 w-6 mr-2 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-800">Heart Rate</h2>
          </div>
          <div className="mt-3">
            {heartRate !== null ? (
              <p className="text-lg text-gray-600">Heart Rate: {heartRate} BPM</p>
            ) : (
              <p className="text-lg text-gray-600">Fetching heart rate data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartRateComponent;
