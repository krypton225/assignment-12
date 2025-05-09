const Day = (function () {
  /**
   * Returns the name of the current day of the week in English as a string.
   * @returns {string} The name of the current day of the week in English.
   * @example
   * getTodayDayName(); // returns "Monday" if today is Monday
   */
  function getTodayDayName() {
    const date = new Date();
    return new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);
  }

  /**
   * Returns the current date in the format "day month" as a string.
   * @returns {string} The current date in the format "day month".
   * @example
   * getTodayDate(); // returns "1 january" if today is the 1st of January
   */
  function getTodayDate() {
    const date = new Date();
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en', { month: 'long' })
      .format(date)
      .toLowerCase();

    return `${day} ${month}`;
  }

  /**
   * Returns the name of the previous day of the week in English as a string.
   * @returns {string} The name of the previous day of the week in English.
   * @example
   * getYesterdayName(); // returns "Sunday" if yesterday was Sunday
   */

  /**
   * Returns the name of the previous day of the week in English as a string.
   * @returns {string} The name of the previous day of the week in English.
   * @example
   * getYesterdayName(); // returns "Sunday" if yesterday was Sunday
   */
  function getYesterdayName() {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    return new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);
  }

  /**
   * Returns the date of yesterday in the format "yyyy-mm-dd" as a string.
   * @returns {string} The date of yesterday in the format "yyyy-mm-dd".
   * @example
   * getYesterdayDateFormatted(); // returns "2022-01-01" if yesterday was the 1st of January 2022
   */
  function getYesterdayDateFormatted() {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /**
   * Returns the date of yesterday in the format "day month" as a string.
   * The month is returned in lowercase English.
   * @returns {string} The date of yesterday in the format "day month".
   * @example
   * getYesterdayDate(); // returns "31 december" if yesterday was the 31st of December
   */
  function getYesterdayDate() {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en', { month: 'long' })
      .format(date)
      .toLowerCase();

    return `${day} ${month}`;
  }

  /**
   * Returns the name of the next day of the week in English as a string.
   * @returns {string} The name of the next day of the week in English.
   * @example
   * getTomorrowDayName(); // returns "Monday" if tomorrow is Monday
   */
  function getTomorrowDayName() {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    return new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);
  }

  /**
   * Returns the date of tomorrow in the format "yyyy-mm-dd" as a string.
   * @returns {string} The date of tomorrow in the format "yyyy-mm-dd".
   * @example
   * getTomorrowDateFormatted(); // returns "2022-01-02" if tomorrow is the 2nd of January 2022
   */
  function getTomorrowDateFormatted() {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /**
   * Returns the date of tomorrow in the format "day month" as a string.
   * The month is returned in lowercase English.
   * @returns {string} The date of tomorrow in the format "day month".
   * @example
   * getTomorrowDate(); // returns "2 january" if tomorrow is the 2nd of January
   */
  function getTomorrowDate() {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);

    return `${day} ${month}`;
  }

  /**
   * Returns the name of the day of the week of the given date string.
   * @param {string} dateString - The date string in the format "yyyy-mm-dd".
   * @param {number} [offsetDays=0] - The number of days to offset from the given date.
   * @returns {string} The name of the day of the week.
   * @example
   * getDayNameFromDate('2022-01-01', 1); // returns "Sunday" if the 2nd of January 2022 is a Sunday
   */
  function getDayNameFromDate(dateString, offsetDays = 0) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + offsetDays);

    return new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);
  }

  return {
    getTodayDayName,
    getTodayDate,
    getTomorrowDayName,
    getYesterdayName,
    getYesterdayDateFormatted,
    getYesterdayDate,
    getTomorrowDateFormatted,
    getTomorrowDate,
    getDayNameFromDate,
  };
})();

export default Day;
