document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.getElementById("header_menu_button");
  const menu = document.getElementById("menu");
  const header = document.querySelector(".header");
  const displayDiv = document.querySelector(".displayDiv");

  hamburgerMenu.addEventListener("click", function () {
    this.classList.toggle("open");
    menu.classList.toggle("open");
    header.classList.toggle("bg-changed");
    displayDiv.classList.toggle("open");
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

document.addEventListener("DOMContentLoaded", () => {
  const dropdownDivs = document.querySelectorAll(".footer_dropdown_div");

  dropdownDivs.forEach((dropdownDiv) => {
    const dropdownArrow = dropdownDiv.querySelector(".footer_dropdown_arrow");
    const dropdownList = dropdownDiv.querySelector(
      ".footer_dropdown_div_list_1"
    );

    dropdownDiv.addEventListener("click", () => {
      dropdownDivs.forEach((otherDiv) => {
        if (otherDiv !== dropdownDiv) {
          const otherArrow = otherDiv.querySelector(".footer_dropdown_arrow");
          const otherList = otherDiv.querySelector(
            ".footer_dropdown_div_list_1"
          );
          otherArrow.classList.remove("active_footer_drop_arrow");
          otherList.classList.remove("open");
        }
      });

      dropdownArrow.classList.toggle("active_footer_drop_arrow");
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

  const dragDistance = Math.abs(currentScroll - scrollLeft);
  const dragPercentage = (dragDistance / slideWidth) * 100;

  let finalScrollLeft = currentSlideIndex * slideWidth;

  if (dragPercentage > 15) {
    if (currentScroll > scrollLeft) {
      finalScrollLeft += slideWidth * 0.8;
    } else {
      finalScrollLeft -= slideWidth * 0.8;
    }
  }

  smoothScrollTo(slider, finalScrollLeft, 800);
}

function smoothScrollTo(element, target, duration) {
  const start = element.scrollLeft;
  const change = target - start;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = () => {
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    element.scrollLeft = val;
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  animateScroll();
}

function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

function getScrollPercentageForNextImage() {
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
  const percentagePerSlide = (slideWidth / maxScrollLeft) * 100;
  return percentagePerSlide;
}

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".offers_swiper_slider");
  const indicator = document.querySelector(".offers_swiper_indicator");
  const slides = document.querySelectorAll(".offers_swiper_slide");
  const slideWidth =
    slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.classList.add("active");
  });

  slider.addEventListener("mouseleave", () => {
    if (isDown) {
      slideToNearestSlide();
    }
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    if (isDown) {
      slideToNearestSlide();
    }
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const currentX = e.pageX - slider.offsetLeft;
    const walk = currentX - startX;
    slider.scrollLeft = scrollLeft - walk;
    updateIndicator();
  });

  slider.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.classList.add("active");
  });

  slider.addEventListener("touchend", () => {
    if (isDown) {
      slideToNearestSlide();
    }
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const currentX = e.touches[0].pageX - slider.offsetLeft;
    const walk = currentX - startX;
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

    const dragDistance = Math.abs(currentScroll - scrollLeft);
    const dragPercentage = (dragDistance / slideWidth) * 100;

    let finalScrollLeft = currentSlideIndex * slideWidth;

    if (dragPercentage > 15) {
      if (currentScroll > scrollLeft) {
        finalScrollLeft += slideWidth * 0.4;
      } else {
        finalScrollLeft -= slideWidth * 0.4;
      }
    }

    smoothScrollTo(slider, finalScrollLeft, 800);
  }

  function smoothScrollTo(element, target, duration) {
    const start = element.scrollLeft;
    const change = target - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
    animateScroll();
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  // Accessibility: Add keyboard controls
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      slider.scrollBy({ left: slideWidth, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      slider.scrollBy({ left: -slideWidth, behavior: "smooth" });
    }
  });

  // Add ARIA roles for accessibility
  slider.setAttribute("role", "region");
  slider.setAttribute("aria-label", "Image Carousel");
  slides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".section_awards_slider");
  const indicator = document.querySelector(".section_awards_indicator");
  const slides = document.querySelectorAll(".section_awards_slide");
  const slideWidth =
    slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.classList.add("active");
  });

  slider.addEventListener("mouseleave", () => {
    if (isDown) {
      slideToNearestSlide();
    }
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    if (isDown) {
      slideToNearestSlide();
    }
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const currentX = e.pageX - slider.offsetLeft;
    const walk = currentX - startX;
    slider.scrollLeft = scrollLeft - walk;
    updateIndicator();
  });

  slider.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    slider.classList.add("active");
  });

  slider.addEventListener("touchend", () => {
    if (isDown) {
      slideToNearestSlide();
    }
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const currentX = e.touches[0].pageX - slider.offsetLeft;
    const walk = currentX - startX;
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

    const dragDistance = Math.abs(currentScroll - scrollLeft);
    const dragPercentage = (dragDistance / slideWidth) * 100;

    let finalScrollLeft = currentSlideIndex * slideWidth;

    if (dragPercentage > 10) {
      if (currentScroll > scrollLeft) {
        finalScrollLeft += slideWidth * 0.6;
      } else {
        finalScrollLeft -= slideWidth * 0.6;
      }
    }

    smoothScrollTo(slider, finalScrollLeft, 800);
  }

  function smoothScrollTo(element, target, duration) {
    const start = element.scrollLeft;
    const change = target - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
    animateScroll();
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  // Accessibility: Add keyboard controls
  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      slider.scrollBy({ left: slideWidth, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      slider.scrollBy({ left: -slideWidth, behavior: "smooth" });
    }
  });

  // Add ARIA roles for accessibility
  slider.setAttribute("role", "region");
  slider.setAttribute("aria-label", "Image Carousel");
  slides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
  });
});
