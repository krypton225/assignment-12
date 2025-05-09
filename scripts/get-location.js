const UserLocation = (function () {
  /**
   * Gets the current location of the user.
   * @returns {Promise} A promise that resolves with the current location (as a
   *   Position object) or rejects with a PositionError object if the user
   *   denies access to their location.
   */
  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  /**
   * Retrieves the current geographical location of the user.
   * @returns {Promise<Object>} A promise that resolves to an object containing
   *   the latitude and longitude coordinates of the user.
   * @throws Will log an error message if the location retrieval fails.
   */
  async function get() {
    try {
      const position = await getCurrentLocation();

      const { latitude, longitude } = position.coords;

      return { latitude, longitude };
    } catch (error) {
      console.log(error);
    }
  }

  return {
    get,
  };
})();

export default UserLocation;
