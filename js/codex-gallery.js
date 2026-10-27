(function initializeCodexProjectGallery() {
  "use strict";

  const galleryCurrentYear = document.getElementById("galleryCurrentYear");

  if (galleryCurrentYear) {
    galleryCurrentYear.textContent = new Date().getFullYear();
  }

  const galleryPage = document.querySelector(".project-gallery-page");

  if (!galleryPage) {
    return;
  }

  const filterButtons = galleryPage.querySelectorAll(".gallery-filter-button");

  const projectGrid = document.getElementById("galleryProjectGrid");

  const emptyState = document.getElementById("galleryEmptyState");

  const showAllButton = galleryPage.querySelector(".gallery-show-all-button");

  if (filterButtons.length === 0 || !projectGrid || !emptyState) {
    return;
  }

  const projectCards = Array.from(
    projectGrid.querySelectorAll(".gallery-project-card"),
  );

  function filterGalleryProjects(selectedCategory) {
    let visibleProjects = 0;

    projectCards.forEach(function (card) {
      const projectCategory = card.getAttribute("data-category");

      const shouldShow =
        selectedCategory === "all" || projectCategory === selectedCategory;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleProjects++;
      }
    });

    filterButtons.forEach(function (button) {
      const isSelected =
        button.getAttribute("data-category") === selectedCategory;

      button.classList.toggle("active", isSelected);

      button.setAttribute("aria-pressed", String(isSelected));
    });

    if (visibleProjects === 0) {
      emptyState.hidden = false;
      projectGrid.hidden = true;
    } else {
      emptyState.hidden = true;
      projectGrid.hidden = false;
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedCategory = button.getAttribute("data-category");

      if (!selectedCategory) {
        return;
      }

      filterGalleryProjects(selectedCategory);
    });
  });

  if (showAllButton) {
    showAllButton.addEventListener("click", function () {
      filterGalleryProjects("all");
    });
  }

  filterGalleryProjects("all");
})();
