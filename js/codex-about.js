const aboutAccordionButtons = document.querySelectorAll(
  ".about-page .about-accordion-button, " + ".about-page .about-section-toggle",
);

if (aboutAccordionButtons.length > 0) {
  aboutAccordionButtons.forEach(function (button) {
    const controlledId = button.getAttribute("aria-controls");

    let content = controlledId ? document.getElementById(controlledId) : null;

    const card = button.closest(
      ".about-card, .about-accordion-item, .about-section",
    );

    if (!content && card) {
      content = card.querySelector(
        ".about-card-content, " +
          ".about-accordion-content, " +
          ".about-section-content",
      );
    }

    if (!content) {
      return;
    }

    let icon = null;

    if (card) {
      icon = card.querySelector(".about-toggle-icon");
    }

    if (!icon) {
      icon = button.querySelector(".about-toggle-icon");
    }

    function closeAboutSection() {
      button.setAttribute("aria-expanded", "false");

      content.hidden = true;

      if (card) {
        card.classList.remove("active");
      }

      if (icon) {
        icon.textContent = "+";
      }
    }

    function openAboutSection() {
      button.setAttribute("aria-expanded", "true");

      content.hidden = false;

      if (card) {
        card.classList.add("active");
      }

      if (icon) {
        icon.textContent = "−";
      }
    }

    if (
      button.getAttribute("aria-expanded") === "true" ||
      (card && card.classList.contains("active"))
    ) {
      openAboutSection();
    } else {
      closeAboutSection();
    }

    button.addEventListener("click", function () {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      aboutAccordionButtons.forEach(function (otherButton) {
        if (otherButton === button) {
          return;
        }

        const otherId = otherButton.getAttribute("aria-controls");

        let otherContent = otherId ? document.getElementById(otherId) : null;

        const otherCard = otherButton.closest(
          ".about-card, " + ".about-accordion-item, " + ".about-section",
        );

        if (!otherContent && otherCard) {
          otherContent = otherCard.querySelector(
            ".about-card-content, " +
              ".about-accordion-content, " +
              ".about-section-content",
          );
        }

        otherButton.setAttribute("aria-expanded", "false");

        if (otherContent) {
          otherContent.hidden = true;
        }

        if (otherCard) {
          otherCard.classList.remove("active");
        }

        let otherIcon = otherCard
          ? otherCard.querySelector(".about-toggle-icon")
          : null;

        if (!otherIcon) {
          otherIcon = otherButton.querySelector(".about-toggle-icon");
        }

        if (otherIcon) {
          otherIcon.textContent = "+";
        }
      });

      if (isOpen) {
        closeAboutSection();
      } else {
        openAboutSection();
      }
    });
  });
}
