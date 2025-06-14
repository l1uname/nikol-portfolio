import Glide from '@glidejs/glide';
import '../css/styles.css';

const allSections = document.querySelectorAll('.section');
const navbarList = document.querySelector('.navbar__list');
const btnLearnMore = document.querySelector('.btn__learn-more--wrapper');
const navHeight = 100;

const revealSection = (entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

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

// Handling smooth scrolling
const handleSmoothScroll = (e, sectionSelector) => {
    e.preventDefault();
    const section = document.querySelector(sectionSelector);
    const top = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top, left: 0, behavior: 'smooth' });
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
    handleSmoothScroll(e, '.section__projects');
});

// Handle redirects
function handleRedirect(elementClass, url) {
    document.querySelector(`${elementClass}`).addEventListener('click', function () {
        window.open(url, '_blank');
    });
    document.querySelector(`${elementClass}`).addEventListener('click', function (e) {
        e.stopPropagation();
    });
}


// Certificate redirects
handleRedirect('.link__cert-ps', 'images/ps-cert.pdf');
handleRedirect('.link__cert-ui', 'images/ui-cert.pdf');
handleRedirect('.link__cert-ux', 'images/ux-cert.pdf');
handleRedirect('.link__cert-indesign', 'images/indesign-cert.pdf');

// Social icon redirects
handleRedirect('.social__fb', 'https://www.facebook.com/nikol.marinova');
handleRedirect('.social__linkedin', 'https://www.linkedin.com/in/nikol-kostadinova-7400a7317/');

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

const glide = new Glide('.glide', {
    type: 'carousel',
    perView: 3,
    focusAt: 'center',
    gap: 30,
    autoplay: 0,
    hoverpause: true,
    breakpoints: {
        1024: {
            perView: 2,
        },
        600: {
            perView: 1,
        },
    },
})

glide.mount();

document.querySelector('.glide__slides').addEventListener('click', function (e) {
    const classList = e.target.classList;

    switch (true) {
        case classList.contains('figma-mood-board'):
            window.open('https://www.figma.com/design/yhxr6IvVPmfLYAcYxtcDl0/Untitled?node-id=0-1&t=HSgixq9fCVNsThqy-1', '_blank');
            break;
        case classList.contains('figma-project'):
            window.open('https://www.figma.com/design/LoKproPtwO0NLIaPvfzFxp/UI-Exam-2025?node-id=21-133&p=f&t=zeCV8E8Hk5zr45e6-0', '_blank');
            break;
        case classList.contains('project-image--1'):
            window.open('images/project1.jpg', '_blank');
            break;
        case classList.contains('project-image--2'):
            window.open('images/project2.png', '_blank');
            break;
        case classList.contains('project-image--3'):
            window.open('images/project3.jpg', '_blank');
            break;
        case classList.contains('project-image--4'):
            window.open('images/project4.jpg', '_blank');
            break;
    }
});

