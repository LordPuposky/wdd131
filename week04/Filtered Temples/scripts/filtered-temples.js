document.addEventListener("DOMContentLoaded", () => {
  // Footer: copyright year and last modification date
  const yearSpan = document.querySelector("footer p span#year");
  const modSpan = document.getElementById("modification");
  const currentYear = new Date().getFullYear();
  if (yearSpan) yearSpan.textContent = currentYear;
  if (modSpan) modSpan.textContent = document.lastModified;

  // Hamburger menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul.nav-menu");
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    menuToggle.innerHTML = navMenu.classList.contains("show-menu") ? "&times;" : "&#9776;";
    menuToggle.setAttribute("aria-label", navMenu.classList.contains("show-menu") ? "Close navigation menu" : "Open navigation menu");
  });

  // Temple array, solo los tres últimos usan ruta local
  const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Las tres nuevas con imagen local:
    {
      templeName: "Paris France",
      location: "Le Chesnay, France",
      dedicated: "2017, May, 21",
      area: 44175,
      imageUrl: "images/ParisTemple.jpeg"
    },
    {
      templeName: "Bogotá Colombia",
      location: "Bogotá, Colombia",
      dedicated: "1999, April, 24",
      area: 53500,
      imageUrl: "images/BogotaTemple.jpeg"
    },
    {
      templeName: "Tokyo Japan",
      location: "Tokyo, Japan",
      dedicated: "1980, October, 27",
      area: 52590,
      imageUrl: "images/TokyoTemple.jpeg"
    }
  ];

  function getYear(dedicated) {
    return parseInt(dedicated.split(",")[0], 10);
  }

  // Render temple cards with accessibility attributes
  function renderTemples(templeArray) {
    const grid = document.querySelector(".temple-grid");
    grid.innerHTML = "";
    templeArray.forEach((t, idx) => {
      const card = document.createElement("div");
      card.className = "temple-card";
      card.setAttribute("tabindex", "0");
      // Solo la PRIMERA imagen de cada grid sin lazy (performance)
      card.innerHTML = `
        <h3>${t.templeName}</h3>
        <p><strong>Location:</strong> ${t.location}</p>
        <p><strong>Dedicated:</strong> ${t.dedicated}</p>
        <p><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</p>
        <img src="${t.imageUrl}" alt="${t.templeName}" ${idx === 0 ? "" : "loading='lazy'"} width="300" height="210">
      `;
      grid.appendChild(card);
    });
  }

  // Filter logic
  function filterOld() {
    renderTemples(temples.filter(t => getYear(t.dedicated) < 1900));
    document.querySelector('section.album h2').textContent = 'Old';
  }
  function filterNew() {
    renderTemples(temples.filter(t => getYear(t.dedicated) > 2000));
    document.querySelector('section.album h2').textContent = 'New';
  }
  function filterLarge() {
    renderTemples(temples.filter(t => t.area > 90000));
    document.querySelector('section.album h2').textContent = 'Large';
  }
  function filterSmall() {
    renderTemples(temples.filter(t => t.area < 10000));
    document.querySelector('section.album h2').textContent = 'Small';
  }
  function showAll() {
    renderTemples(temples);
    document.querySelector('section.album h2').textContent = 'Home';
  }

  // Menu filters
  const links = document.querySelectorAll('.nav-menu li a');
  if (links.length >= 5) {
    links[0].addEventListener('click', (e) => { e.preventDefault(); showAll(); });
    links[1].addEventListener('click', (e) => { e.preventDefault(); filterOld(); });
    links[2].addEventListener('click', (e) => { e.preventDefault(); filterNew(); });
    links[3].addEventListener('click', (e) => { e.preventDefault(); filterLarge(); });
    links[4].addEventListener('click', (e) => { e.preventDefault(); filterSmall(); });
  }

  // Initial rendering
  showAll();
});