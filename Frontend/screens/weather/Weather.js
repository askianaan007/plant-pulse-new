import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchWeather = async () => {
        try {
          const { latitude, longitude } = location.coords;
          const apiKey = '490783e5e6dbcf9a238d0589dbc60a6c'; // Replace with your OpenWeatherMap API key
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
          setWeather(response.data);
        } catch (error) {
          setErrorMsg('Error fetching weather data');
        }
      };

      fetchWeather();
    }
  }, [location]);

  if (errorMsg) {
    return <Text style={styles.errorText}>{errorMsg}</Text>;
  }

  if (!location || !weather) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <ImageBackground
      source={require('../../assets/leaf back.jpg/')} // Replace with your own background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Current Weather</Text>
        <Text style={styles.location}>{weather.name}</Text>
        <Text style={styles.temperature}>{weather.main.temp}°C</Text>
        <Text style={styles.location}>Humididty: {weather.main.humidity}</Text>
        <Text style={styles.description}>{weather.weather[0].description}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Weather;
