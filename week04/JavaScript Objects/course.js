// Course object with sections
let course = {
  code: "WDD131",
  title: "Dynamic Web Fundamentals",
  credits: 2,
  sections: [
    { section: "001", enrolled: 95, instructor: "Roberto Diaz Rodriguez" },
    { section: "002", enrolled: 80, instructor: "Sarah Gobble" }
  ]
};

// Function to set course information in header
function setCourseInformation(course) {
  document.querySelector("#courseName").innerHTML = `${course.code} – ${course.title}`;
}

// Template function for each table row
function sectionTemplate(section) {
  return `<tr>
           <td>${section.section}</td>
           <td>${section.enrolled}</td>
           <td>${section.instructor}</td>
          </tr>`;
}

// Render the sections into the table
function renderSections(course) {
  const html = course.sections.map(sectionTemplate);
  document.querySelector("#sections tbody").innerHTML = html.join("");
}

// Run functions on page load
setCourseInformation(course);
renderSections(course);
