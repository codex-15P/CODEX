(function initializeCodexProjectEnquiry() {
  "use strict";

  const enquiryYear = document.getElementById("enquiryCurrentYear");

  if (enquiryYear) {
    enquiryYear.textContent = new Date().getFullYear();
  }

  const enquiryForm = document.getElementById("codexEnquiryForm");

  if (!enquiryForm) {
    return;
  }

  const enquiryMessage = document.getElementById("enquiryFormMessage");

  const deadlineInput = document.getElementById("projectDeadline");

  const resetButton = enquiryForm.querySelector('button[type="reset"]');

  const CODEX_WHATSAPP_NUMBER = "2349113234337";

  function showEnquiryFeedback(message) {
    if (enquiryMessage) {
      enquiryMessage.textContent = message;
    }
  }

  function isDeadlineValid() {
    if (!deadlineInput || !deadlineInput.value) {
      return true;
    }

    const today = new Date();
    const localToday =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");

    if (deadlineInput.value < localToday) {
      deadlineInput.setCustomValidity("Please choose today or a future date.");

      return false;
    }

    deadlineInput.setCustomValidity("");
    return true;
  }

  if (deadlineInput) {
    deadlineInput.addEventListener("change", function () {
      isDeadlineValid();
    });
  }

  enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    showEnquiryFeedback("");

    if (!enquiryForm.reportValidity()) {
      return;
    }

    if (!isDeadlineValid()) {
      deadlineInput.reportValidity();
      return;
    }

    const clientName = document.getElementById("clientName").value.trim();

    const clientWhatsApp = document
      .getElementById("clientWhatsApp")
      .value.trim();

    const projectType = document.getElementById("projectType").value;

    const projectTitle = document.getElementById("projectTitle").value.trim();

    const projectDescription = document
      .getElementById("projectDescription")
      .value.trim();

    const projectBudget = document.getElementById("projectBudget").value;

    const projectDeadline = document.getElementById("projectDeadline").value;

    const projectReferences = document
      .getElementById("projectReferences")
      .value.trim();

    let formattedDeadline = "Not specified";

    if (projectDeadline) {
      const dateParts = projectDeadline.split("-");

      formattedDeadline =
        dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    }

    const messageLines = [
      "Hello CODEX Web and Design!",
      "",
      "I would like to make a project enquiry.",
      "",
      "CLIENT DETAILS",
      "Name: " + clientName,
      "WhatsApp: " + clientWhatsApp,
      "",
      "PROJECT DETAILS",
      "Service: " + projectType,
      "Project Title: " + (projectTitle || "Not specified"),
      "Description: " + projectDescription,
      "Estimated Budget: " + (projectBudget || "Not specified"),
      "Preferred Completion Date: " + formattedDeadline,
      "Reference Links: " + (projectReferences || "None provided"),
      "",
      "Please let me know the next steps.",
      "",
      "Thank you!",
    ];

    const whatsappMessage = messageLines.join("\n");

    const numberIsConfigured = /^\d{10,15}$/.test(CODEX_WHATSAPP_NUMBER);

    if (!numberIsConfigured) {
      showEnquiryFeedback(
        "Your form is valid, but CODEX's WhatsApp " +
          "number has not been configured yet. " +
          "Please add the correct business number " +
          "in script.js before testing the WhatsApp handoff.",
      );

      return;
    }

    const whatsappURL =
      "https://wa.me/" +
      CODEX_WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(whatsappMessage);

    showEnquiryFeedback(
      "Your enquiry message is ready. WhatsApp will " +
        "open so you can review it and press Send.",
    );

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      window.setTimeout(function () {
        showEnquiryFeedback("");

        if (deadlineInput) {
          deadlineInput.setCustomValidity("");
        }
      }, 0);
    });
  }
})();
