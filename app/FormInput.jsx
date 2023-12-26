"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import ReturnData from "./ReturnData";

// `http://api.weatherapi.com/v1/current.json?key=394b82980ba841a697b122237232508&q=${weather}&aqi=no`

const FormInput = () => {
  const { register, handleSubmit, reset } = useForm();
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const city = data.city;
    const weather = `http://api.weatherapi.com/v1/current.json?key=394b82980ba841a697b122237232508&q=${city}&aqi=no`;
    await axios
      .get(weather)
      .then((response) => {
        const weatherData = response.data;
        const weatherInfo = {
          city: weatherData?.location.name,
          region: weatherData?.location.region,
          temp: weatherData?.current.temp_c,
          humidity: weatherData?.current.humidity,
          condition: weatherData?.current.condition.text,
          icon: weatherData?.current.condition.icon,
          windspeed: weatherData?.current.wind_kph,
          country: weatherData?.location.country,
        };

        setWeather(weatherInfo);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("City not found");
        setLoading(false);
      });
  };

  return (
    <main className="h-screen bg-slate-100 p-8  ">
      <div className="text-center">
        <h1 className="text-4xl font-bold p-4">Weather App</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("city")}
            className="bg-slate-200 p-2 rounded-md m-4 border-2 border-slate-300"
            type="text"
            placeholder="Enter a city"
          />
          <button
            className="bg-blue-600 p-2 text-white rounded-md hover:scale-105 "
            type="submit">
            Search
          </button>
        </form>
      </div>
      {loading ? (
        <div className="flex items-center justify-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <ReturnData
          city={weather?.city}
          country={weather?.country}
          temp={weather?.temp}
          condition={weather?.condition}
          icon={weather?.icon}
          humidity={weather?.humidity}
          windspeed={weather?.windspeed}
          region={weather?.region}
        />
      )}
    </main>
  );
};

export default FormInput;
