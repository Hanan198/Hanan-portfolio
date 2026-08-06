const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const appointmentForm = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");
const dateInput = document.getElementById("date");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const currentItem = button.closest(".faq-item");

    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== currentItem) {
        item.classList.remove("active");
        item.querySelector("button span").textContent = "+";
      }
    });

    currentItem.classList.toggle("active");
    button.querySelector("span").textContent =
      currentItem.classList.contains("active") ? "−" : "+";
  });
});

const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
dateInput.min = today.toISOString().split("T")[0];

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (name.length < 3) {
    showMessage("Please enter your full name.", false);
    return;
  }

  if (!/^[+0-9\s()-]{8,20}$/.test(phone)) {
    showMessage("Please enter a valid phone number.", false);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMessage("Please enter a valid email address.", false);
    return;
  }

  showMessage(
    `Thank you, ${name}. Your appointment request has been sent successfully. Our reception team will contact you shortly.`,
    true
  );

  appointmentForm.reset();
  dateInput.min = today.toISOString().split("T")[0];
});

function showMessage(message, success) {
  formMessage.textContent = message;
  formMessage.style.color = success ? "#0c7c86" : "#c94444";
}

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("year").textContent = new Date().getFullYear();
