import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {
  
    const [userLocation, setUserLocation] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    });
    
    useEffect(() => {
        (async () => {
            await getUserPosition();
        })();
    }, []);
   
    const getUserPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        try {
            if (status !== 'granted') {
                console.log('Geolocation failed');
                return;
            }

            const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            setUserLocation({
                ...userLocation,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        
            <MapView
                style={styles.map}
                region={userLocation}
            />
        
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});
