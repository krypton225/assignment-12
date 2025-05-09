"use strict";

import Day from "./dates.js";

import UserLocation from "./get-location.js";

const API = (function () {
  const API_KEY = `dac349102de447159df185542250705`;

  const OLD_BASE_URL = `https://api.weatherapi.com/v1/history.json`;
  const CURRENT_BASE_URL = `http://api.weatherapi.com/v1/current.json`;
  const FUTURE_BASE_URL = `https://api.weatherapi.com/v1/forecast.json`;

  const location = document.getElementById("location");

  location.addEventListener("input", locationInputHandler);

  /**
   * Handles the input event for the location input field.
   *
   * Whenever the length of the input value is more than 3, it will
   * call the following functions to get the weather data for today,
   * yesterday, and tomorrow of the given city name.
   *
   * @function locationInputHandler
   * @param {Event} event - The event that triggered this function.
   * @returns {void}
   */
  function locationInputHandler(event) {
    const { value } = event.target;

    if (value.length > 3) {
      getTodayWeatherOf(value);
      getYesterdayWeatherOf(value);
      getTomorrowWeatherOf(value);
    }
  }

  /**
   * Gets the weather data for today of the given city name.
   *
   * If the city name is not valid, it will throw an error.
   *
   * It will first try to fetch the data from the API by sending a GET request.
   * If the response status is not 200, it will throw an error.
   *
   * If the response status is 200, it will try to parse the response as JSON.
   * If the parsing fails, it will throw an error.
   *
   * If the parsing succeeds, it will call the setValuesOfTodayInDOM function
   * to set the values of the today section in the DOM.
   *
   * @function getTodayWeatherOf
   * @param {string} cityName - The name of the city to get the weather data for.
   * @returns {Promise<void>}
   */
  async function getTodayWeatherOf(cityName) {
    if (cityName === undefined || cityName === ``) {
      throw new Error("You must enter the city name!");
    }

    try {
      const response = await fetch(`${CURRENT_BASE_URL}?key=${API_KEY}&q=${cityName}&days=1`);
      const data = await response.json();

      hideSkeletons();

      setValuesOfTodayInDOM(data);
    } catch (error) {
      console.log("There is an error to get the today weather data!");
    }
  }

  /**
   * Gets the weather data for yesterday of the given city name.
   *
   * If the city name is not valid, it will throw an error.
   *
   * It will first try to fetch the data from the API by sending a GET request
   * with the date of yesterday.
   * If the response status is not 200, it will throw an error.
   *
   * If the response status is 200, it will try to parse the response as JSON.
   * If the parsing fails, it will throw an error.
   *
   * If the parsing succeeds, it will call the setValuesOfYesterdayInDOM function
   * to set the values of the yesterday section in the DOM.
   *
   * @function getYesterdayWeatherOf
   * @param {string} cityName - The name of the city to get the weather data for.
   * @returns {Promise<void>}
   */
  async function getYesterdayWeatherOf(cityName) {
    const yesterdayDate = Day.getYesterdayDateFormatted();

    try {
      const response = await fetch(`${OLD_BASE_URL}?key=${API_KEY}&q=${cityName}&dt=${yesterdayDate}`);
      const data = await response.json();

      setValuesOfYesterdayInDOM(data);
    } catch (error) {
      console.log("There is an error to get the yesterday weather data!");
    }
  }

  /**
   * Gets the weather data for tomorrow of the given city name.
   *
   * If the city name is not valid, it will throw an error.
   *
   * It will first try to fetch the data from the API by sending a GET request
   * with the date of tomorrow.
   * If the response status is not 200, it will throw an error.
   *
   * If the response status is 200, it will try to parse the response as JSON.
   * If the parsing fails, it will throw an error.
   *
   * If the parsing succeeds, it will call the setValuesOfTomorrowInDOM function
   * to set the values of the tomorrow section in the DOM.
   *
   * @function getTomorrowWeatherOf
   * @param {string} cityName - The name of the city to get the weather data for.
   * @returns {Promise<void>}
   */
  async function getTomorrowWeatherOf(cityName) {
    const tomorrowDate = Day.getTomorrowDateFormatted();

    try {
      const response = await fetch(`${FUTURE_BASE_URL}?key=${API_KEY}&q=${cityName}&dt=${tomorrowDate}`);
      const data = await response.json();

      setValuesOfTomorrowInDOM(data);
    } catch (error) {
      console.log("There is an error to get the tomorrow weather data!");
    }
  }

  /**
   * Hides and removes the skeleton loading animations for yesterday,
   * today, and tomorrow weather cards in the DOM.
   *
   * This function selects the skeleton elements by their IDs and adds
   * the "hide" class to them. It then removes these elements from the DOM.
   * This is typically used after the weather data is successfully fetched
   * and displayed, to enhance the user interface.
   */
  function hideSkeletons() {
    const skeletonYesterday = document.getElementById("skeleton-yesterday");
    const skeletonToday = document.getElementById("skeleton-today");
    const skeletonTomorrow = document.getElementById("skeleton-tomorrow");

    if (skeletonYesterday && skeletonToday && skeletonTomorrow) {
      skeletonYesterday.classList.add("hide");
      skeletonToday.classList.add("hide");
      skeletonTomorrow.classList.add("hide");

      skeletonYesterday.remove();
      skeletonToday.remove();
      skeletonTomorrow.remove();
    }
  }

  /**
   * Sets the values of the yesterday section in the DOM given the response object from the API.
   *
   * @function setValuesOfYesterdayInDOM
   * @param {Object} responseObject - The object returned from the API containing the weather data for yesterday.
   * @returns {void}
   */
  function setValuesOfYesterdayInDOM(responseObject) {
    const { forecast, location } = responseObject;

    const { day, date, hour } = forecast.forecastday[0];
    const { condition } = day;
    const { temp_c, vis_km, wind_degree, wind_dir } = hour[0];

    const yesterdayDayName = document.getElementById("yesterday-day-name");
    const yesterdayDegree = document.getElementById("yesterday-degree");
    const yesterdayIcon = document.getElementById("yesterday-icon");
    const yesterdayStatus = document.getElementById("yesterday-status");
    const yesterdayWindKm = document.getElementById("yesterday-wind-km");
    const yesterdayWindPercentage = document.getElementById("yesterday-wind-percentage");
    const yesterdayDirection = document.getElementById("yesterday-wind-direction");

    yesterdayDayName.textContent = Day.getDayNameFromDate(date);

    yesterdayDegree.textContent = `${temp_c}`;
    yesterdayIcon.src = condition.icon;

    yesterdayStatus.textContent = condition.text;
    yesterdayWindKm.textContent = `${vis_km}km/h`;

    yesterdayWindPercentage.textContent = `${wind_degree}%`;
    yesterdayDirection.textContent = wind_dir;
  }

  /**
   * Sets the values of the today section in the DOM given the response object from the API.
   *
   * @function setValuesOfTodayInDOM
   * @param {Object} responseObject - The object returned from the API containing the weather data for today.
   * @returns {void}
   */
  function setValuesOfTodayInDOM(responseObject) {
    const { current, location } = responseObject;

    const { condition, temp_c, vis_km, wind_degree, wind_dir } = current;
    const { name, localtime } = location;

    const todayDayName = document.getElementById("today-day-name");
    const todayDayNumber = document.getElementById("today-day-number");
    const city = document.getElementById("city");
    const todayDegree = document.getElementById("today-degree");
    const todayIcon = document.getElementById("today-icon");
    const todayStatus = document.getElementById("today-status");
    const todayWindKm = document.getElementById("today-wind-km");
    const todayWindPercentage = document.getElementById("today-wind-percentage");
    const todayDirection = document.getElementById("today-direction");

    const splittedLastUpdate = localtime.split(" ")[0];

    todayDayName.textContent = Day.getDayNameFromDate(splittedLastUpdate, 0);
    todayDayNumber.textContent = Day.getTodayDate();

    city.textContent = name;

    todayDegree.textContent = `${temp_c}`;
    todayIcon.src = condition.icon;

    todayStatus.textContent = condition.text;
    todayWindKm.textContent = `${vis_km}km/h`;

    todayWindPercentage.textContent = `${wind_degree}%`;
    todayDirection.textContent = wind_dir;
  }

  /**
   * Sets the values of the tomorrow section in the DOM given the response object from the API.
   *
   * @function setValuesOfTomorrowInDOM
   * @param {Object} responseObject - The object returned from the API containing the weather data for tomorrow.
   * @returns {void}
   */
  function setValuesOfTomorrowInDOM(responseObject) {
    const { current, location } = responseObject;

    const { condition, last_updated, temp_c, vis_km, wind_degree, wind_dir } = current;

    const { localtime } = location;

    const tomorrowDayName = document.getElementById("tomorrow-day-name");
    const tomorrowDegree = document.getElementById("tomorrow-degree");
    const tomorrowIcon = document.getElementById("tomorrow-icon");
    const tomorrowStatus = document.getElementById("tomorrow-status");
    const tomorrowWindKm = document.getElementById("tomorrow-wind-km");
    const tomorrowWindPercentage = document.getElementById("tomorrow-wind-percentage");
    const tomorrowDirection = document.getElementById("tomorrow-wind-direction");

    const splittedLastUpdate = localtime.split(" ")[0];

    tomorrowDayName.textContent = Day.getDayNameFromDate(splittedLastUpdate, 1);

    tomorrowDegree.textContent = `${temp_c}`;
    tomorrowIcon.src = condition.icon;

    tomorrowStatus.textContent = condition.text;
    tomorrowWindKm.textContent = `${vis_km}km/h`;

    tomorrowWindPercentage.textContent = `${wind_degree}%`;
    tomorrowDirection.textContent = wind_dir;
  }

  /**
   * Initializes the API by fetching the weather data for the user's location.
   *
   * @function init
   * @returns {Promise<void>}
   */
  async function init() {
    const { latitude, longitude } = await UserLocation.get();

    getTodayWeatherOf(`${latitude},${longitude}`);
    getYesterdayWeatherOf(`${latitude},${longitude}`);
    getTomorrowWeatherOf(`${latitude},${longitude}`);
  }

  return {
    init,
  };
})();

export default API;
