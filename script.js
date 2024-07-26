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

      dropdownArrow.classList.toggle("active_mobile_drop_arrow");
      dropdownList.classList.toggle("open");
    });
  });
});

const slider = document.querySelector(".slider");
const indicator = document.querySelector(".indicator");
const slideWidth =
  document.querySelector(".slide").offsetWidth +
  parseFloat(getComputedStyle(slider).gap);

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  if (isDown) {
    slideToNearestSlide();
  }
  isDown = false;
});

slider.addEventListener("mouseup", () => {
  if (isDown) {
    slideToNearestSlide();
  }
  isDown = false;
  console.log(isDown);
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();

  let currentX = e.pageX - slider.offsetLeft;
  let walk = currentX - startX;

  slider.scrollLeft = scrollLeft - walk;
  updateIndicator();
});

function updateIndicator() {
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
  const percentageScrolled = (slider.scrollLeft / maxScrollLeft) * 100;
  const indicatorWidth = (indicator.clientWidth / slider.clientWidth) * 100;
  const leftPosition = (percentageScrolled * (100 - indicatorWidth)) / 100;

  indicator.style.left = `${leftPosition}%`;
}

function slideToNearestSlide() {
  const currentScroll = slider.scrollLeft;

  const exactScrollPosition = currentScroll / slideWidth;
  const currentSlideIndex = Math.round(exactScrollPosition);

  const newScrollLeft = currentSlideIndex * slideWidth;

  slider.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });
}
