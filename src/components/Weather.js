import axios from 'axios';
import { useEffect, useState } from 'react';


const Weather = () => {

    const [weather, setWheather] = useState({});

    const [changeTemp, setChangeTemp] = useState(true);

      useEffect(()=>{

        function success(pos) {
          var crd = pos.coords;

          console.log('Your current position is:');
          console.log(`Latitude : ${crd.latitude}`);
          console.log(`Longitude: ${crd.longitude}`);
          console.log(`More or less ${crd.accuracy} meters.`);
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=d200a8eb35acdb0332db3335d5175b2f&units=imperial`)
            .then(res => setWheather(res.data));
        }

        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error);

    }, []);

    console.log(weather);


    return (
        <div className='container'>
            <h1>Weather App</h1>
            <h3>{weather.name}, {weather.sys?.country}</h3>
            <div className='weather'>
            <div className='infoTemp'>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <h3>{
              changeTemp ? `${Math.ceil(weather.main?.temp)} ºF`:
              `${Math.ceil((weather.main?.temp -32) * 5/9)} ºC` }
            </h3>
            </div>
            <div className='info'>
            <p><b>Condition: </b>{weather.weather?.[0].description}</p>
            <p><b>Wind speed:</b> {weather.wind?.speed} m/s</p>
            <p><b>Clouds:</b> {weather.clouds?.all}%</p>
            <p><b>Pressure:</b> {weather.main?.pressure} mb</p>
            </div>
            </div>
            
            <button onClick={() => setChangeTemp(!changeTemp)}>Degrees ºF / ºC</button>
            

        </div>
    );
};

export default Weather;
