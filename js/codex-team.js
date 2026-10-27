const teamMembers = document.querySelectorAll(".team-page .team-member");

if (teamMembers.length > 0) {
  teamMembers.forEach(function (member) {
    const header = member.querySelector(".member-header");
    const information = member.querySelector(".member-info");
    const icon = member.querySelector(".toggle-icon");

    if (!header || !information) {
      return;
    }

    if (header.tagName !== "BUTTON" && !header.hasAttribute("tabindex")) {
      header.setAttribute("tabindex", "0");
    }

    if (header.tagName !== "BUTTON" && !header.hasAttribute("role")) {
      header.setAttribute("role", "button");
    }

    function closeTeamMember() {
      member.classList.remove("active");

      header.setAttribute("aria-expanded", "false");

      information.hidden = true;

      if (icon) {
        icon.textContent = "+";
      }
    }

    function openTeamMember() {
      member.classList.add("active");

      header.setAttribute("aria-expanded", "true");

      information.hidden = false;

      if (icon) {
        icon.textContent = "−";
      }
    }

    if (
      member.classList.contains("active") ||
      header.getAttribute("aria-expanded") === "true"
    ) {
      openTeamMember();
    } else {
      closeTeamMember();
    }

    function toggleTeamMember() {
      const isOpen = header.getAttribute("aria-expanded") === "true";

      teamMembers.forEach(function (otherMember) {
        if (otherMember === member) {
          return;
        }

        const otherHeader = otherMember.querySelector(".member-header");

        const otherInformation = otherMember.querySelector(".member-info");

        const otherIcon = otherMember.querySelector(".toggle-icon");

        otherMember.classList.remove("active");

        if (otherHeader) {
          otherHeader.setAttribute("aria-expanded", "false");
        }

        if (otherInformation) {
          otherInformation.hidden = true;
        }

        if (otherIcon) {
          otherIcon.textContent = "+";
        }
      });

      if (isOpen) {
        closeTeamMember();
      } else {
        openTeamMember();
      }
    }

    header.addEventListener("click", toggleTeamMember);

    header.addEventListener("keydown", function (event) {
      if (
        header.tagName !== "BUTTON" &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        toggleTeamMember();
      }
    });
  });
}

const imageViewer = document.getElementById("imageViewer");
const fullTeamImage = document.getElementById("fullTeamImage");
const imageViewerClose = document.getElementById("imageViewerClose");

if (imageViewer && fullTeamImage) {
  let lastFocusedImage = null;

  const memberPictures = document.querySelectorAll(
    ".team-page .member-picture",
  );

  function closeImageViewer() {
    imageViewer.classList.remove("active");
    imageViewer.hidden = true;

    imageViewer.setAttribute("aria-hidden", "true");

    document.body.classList.remove("image-viewer-open");

    if (lastFocusedImage) {
      lastFocusedImage.focus();
    }
  }

  function openImageViewer(image) {
    if (!image) {
      return;
    }

    lastFocusedImage = image;

    const imageSource = image.currentSrc || image.getAttribute("src");

    if (!imageSource) {
      return;
    }

    fullTeamImage.src = imageSource;

    fullTeamImage.alt = image.getAttribute("alt") || "Team member image";

    imageViewer.hidden = false;

    imageViewer.classList.add("active");

    imageViewer.setAttribute("aria-hidden", "false");

    document.body.classList.add("image-viewer-open");

    if (imageViewerClose) {
      imageViewerClose.focus();
    }
  }

  memberPictures.forEach(function (picture) {
    picture.addEventListener("click", function () {
      let image = null;

      if (picture.tagName === "IMG") {
        image = picture;
      } else {
        image = picture.querySelector("img");
      }

      if (!image) {
        return;
      }

      openImageViewer(image);
    });

    if (
      picture.tagName !== "BUTTON" &&
      picture.tagName !== "A" &&
      !picture.hasAttribute("tabindex")
    ) {
      picture.setAttribute("tabindex", "0");
    }

    picture.addEventListener("keydown", function (event) {
      if (
        picture.tagName !== "BUTTON" &&
        picture.tagName !== "A" &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();

        const image =
          picture.tagName === "IMG" ? picture : picture.querySelector("img");

        openImageViewer(image);
      }
    });
  });

  if (imageViewerClose) {
    imageViewerClose.addEventListener("click", closeImageViewer);
  }

  imageViewer.addEventListener("click", function (event) {
    if (event.target === imageViewer) {
      closeImageViewer();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !imageViewer.hidden) {
      closeImageViewer();
    }
  });
}
