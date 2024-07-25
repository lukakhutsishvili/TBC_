document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.getElementById("header_menu_button");
  const menu = document.getElementById("menu");
  const header = document.querySelector(".header");

  hamburgerMenu.addEventListener("click", function () {
    this.classList.toggle("open");
    menu.classList.toggle("open");
    header.classList.toggle("bg-changed");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dropdownDivs = document.querySelectorAll(".mobile_menu_dropdown_div");

  dropdownDivs.forEach((dropdownDiv) => {
    const dropdownArrow = dropdownDiv.querySelector(".mobile_dropdown_arrow");
    const dropdownList = dropdownDiv.querySelector(
      ".mobile_menu_dropdown_div_list_1"
    );

    dropdownDiv.addEventListener("click", () => {
      dropdownDivs.forEach((otherDiv) => {
        if (otherDiv !== dropdownDiv) {
          const otherArrow = otherDiv.querySelector(".mobile_dropdown_arrow");
          const otherList = otherDiv.querySelector(
            ".mobile_menu_dropdown_div_list_1"
          );
          otherArrow.classList.remove("active_mobile_drop_arrow");
          otherList.classList.remove("open");
        }
      });

      // Toggle the clicked dropdown
      dropdownArrow.classList.toggle("active_mobile_drop_arrow");
      dropdownList.classList.toggle("open");
    });
  });
});
