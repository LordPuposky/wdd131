// Function to calculate wind chill based on temperature (Celsius) and wind speed (km/h)
// Returns the wind chill as a rounded number or "N/A" if conditions are not met
function calculateWindChill(temperature, windSpeed) {
  return Math.round(
    13.12 +
      0.6215 * temperature -
      11.37 * Math.pow(windSpeed, 0.16) +
      0.3965 * temperature * Math.pow(windSpeed, 0.16)
  );
}

// On DOMContentLoaded, update footer and wind chill display
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const currentYear = new Date().getFullYear();

  // Update copyright paragraph specifically
  const copyrightElem = document.getElementById("copyright");
  if (copyrightElem) {
    copyrightElem.textContent = `© ${currentYear} Yesid Augusto Romero Ruiz — Colombia`;
  }

  // Update last modification date
  const lastModElem = document.getElementById("last-mod");
  if (lastModElem) {
    lastModElem.textContent = document.lastModified;
  }

  // Static weather data (match your page static data)
  const temperature = 10; // °C
  const windSpeed = 5; // km/h

  // Calculate wind chill and update page ONLY if conditions are met (per rubric)
  const windChillElem = document.getElementById("windchill");
  if (windChillElem) {
    if (temperature <= 10 && windSpeed > 4.8) {
      const windChillValue = calculateWindChill(temperature, windSpeed);
      windChillElem.textContent = `${windChillValue} °C`;
    } else {
      windChillElem.textContent = "N/A";
    }
  }
});
