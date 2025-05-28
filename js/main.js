import Glide from '@glidejs/glide';
import '../css/styles.css';

const allSections = document.querySelectorAll('.section');
const navbarList = document.querySelector('.navbar__list');
const btnLearnMore = document.querySelector('.btn__learn-more');
const navHeight = 100;

const revealSection = (entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Revealing section
        entry.target.classList.add('revealed');

        // Get the href of the navbar link from the data-nav-link attribute
        const navLinkHref = entry.target.dataset.navLink;

        // Remove the active class from all navbar links
        const navLinks = document.querySelectorAll('.navbar__list a');
        navLinks.forEach(link => link.classList.remove('active'));

        // Select the navbar link
        const navLink = document.querySelector(`.navbar__list a[href="${navLinkHref}"]`);
        navLink.classList.add('active');
    });
}

document.querySelectorAll('.navbar__list a').forEach(link => {
    link.classList.remove('active');
});

const observerSections = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.4,
    rootMargin: `${navHeight}px`,
})

// Adjusting section visibility and overflow based on window width
function checkWindowSize() {
    allSections.forEach(section => {
        if (window.innerWidth < 912) {
            section.classList.add('revealed');
            document.documentElement.classList.add('overflow-hidden');
            document.body.classList.add('overflow-hidden');
        } else {
            observerSections.observe(section);
            section.classList.remove('revealed');
            document.documentElement.classList.remove('overflow-hidden');
            document.body.classList.remove('overflow-hidden');
        }
    });
}

checkWindowSize();
window.addEventListener('resize', checkWindowSize);

// Handling smooth scrolling
const handleSmoothScroll = (e, sectionSelector) => {
    e.preventDefault();
    const sectionId = document.querySelector(sectionSelector);
    const sectionCoords = sectionId.getBoundingClientRect();
    window.scrollTo({
        left: sectionCoords.left + window.pageXOffset,
        top: sectionCoords.top + window.pageYOffset,
        behavior: 'smooth'
    });
};

// Event Listener for navbar links
navbarList.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        const navLinkId = e.target.getAttribute('href').slice(1);
        handleSmoothScroll(e, `.section__${navLinkId}`);
    }
});

// Event Listener for "Learn more" button
btnLearnMore.addEventListener('click', function (e) {
    handleSmoothScroll(e, '.section__about-me');
});

// Handle redirects
function handleRedirect(elementClass, url) {
    document.querySelector(`.${elementClass}`).addEventListener('click', function () {
        window.open(url, '_blank');
    });
    document.querySelector(`.${elementClass}`).addEventListener('click', function (e) {
        e.stopPropagation();
    });
}


// Certificate redirects
handleRedirect('link__cert-ps', 'images/ps-cert.pdf');
handleRedirect('link__cert-ui', 'images/ui-cert.pdf');
handleRedirect('link__cert-ux', 'images/ux-cert.pdf');
handleRedirect('link__cert-indesign', 'images/indesign-cert.pdf');

// Social icon redirects
handleRedirect('social__fb', 'https://www.facebook.com/emanuil.kostadinov.9');
handleRedirect('social__x', 'https://x.com/emanuilko');
handleRedirect('social__linkedin', 'https://linkedin.com/in/emanuil-kostadinov-330bba135');

// Google reCaptcha
document.getElementById('submitBtn').addEventListener('click', function (e) {
    const response = grecaptcha.getResponse();
    if (response.length === 0) {
        e.preventDefault();
        document.getElementById('recaptchaWarning').style.display = 'block';
        document.getElementById('recaptchaBorder').classList.add('border-warning');
    } else {
        document.getElementById('recaptchaBorder').classList.remove('border-warning');
        document.getElementById('submitBtn').disabled = false;
    }
});

window.recaptchaCallback = function () {
    document.getElementById('recaptchaWarning').style.display = 'none';
    document.getElementById('recaptchaBorder').classList.remove('border-warning');
    document.getElementById('submitBtn').disabled = false;
}

new Glide('.glide', {
    type: 'carousel',
    perView: 3,
    focusAt: 'center',
    gap: 20,
    autoplay: 3000,
    hoverpause: true,
    breakpoints: {
        1024: {
            perView: 2,
        },
        600: {
            perView: 1,
        },
    },
}).mount();
