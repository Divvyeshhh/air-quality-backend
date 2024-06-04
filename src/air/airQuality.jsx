import React, {useState} from 'react';
import './airQuality.css'
import axios from 'axios';
import {TextField, Button, Box, Autocomplete, Typography} from '@mui/material';
import cities from '../assets/cities.json'

export default function AirQuality() {
    const API_URL = "http://localhost:6969/api/air-quality";
    const [city, setCity] = useState(null);
    const [airQuality, setAirQuality] = useState(null);
    
    const handleInputChange = (event, newValue) => {
        setCity(newValue);
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.get(`${API_URL}/${city}`);
        setAirQuality(response.data);
    } catch(err){
        console.log(err.message)
    }
    }

    const getAQIPosition = (aqi) => {
        const maxAQI = 500; // The upper bound of the AQI scale
        const percentage = Math.min((aqi / maxAQI) * 100, 100); // Calculate the percentage of the AQI value
        return `${percentage}%`;
      };
      
  return (
    <>
        <form onSubmit={handleSubmit}>
            <Autocomplete
            className='searchBar'
            options={cities.map(city => city.name)}
            value={city}
            onChange={handleInputChange}
            renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
            required
            />

            <Button type="submit" aria-label="search" size="small">
                Search
            </Button>

            {airQuality && (
            <Box mt={2}>
                    {city}:  
                    <br/>  
                    Air Quality Index (AQI): {airQuality.data.aqi}
                    <br/>
                    Carbon Monoxide (CO): {airQuality.data.iaqi.co.v}
                    <br/>
                    Nitrogen Dioxide (NO2): {airQuality.data.iaqi.no2.v}
                    <br/>
                    Ozone (O3): {airQuality.data.iaqi.o3.v}
                    <br/>
                    PM10: {airQuality.data.iaqi.pm10.v}
                    <br/>
                    PM25: {airQuality.data.iaqi.pm25.v}
                    <br/>
                    Sulfur dioxide (SO2): {airQuality.data.iaqi.so2.v}
            </Box>
            )}

            <Box className="aqi-bar-container">
                <Box 
                    className="aqi-indicator"
                    style={{ left: airQuality && getAQIPosition(airQuality.data.aqi) }}
                />
            </Box>
        </form>
    </>
  )
}


