const themes = [
    {
        name: "fancy",
        color: "#faf9f6"
    },
    {
        name: "legacy",
        color: "#ffb000"
    },
    {
        name: "professional",
        color: "#859F3D"
    }
];

// Get all global navigation elements
const globalNavigationItemElements = document.querySelectorAll(".global-nav__list li > a");
if (globalNavigationItemElements.length) {
    scrollToAnchor(globalNavigationItemElements);
    closeGlobalNavigationOnMobile(globalNavigationItemElements);
}

// Get all "skip to" link elements
const skipToElements = document.querySelectorAll(".skip-to");
if (skipToElements.length) {
    scrollToAnchor(skipToElements);
}

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

/* Begin settings modal */
const btnSettings = document.querySelector("#btn-settings");
const modalSettings = document.querySelector("#modal-settings");
const btnModalClose = document.querySelector("#btn-modal-close");
const btnModalCancel = document.querySelector("#btn-modal-cancel");
const btnModalSettingsSave = document.querySelector("#btn-modal-settings-save");
const themeStyleSheet = document.querySelector("#theme-style");
const themeOptions = document.getElementsByName("theme");
let modalSettingsOpen = false;
let defaultTheme = "legacy";

function closeModal() {
    modalSettings.classList.replace('modal--opened','modal--closed');
    modalSettings.setAttribute('aria-modal',false);
    modalSettingsOpen = false;
}

function openModal() {
    modalSettings.classList.replace('modal--closed','modal--opened');
    modalSettings.setAttribute('aria-modal',true);
    modalSettingsOpen = true;
}

function getNewStyleSheetPath(theme) {
    return './assets/css/theme-' + theme + '/style.css';
}

function updateTheme() {
    themeOptions.forEach(r => {
        if (r.checked) {
            themeStyleSheet.setAttribute('href', getNewStyleSheetPath(r.value));
            localStorage.setItem('theme', r.value);
            defaultTheme = r.value;
            updateThemeColor(defaultTheme);
        }
    });
    closeModal();
}

function updateThemeColor(theme) {
    var themeColorLightEl = document.getElementById('theme-color-light');
    themes.forEach(t => {
        if (t.name === theme) {
            themeColorLightEl.setAttribute('content',t.color);
        }
    });
}

// Modal event listeners
btnSettings.addEventListener("click", openModal);
btnModalClose.addEventListener("click", closeModal);
btnModalCancel.addEventListener("click", closeModal);
btnModalSettingsSave.addEventListener("click", updateTheme);

// Update theme option style on select
themeOptions.forEach(option => {
    option.addEventListener("click", function(e) {
        // Remove active state on all options
        themeOptions.forEach(o => {
            o.parentElement.classList.remove('settings-panel__list-label--active');
        });
        // Set active state on selected item
        e.target.parentElement.classList.add('settings-panel__list-label--active');
    });
});

// Close modal window on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modalSettingsOpen) {
        closeModal();
    }
});

(function() {
    // Get theme from localStorage if exists
    let localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme !== null) {
        // Fix for users who have default theme set in localStorage
        if (localStorageTheme === 'default') {
            localStorageTheme = 'legacy';
        }
        themeStyleSheet.setAttribute('href', getNewStyleSheetPath(localStorageTheme));
        defaultTheme = localStorageTheme;
        updateThemeColor(defaultTheme);
    }
    // Set checked theme in settings modal on document ready
    themeOptions.forEach(opt => {
        if (opt.value === defaultTheme) {
            opt.checked = true;
            opt.parentElement.classList.add('settings-panel__list-label--active');
        } else {
            opt.checked = false;
            opt.parentElement.classList.remove('settings-panel__list-label--active');
        }
    });
})();
/* End settings modal */

/* Begin video player */
const videoContainer = document.querySelector('.video-container');
const videoPoster = document.querySelector('.video-poster');
const youtubePlayer = document.querySelector('.youtube-player');

function handleIntroductionVideo(e) {
    e.preventDefault();
    const youtubeVideoId = 'zAaSyuN9K7w';
    const iframeSrc = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', iframeSrc);
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    videoContainer.classList.add('video-playing');
    youtubePlayer.appendChild(iframe);
    youtubePlayer.style.opacity = 1; // Make the iframe visible
    videoPoster.style.display = 'none'; // Hide the poster image
}

videoPoster.addEventListener('click', handleIntroductionVideo);
/* End video player */