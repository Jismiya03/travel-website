/* MOBILE NAVIGATION */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("show");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";

  });

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("show");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";

    });

  });

}


/* HERO IMAGE SLIDESHOW */

const slides = document.querySelectorAll(".hero-slide");
const slideCount = document.getElementById("slide-count");

let currentSlide = 0;

function showSlide(index) {

  slides.forEach(slide => {
    slide.classList.remove("active");
  });

  slides[index].classList.add("active");

  if (slideCount) {
    slideCount.textContent =
      `0${index + 1} / 0${slides.length}`;
  }

}

if (slides.length > 0) {

  showSlide(currentSlide);

  setInterval(() => {

    currentSlide = (currentSlide + 1) % slides.length;

    showSlide(currentSlide);

  }, 5000);

}


/* CONTACT FORM VALIDATION */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

  const formMessage = document.getElementById("form-message");

  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message")
  };


  function showError(field, message) {

    const errorElement = field.parentElement.querySelector(".field-error");

    field.classList.add("invalid");

    if (errorElement) {
      errorElement.textContent = message;
    }

  }


  function clearError(field) {

    const errorElement = field.parentElement.querySelector(".field-error");

    field.classList.remove("invalid");

    if (errorElement) {
      errorElement.textContent = "";
    }

  }


  function validateField(field) {

    const value = field.value.trim();

    clearError(field);


    if (!value) {

      showError(field, "This field is required.");

      return false;

    }


    if (field.id === "name") {

      if (value.length < 2) {

        showError(field, "Name must contain at least 2 characters.");

        return false;

      }

      if (!/^[\p{L}\s.'-]+$/u.test(value)) {

        showError(field, "Please enter a valid name.");

        return false;

      }

    }


    if (field.id === "email") {

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

      if (!emailPattern.test(value)) {

        showError(field, "Please enter a valid email address.");

        return false;

      }

    }


    if (field.id === "phone") {

      const digits = value.replace(/\D/g, "");

      if (!/^[+()\d\s-]+$/.test(value) || digits.length < 10 || digits.length > 15) {

        showError(field, "Enter a valid phone number with 10–15 digits.");

        return false;

      }

    }


    if (field.id === "message") {

      if (value.length < 10) {

        showError(field, "Message must contain at least 10 characters.");

        return false;

      }

    }


    return true;

  }


  // Clear errors while the user edits fields

  Object.values(fields).forEach(field => {

    field.addEventListener("input", () => {

      clearError(field);

      formMessage.textContent = "";

    });

    field.addEventListener("change", () => {

      clearError(field);

      formMessage.textContent = "";

    });

  });


  // Submit form

  contactForm.addEventListener("submit", event => {

    event.preventDefault();

    formMessage.textContent = "";
    formMessage.className = "form-message";

    let isValid = true;

    Object.values(fields).forEach(field => {

      if (!validateField(field)) {
        isValid = false;
      }

    });


    if (!isValid) {

      formMessage.textContent =
        "Please correct the highlighted fields.";

      formMessage.classList.add("error");

      const firstInvalid = contactForm.querySelector(".invalid");

      if (firstInvalid) {
        firstInvalid.focus();
      }

      return;

    }


    // Front-end validation succeeded.
    // Connect a backend or form service to actually send enquiries.

    formMessage.textContent =
      "Your details are valid! Connect the form to a backend to send your enquiry.";

    contactForm.reset();

  });

}
