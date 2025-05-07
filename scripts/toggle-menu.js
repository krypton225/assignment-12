"use strict";

const ToggleMenu = (function () {
  /**
   * Initializes the responsive navigation menu.
   *
   * @function init
   * @param {void}
   * @returns {void}
   */
  function init() {
    const navbarToggleButton = document.getElementById("navbar-hamburger");
    const navbarCloseButton = document.getElementById("navbar-close");
    const navbarList = document.getElementById("navbar-list");

    navbarToggleButton.addEventListener("click", navbarToggleHandler);
    navbarCloseButton.addEventListener("click", navbarToggleHandler);

    /**
     * Toggles the visibility of the responsive navigation menu and
     * its toggle/close buttons.
     *
     * @function navbarToggleHandler
     * @param {Event} event - The event that triggered this function.
     * @returns {void}
     */
    function navbarToggleHandler(event) {
      navbarToggleButton.classList.toggle("is-hidden");
      navbarCloseButton.classList.toggle("is-hidden");

      navbarList.classList.toggle("js-show");
    }
  }

  return {
    init,
  };
})();

export default ToggleMenu;
