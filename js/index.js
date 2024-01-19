// Listen for the DOMContentLoaded event before executing the provided function
// This function is called because we want the Navigation item 'Home' to be loaded as dot (.)
document.addEventListener(
  "DOMContentLoaded",
  function () {
    // When the DOM is fully loaded, show the home content by default
    showHome();
  },
  false
);

// Navbar Handle --------------------------------------------------

// Function to show the home content in the navigation
function showHome() {
  toggleNav("nav-home");
  toggleContent("homeContent");
}

// Function to show the experience content in the navigation
function showExperience() {
  toggleNav("nav-experience");
  toggleContent("experienceContent");
}

// Function to show the contact content in the navigation
function showContact() {
  toggleNav("nav-contact");
  toggleContent("contactContent");
}

// Function to toggle the visibility of content sections based on the provided contentId
function toggleContent(contentId) {
  // Remove 'active' class from all content sections
  const allContent = document.querySelectorAll(".content-section");
  allContent.forEach((content) => content.classList.remove("active"));

  // Add 'active' class to the selected content section
  const selectedContent = document.getElementById(contentId);
  selectedContent.classList.add("active");
}

// Function to toggle the selected state of navigation items and update their display names
function toggleNav(contentId) {
  // Remove 'selected' class from all navigation items and restore the original name of the selected item
  const allContent = document.querySelectorAll(".navigation");
  allContent.forEach((content) => {
    content.classList.remove("selected");
    if (content.innerHTML === "<bold>.</bold>") {
      content.innerHTML = previousName;
    }
  });

  // Add 'selected' class to the clicked navigation item
  const selectedContent = document.getElementById(contentId);
  selectedContent.classList.add("selected");

  // Update the previousName variable and set the display name to "<bold>.</bold>"
  previousName = selectedContent.innerHTML;
  selectedContent.innerHTML = "<bold>.</bold>";
}