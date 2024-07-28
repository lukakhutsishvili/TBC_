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

  function toggleDropdowns() {
    const dropdownArrow = this.querySelector(".footer_dropdown_arrow");
    const dropdownList = this.querySelector(".footer_dropdown_div_list_1");

    dropdownDivs.forEach((otherDiv) => {
      if (otherDiv !== this) {
        const otherArrow = otherDiv.querySelector(".footer_dropdown_arrow");
        const otherList = otherDiv.querySelector(".footer_dropdown_div_list_1");
        otherArrow.classList.remove("active_footer_drop_arrow");
        otherList.classList.remove("open");
      }
    });

    dropdownArrow.classList.toggle("active_footer_drop_arrow");
    dropdownList.classList.toggle("open");
  }

  if (window.innerWidth <= 768) {
    dropdownDivs.forEach((dropdownDiv) => {
      dropdownDiv.addEventListener("click", toggleDropdowns);
    });
  }
});

window.addEventListener("resize", () => {
  const dropdownDivs = document.querySelectorAll(".footer_dropdown_div");

  function toggleDropdowns() {
    const dropdownArrow = this.querySelector(".footer_dropdown_arrow");
    const dropdownList = this.querySelector(".footer_dropdown_div_list_1");

    dropdownDivs.forEach((otherDiv) => {
      if (otherDiv !== this) {
        const otherArrow = otherDiv.querySelector(".footer_dropdown_arrow");
        const otherList = otherDiv.querySelector(".footer_dropdown_div_list_1");
        otherArrow.classList.remove("active_footer_drop_arrow");
        otherList.classList.remove("open");
      }
    });

    dropdownArrow.classList.toggle("active_footer_drop_arrow");
    dropdownList.classList.toggle("open");
  }

  if (window.innerWidth <= 768) {
    dropdownDivs.forEach((dropdownDiv) => {
      dropdownDiv.addEventListener("click", toggleDropdowns);
    });
  } else {
    dropdownDivs.forEach((dropdownDiv) => {
      dropdownDiv.removeEventListener("click", toggleDropdowns);
    });
  }
});

// 1slideri
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const indicator = document.querySelector(".indicator");
  const indicatorContainer = document.querySelector(".indicator-container");
  const slides = document.querySelectorAll(".slide");

  let slideWidth =
    slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);
  let isDown = false;
  let startX;
  let scrollLeft;

  function calculateSlideWidth() {
    slideWidth =
      slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);
  }

  function updateIndicator() {
    if (!indicatorContainer) {
      console.error("Indicator container not found");
      return;
    }

    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const percentageScrolled = (slider.scrollLeft / maxScrollLeft) * 100;
    const maxIndicatorMove =
      indicatorContainer.clientWidth - indicator.clientWidth;
    const leftPosition = (percentageScrolled * maxIndicatorMove) / 100;
    indicator.style.left = `${leftPosition}px`;
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

    smoothScrollTo(slider, finalScrollLeft, 700); // Adjusted duration to 400ms
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
      updateIndicator(); // Update the indicator during the scroll
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

  // Event listeners for dragging functionality
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

  // Event listeners for touch functionality
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

  // Ensure the indicator is updated when the window is resized
  window.addEventListener("resize", () => {
    calculateSlideWidth();
    updateIndicator();
  });

  // Initial calculation of slide width and indicator position
  calculateSlideWidth();
  updateIndicator();
});

//2slideri
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".offers_swiper_slider");
  const indicator = document.querySelector(".offers_swiper_indicator");
  const indicatorContainer = document.querySelector(
    ".offers_swiper_indicator-container"
  );
  const slides = document.querySelectorAll(".offers_swiper_slide");

  let slideWidth =
    slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);
  let isDown = false;
  let startX;
  let scrollLeft;

  function calculateSlideWidth() {
    slideWidth =
      slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);
  }

  function updateIndicator() {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const percentageScrolled = (slider.scrollLeft / maxScrollLeft) * 100;
    const maxIndicatorMove =
      indicatorContainer.clientWidth - indicator.clientWidth;
    const leftPosition = (percentageScrolled * maxIndicatorMove) / 100;
    indicator.style.left = `${leftPosition}px`;
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

    smoothScrollTo(slider, finalScrollLeft, 700);
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
      updateIndicator(); // Update the indicator during the scroll
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

  // Event listeners for dragging functionality
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

  // Event listeners for touch functionality
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

  // Ensure the indicator is updated when the window is resized
  window.addEventListener("resize", () => {
    calculateSlideWidth();
    updateIndicator();
  });

  // Initial calculation of slide width and indicator position
  calculateSlideWidth();
  updateIndicator();
});

