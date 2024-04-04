import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../config/firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const MapComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const API_KEY = "AIzaSyBe7NguNKV2rc0xkBxLhEXYE5o0ATiZg9Q";

  useEffect(() => {
    const fetchData = () => {
      const firebaseRef = firebase.database().ref('gps');
      firebaseRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data && data.latitude && data.longitude) {
          setLatitude(data.latitude);
          setLongitude(data.longitude);
        }
      });
    };

    fetchData();

    return () => {
      const firebaseRef = firebase.database().ref('gps');
      firebaseRef.off(); // Unsubscribe from Firebase Realtime Database updates
    };
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => {
        window.initMap();
      });
      document.body.appendChild(script);
    }
  }, [latitude, longitude]);

  window.initMap = () => {
    const mapOptions = {
      zoom: 16,
      center: { lat: latitude, lng: longitude },
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    };
    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
    const marker = new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
    });
  };
  
  return (
    <div>
      <h1>Dog Location</h1>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default MapComponent;
