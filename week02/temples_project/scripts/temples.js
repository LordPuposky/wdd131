document.addEventListener("DOMContentLoaded", () => {
  // Update copyright year and last modification date in footer
  const yearSpan = document.querySelector("footer p span#year");
  const modSpan = document.getElementById("modification");

  const currentYear = new Date().getFullYear();
  if (yearSpan) {
    yearSpan.textContent = currentYear;
  }

  // Format last modification date of the document (file)
  const lastMod = new Date(document.lastModified);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = lastMod.toLocaleString(undefined, options);
  if (modSpan) {
    modSpan.textContent = `Last Modification: ${formattedDate}`;
  }

  // Hamburger menu toggle behavior
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul.nav-menu");

  // Hide hamburger on large screens initially (CSS controls visibility)
  // Just toggle menu visibility and icon on small screens
  menuToggle.addEventListener("click", () => {
    const isExpanded = navMenu.classList.toggle("show-menu");
    if (isExpanded) {
      menuToggle.innerHTML = "&times;"; // X symbol when menu open
      menuToggle.setAttribute("aria-label", "Close navigation menu");
    } else {
      menuToggle.innerHTML = "&#9776;"; // Hamburger icon when closed
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
});
