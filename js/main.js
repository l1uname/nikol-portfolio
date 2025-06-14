import Glide from '@glidejs/glide';
import '../css/styles.css';

const allSections = document.querySelectorAll('.section');
const navbarList = document.querySelector('.navbar__list');
const btnLearnMore = document.querySelector('.btn__learn-more--wrapper');
const navHeight = 100;
const certsDesktopLayout = document.querySelector('.section__certifications--wrapper.desktop-layout');
const certsMobileLayout = document.querySelector('.glide-certifications.mobile-layout');
let glideCertifications = null;


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
});

glide.mount();

const leftArrowProjects = document.querySelector('.section__projects .glide__arrow--left');
const rightArrowProjects = document.querySelector('.section__projects .glide__arrow--right');

if (leftArrowProjects) {
    leftArrowProjects.addEventListener('click', function() {
        glide.go('<');
    });
}

if (rightArrowProjects) {
    rightArrowProjects.addEventListener('click', function() {
        glide.go('>');
    });
}


const projectBulletsContainer = document.querySelector('.section__projects .glide__bullets');
if (projectBulletsContainer) {
    const projectBullets = projectBulletsContainer.querySelectorAll('.glide__bullet');

    projectBullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => {
            glide.go(`=${index}`);
        });
    });

    glide.on('run', () => {
        const currentIndex = glide.index;
        projectBullets.forEach((bullet, index) => {
            if (index === currentIndex) {
                bullet.classList.add('glide__bullet--active');
            } else {
                bullet.classList.remove('glide__bullet--active');
            }
        });
    });

    if (projectBullets[glide.index]) {
        projectBullets[glide.index].classList.add('glide__bullet--active');
    }
}


const revealSection = (entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const navLinkHref = entry.target.dataset.navLink;
        const navLinks = document.querySelectorAll('.navbar__list a');
        navLinks.forEach(link => link.classList.remove('active'));

        const navLink = document.querySelector(`.navbar__list a[href="${navLinkHref}"]`);
        navLink.classList.add('active');
    });
};

document.querySelectorAll('.navbar__list a').forEach(link => {
    link.classList.remove('active');
});

const observerSections = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.4,
    rootMargin: `${navHeight}px`,
});

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

const handleSmoothScroll = (e, sectionSelector) => {
    e.preventDefault();
    const section = document.querySelector(sectionSelector);
    const top = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top, left: 0, behavior: 'smooth' });
};

navbarList.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        const navLinkId = e.target.getAttribute('href').slice(1);
        handleSmoothScroll(e, `.section__${navLinkId}`);
    }
});

btnLearnMore.addEventListener('click', function (e) {
    handleSmoothScroll(e, '.section__projects');
});

function handleRedirect(elementClass, url) {
    document.querySelector(`${elementClass}`).addEventListener('click', function () {
        window.open(url, '_blank');
    });
    document.querySelector(`${elementClass}`).addEventListener('click', function (e) {
        e.stopPropagation();
    });
}

handleRedirect('.social__fb', 'https://www.facebook.com/nikol.marinova');
handleRedirect('.social__linkedin', 'https://www.linkedin.com/in/nikol-kostadinova-7400a7317/');

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
};


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

function handleCertificationsGlide() {
    const minWidthForDesktop = 900;

    if (window.innerWidth < minWidthForDesktop) {
        if (!glideCertifications) {
            glideCertifications = new Glide(certsMobileLayout, {
                type: 'carousel',
                perView: 1,
                gap: 20,
                autoplay: 0,
                hoverpause: true,
            });
            glideCertifications.mount();

            // --- Certifications Slider Manual Arrow Controls ---
            const leftArrowCerts = certsMobileLayout.querySelector('.glide__arrow--left');
            const rightArrowCerts = certsMobileLayout.querySelector('.glide__arrow--right');

            if (leftArrowCerts) {
                leftArrowCerts.addEventListener('click', function() {
                    glideCertifications.go('<');
                });
            }

            if (rightArrowCerts) {
                rightArrowCerts.addEventListener('click', function() {
                    glideCertifications.go('>');
                });
            }

            // --- Certifications Slider Manual Bullet Controls and Active State ---
            const certBulletsContainer = certsMobileLayout.querySelector('.glide__bullets');
            if (certBulletsContainer) {
                const certBullets = certBulletsContainer.querySelectorAll('.glide__bullet');

                // Add click listeners to bullets
                certBullets.forEach((bullet, index) => {
                    bullet.addEventListener('click', () => {
                        glideCertifications.go(`=${index}`);
                    });
                });

                // Add a listener to update active bullet on slide change
                glideCertifications.on('run', () => {
                    const currentIndex = glideCertifications.index;
                    certBullets.forEach((bullet, index) => {
                        if (index === currentIndex) {
                            bullet.classList.add('glide__bullet--active');
                        } else {
                            bullet.classList.remove('glide__bullet--active');
                        }
                    });
                });

                // Initialize active bullet on load
                if (certBullets[glideCertifications.index]) {
                    certBullets[glideCertifications.index].classList.add('glide__bullet--active');
                }
            }

            certsMobileLayout.querySelector('.glide__slides').addEventListener('click', function (e) {
                const target = e.target.closest('.certificates');
                if (!target) return;

                if (target.classList.contains('link__cert-ps')) {
                    window.open('images/ps-cert.pdf', '_blank');
                } else if (target.classList.contains('link__cert-ui')) {
                    window.open('images/ui-cert.pdf', '_blank');
                } else if (target.classList.contains('link__cert-ux')) {
                    window.open('images/ux-cert.pdf', '_blank');
                } else if (target.classList.contains('link__cert-indesign')) {
                    window.open('images/indesign-cert.pdf', '_blank');
                }
            });
        }
        certsDesktopLayout.style.display = 'none';
        certsMobileLayout.style.display = 'block';
    } else {
        if (glideCertifications) {
            glideCertifications.destroy();
            glideCertifications = null;
        }
        certsMobileLayout.style.display = 'none';
        certsDesktopLayout.style.display = 'flex';
    }
}

handleCertificationsGlide();
window.addEventListener('resize', handleCertificationsGlide);

const psCert = document.querySelector('.link__cert-ps');
const uiCert = document.querySelector('.link__cert-ui');
const uxCert = document.querySelector('.link__cert-ux');
const inDesignCert = document.querySelector('.link__cert-indesign');

if (psCert) {
    psCert.addEventListener('click', function (e) {
        window.open('images/ps-cert.pdf', '_blank');
    });
}
if (uiCert) {
    uiCert.addEventListener('click', function (e) {
        window.open('images/ui-cert.pdf', '_blank');
    });
}
if (uxCert) {
    uxCert.addEventListener('click', function (e) {
        window.open('images/ux-cert.pdf', '_blank');
    });
}
if (inDesignCert) {
    inDesignCert.addEventListener('click', function (e) {
        window.open('images/indesign-cert.pdf', '_blank');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.navbar__list');
    const navLinks = document.querySelectorAll('.navbar__list a');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';

            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.classList.toggle('menu-open');

            hamburger.setAttribute('aria-expanded', String(!isExpanded));
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (navList.classList.contains('active') &&
                !navList.contains(event.target) &&
                !hamburger.contains(event.target)) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollBarWidth}px`);
    }
});
