// Get all global navigation elements
const globalNavigationItemElements = document.querySelectorAll(".global-nav__list li > a");
scrollToAnchor(globalNavigationItemElements);
closeGlobalNavigationOnMobile(globalNavigationItemElements);

// Get all "skip to" link elements
const skipToElements = document.querySelectorAll(".skip-to");
scrollToAnchor(skipToElements);

function scrollToAnchor(els) {
    for (var i = 0; i < els.length; i++) {
        els[i].addEventListener("click", function(event) {
            event.preventDefault();
            // Get link href value for section anchor
            const thisHref = event.target.getAttribute("href");
            const anchor = document.querySelector(thisHref);
            const bodyRect = document.body.getBoundingClientRect();
            const anchorRect = anchor.getBoundingClientRect();
            const offset = anchorRect.top - bodyRect.top;
            // Animate scroll to section
            window.scrollTo({
                top: offset,
                left: 0,
                behavior: "smooth"
            });
        });
    }
}

function closeGlobalNavigationOnMobile(els) {
    for (var i = 0; i < els.length; i++) {
        els[i].addEventListener("click", function(event) {
            event.preventDefault();
            if (globalNavIsOpen) {
                globalNavToggle.classList.remove("global-nav__toggle--active");
                globalNavList.classList.remove("global-nav__list-open");
                globalNavIsOpen = false;
            }
        });
    }
}

/* Begin global navigation mobile toggle */
const globalNavToggle = document.querySelector("#global-nav-toggle");
const globalNavList = document.querySelector("#global-nav-list");
let globalNavIsOpen = false;
globalNavToggle.addEventListener("click", function() {
    if (!globalNavIsOpen) {
        this.classList.add("global-nav__toggle--active");
        globalNavList.classList.add("global-nav__list-open");
        globalNavIsOpen = true;
    } else {
        this.classList.remove("global-nav__toggle--active");
        globalNavList.classList.remove("global-nav__list-open");
        globalNavIsOpen = false;
    }
});
/* End global navigation mobile toggle */