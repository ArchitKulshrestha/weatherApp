import React from "react";

const ReturnData = ({
  city,
  country,
  temp,
  condition,
  icon,
  region,
  humidity,
  windspeed,
}) => {
  return (
    <>
      {icon && (
        <div className="flex flex-col justify-center w-full">
          <div className=" text-white mx-auto bg-slate-800 p-10 w-[400px] rounded-md text-xl">
            <h1>City: {city}</h1>
            <h1>Region: {region}</h1>
            <h1> Country: {country}</h1>
            <h1>Temperature: {temp} °C</h1>

            <h1>Humidity: {humidity} %</h1>
            <h1>Wind Speed: {windspeed} km/h</h1>

            <h4>Conditions: {condition}</h4>
            {icon && <img src={icon} alt="icon" height={100} width={100} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ReturnData;
