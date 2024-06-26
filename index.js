/* Begin scroll to view animation */

// Get all global navigation and "skip to" link elements
const animatedScrollToElements = document.querySelectorAll(".global-nav__list li > a, .skip-to");
// Loop through links
for (var i = 0; i < animatedScrollToElements.length; i++) {
    // Set click event listener
    animatedScrollToElements[i].addEventListener("click", function(event) {
        event.preventDefault();
        // Get link href value for section anchor
        const thisHref = event.target.getAttribute("href");
        let anchor = document.querySelector(thisHref);
        // Animate scroll to section
        anchor.scrollIntoView({ behavior: "smooth" });
    });
}

/* End scroll to view animate */