//3slideri
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".section_awards_slider");
  const indicator = document.querySelector(".section_awards_indicator");
  const indicatorContainer = document.querySelector(
    ".section_awards_indicator-container"
  );
  const slides = document.querySelectorAll(".section_awards_slide");

  let slideWidth =
    slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);
  let isDown = false;
  let startX;
  let scrollLeft;

  function calculateSlideWidth() {
    slideWidth =
      slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);
  }

  function updateIndicator() {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const percentageScrolled = (slider.scrollLeft / maxScrollLeft) * 100;
    const maxIndicatorMove =
      indicatorContainer.clientWidth - indicator.clientWidth;
    const leftPosition = (percentageScrolled * maxIndicatorMove) / 100;
    indicator.style.left = `${leftPosition}px`;
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
      updateIndicator(); // Update the indicator during the scroll
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

  // Event listeners for dragging functionality
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

  // Event listeners for touch functionality
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

  // Ensure the indicator is updated when the window is resized
  window.addEventListener("resize", () => {
    calculateSlideWidth();
    updateIndicator();
  });

  // Initial calculation of slide width and indicator position
  calculateSlideWidth();
  updateIndicator();
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".offers_swiper_slider");
  const indicator = document.querySelector(".offers_swiper_indicator");
  const indicatorContainer = document.querySelector(
    ".offers_swiper_indicator-container"
  );
  const slides = document.querySelectorAll(".offers_swiper_slide");

  let slideWidth =
    slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);
  let isDown = false;
  let startX;
  let scrollLeft;

  function calculateSlideWidth() {
    slideWidth =
      slides[0].offsetWidth + parseFloat(getComputedStyle(slider).gap);
  }

  function updateIndicator() {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const percentageScrolled = (slider.scrollLeft / maxScrollLeft) * 100;
    const maxIndicatorMove =
      indicatorContainer.clientWidth - indicator.clientWidth;
    const leftPosition = (percentageScrolled * maxIndicatorMove) / 100;
    indicator.style.left = `${leftPosition}px`;
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
      updateIndicator();
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

  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      slider.scrollBy({ left: slideWidth, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      slider.scrollBy({ left: -slideWidth, behavior: "smooth" });
    }
  });

  slider.setAttribute("role", "region");
  slider.setAttribute("aria-label", "Image Carousel");
  slides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
  });

  window.addEventListener("resize", () => {
    calculateSlideWidth();
    updateIndicator();
  });

  calculateSlideWidth();
  updateIndicator();
});

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".desktop_menu");
  const dropdownMenus = document.querySelectorAll(".dropdown_menu");
  const triggers = document.querySelectorAll(".header_desktop_dropdown");
  let activeDropdown = null;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const dropdownMenu = trigger.querySelector(".dropdown_menu");

      if (menu.style.opacity === "1" && activeDropdown === dropdownMenu) {
        menu.style.opacity = "0";
        menu.style.zIndex = "-1";
        menu.style.transition = "opacity 1s, z-index 0s 1s";

        dropdownMenus.forEach((menu) => {
          menu.style.opacity = "0";
          menu.style.zIndex = "-1";
          menu.style.transition = "opacity 0.5s";
        });

        activeDropdown = null;
      } else {
        menu.style.opacity = "1";
        menu.style.zIndex = "50";
        menu.style.transition = "opacity 1s";

        dropdownMenus.forEach((menu) => {
          menu.style.opacity = "0";
          menu.style.zIndex = "-1";
          menu.style.transition = "opacity 0.5s";
        });

        setTimeout(() => {
          dropdownMenu.style.opacity = "1";
          dropdownMenu.style.zIndex = "50";
          dropdownMenu.style.transition = "opacity 0.5s";
        }, 1000);

        activeDropdown = dropdownMenu;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".desktop_menu");
  const dropdownMenus = document.querySelectorAll(".dropdown_menu");
  const triggers = document.querySelectorAll(".header_desktop_dropdown");
  let activeDropdown = null;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const dropdownMenu = trigger.querySelector(".dropdown_menu");

      // Check if the clicked trigger is already active
      const isActive = trigger.classList.contains("active");

      if (isActive) {
        // Hide the menu and the dropdown
        menu.style.opacity = "0";
        menu.style.zIndex = "-1";
        menu.style.transition = "opacity 1s, z-index 0s 1s";

        dropdownMenus.forEach((menu) => {
          menu.style.opacity = "0";
          menu.style.zIndex = "-1";
          menu.style.transition = "opacity 0.5s";
        });

        triggers.forEach((trigger) => trigger.classList.remove("active"));

        activeDropdown = null;
      } else {
        // Show the main menu
        menu.style.opacity = "1";
        menu.style.zIndex = "50";
        menu.style.transition = "opacity 1s";

        // Hide all dropdown menus first
        dropdownMenus.forEach((menu) => {
          menu.style.opacity = "0";
          menu.style.zIndex = "-1";
          menu.style.transition = "opacity 0.5s";
        });

        // Show the clicked dropdown menu after 1 second
        setTimeout(() => {
          dropdownMenu.style.opacity = "1";
          dropdownMenu.style.zIndex = "50";
          dropdownMenu.style.transition = "opacity 0.5s";
        }, 1000);

        // Remove active class for indicator animation from all triggers
        triggers.forEach((trigger) => trigger.classList.remove("active"));

        // Add active class for indicator animation to the clicked trigger
        trigger.classList.add("active");

        activeDropdown = dropdownMenu;
      }
    });
  });
});
