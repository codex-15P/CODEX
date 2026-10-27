const menuToggle = document.getElementById("menuToggle");
const mainNavigation = document.getElementById("mainNavigation");

if (menuToggle && mainNavigation) {
  function closeMainNavigation() {
    mainNavigation.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMainNavigation() {
    const isCurrentlyOpen = menuToggle.getAttribute("aria-expanded") === "true";

    mainNavigation.hidden = isCurrentlyOpen;

    menuToggle.setAttribute("aria-expanded", String(!isCurrentlyOpen));
  }
  if (menuToggle.getAttribute("aria-expanded") === "true") {
    mainNavigation.hidden = false;
  } else {
    mainNavigation.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
  }
  menuToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleMainNavigation();
  });
  mainNavigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMainNavigation);
  });
  document.addEventListener("click", function (event) {
    if (
      !mainNavigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMainNavigation();
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !mainNavigation.hidden) {
      closeMainNavigation();
      menuToggle.focus();
    }
  });
}

const menuItems = document.querySelectorAll(".menu-item");

if (menuItems.length > 0) {
  menuItems.forEach(function (item) {
    const button = item.querySelector(".menu-button");
    const description = item.querySelector(".menu-description");
    const plusIcon = item.querySelector(".menu-plus");

    if (!button || !description) {
      return;
    }

    function closeMenuItem() {
      item.classList.remove("active");
      button.setAttribute("aria-expanded", "false");
      description.hidden = true;

      if (plusIcon) {
        plusIcon.textContent = "+";
      }
    }

    function openMenuItem() {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
      description.hidden = false;

      if (plusIcon) {
        plusIcon.textContent = "−";
      }
    }

    if (
      item.classList.contains("active") ||
      button.getAttribute("aria-expanded") === "true"
    ) {
      openMenuItem();
    } else {
      closeMenuItem();
    }

    button.addEventListener("click", function () {
      const isOpen = button.getAttribute("aria-expanded") === "true";

      menuItems.forEach(function (otherItem) {
        if (otherItem === item) {
          return;
        }

        const otherButton = otherItem.querySelector(".menu-button");

        const otherDescription = otherItem.querySelector(".menu-description");

        const otherPlus = otherItem.querySelector(".menu-plus");

        otherItem.classList.remove("active");

        if (otherButton) {
          otherButton.setAttribute("aria-expanded", "false");
        }

        if (otherDescription) {
          otherDescription.hidden = true;
        }

        if (otherPlus) {
          otherPlus.textContent = "+";
        }
      });

      if (isOpen) {
        closeMenuItem();
      } else {
        openMenuItem();
      }
    });
  });
                                                    }
