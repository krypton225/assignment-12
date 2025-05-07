"use strict";

const ToggleMenu = (function () {
  function init() {
    const navbarToggleButton = document.getElementById("navbar-hamburger");
    const navbarCloseButton = document.getElementById("navbar-close");
    const navbarList = document.getElementById("navbar-list");

    navbarToggleButton.addEventListener("click", navbarToggleHandler);
    navbarCloseButton.addEventListener("click", navbarToggleHandler);

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
