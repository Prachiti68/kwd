// dropdown menu ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Select the dropdown trigger and dropdown menu
const productsMenu = document.getElementById('contact');
const productsDropdown = document.getElementById('contactDropdown');

if (productsMenu && productsDropdown) {
    // Show dropdown on mouseenter
    productsMenu.addEventListener('mouseenter', function () {
        productsDropdown.classList.remove('hidden');
    });

    // Keep dropdown open when hovering over the dropdown itself
    productsDropdown.addEventListener('mouseenter', function () {
        productsDropdown.classList.remove('hidden');
    });

    // Hide dropdown when leaving the dropdown area
    productsDropdown.addEventListener('mouseleave', function () {
        productsDropdown.classList.add('hidden');
    });

    // Hide dropdown when leaving the menu item
    productsMenu.addEventListener('mouseleave', function () {
        productsDropdown.classList.add('hidden');
    });
}

// back to top button ------------------------------------------------------------------------
var mybutton = document.getElementById("scrollToTopBtn");

if (mybutton) {
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            mybutton.classList.add("show");
        } else {
            mybutton.classList.remove("show");
        }
    };

    mybutton.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

// Brochure download functionality ------------------------------------------------------------------------
const brochureButtons = document.querySelectorAll('.getBrochureLink');
const modalWindow = document.getElementById('formModal');
const closeButton = document.getElementById('closeModal');
const formSubmission = document.getElementById('brochureForm');

brochureButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        if (modalWindow) {
            modalWindow.classList.remove('hidden');
        }
    });
});

if (closeButton) {
    closeButton.addEventListener('click', () => {
        if (modalWindow) {
            modalWindow.classList.add('hidden');
        }
    });
}

if (formSubmission) {
    formSubmission.addEventListener('submit', (e) => {
        e.preventDefault();

        const userName = document.getElementById('name').value;
        const userEmail = document.getElementById('email').value;
        const userPhone = document.getElementById('phone').value;

        if (userName && userEmail && userPhone) {
            const brochureUrl = '/brocher link'; 

            alert("Brochure is being downloaded...");

            window.location.href = brochureUrl;

            if (modalWindow) {
                modalWindow.classList.add('hidden');
            }
        } else {
            alert("Please fill out all fields.");
        }
    });
}

// products carousel functionality -------------------------------------------------------------
const track = document.getElementById('carouselTrack');
const slides = Array.from(track.children);
const nextButton = document.getElementById('nextBtn');
const prevButton = document.getElementById('prevBtn');
let currentIndex = 0;

// Clone first 4 slides and append to end for infinite loop
const firstFourSlides = slides.slice(0, 4);
firstFourSlides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
});

function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 25}%)`;
}

nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
        track.style.transition = 'none';
        updateSlidePosition();
        setTimeout(() => {
            track.style.transition = 'transform 500ms ease-in-out';
        }, 10);
    } else {
        track.style.transition = 'transform 500ms ease-in-out';
        updateSlidePosition();
    }
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
        track.style.transition = 'none';
        updateSlidePosition();
        setTimeout(() => {
            track.style.transition = 'transform 500ms ease-in-out';
        }, 10);
    } else {
        track.style.transition = 'transform 500ms ease-in-out';
        updateSlidePosition();
    }
});

// Auto scroll
setInterval(() => {
    nextButton.click();
}, 5000);

// Hero section carousel functionality ----------------------------------------------------------
const heroTrack = document.getElementById('heroCarouselTrack');
const heroSlides = Array.from(heroTrack.children);
const heroNextBtn = document.getElementById('heroNextBtn');
const heroPrevBtn = document.getElementById('heroPrevBtn');
const heroDots = document.querySelectorAll('.hero-dot');

let heroCurrentIndex = 0;

function updateHeroSlide() {
    heroTrack.style.transform = `translateX(-${heroCurrentIndex * 100}%)`;
    heroDots.forEach(dot => dot.classList.remove('opacity-100'));
    heroDots[heroCurrentIndex].classList.add('opacity-100');
}

heroNextBtn.addEventListener('click', () => {
    heroCurrentIndex = (heroCurrentIndex + 1) % heroSlides.length;
    updateHeroSlide();
});

heroPrevBtn.addEventListener('click', () => {
    heroCurrentIndex = (heroCurrentIndex - 1 + heroSlides.length) % heroSlides.length;
    updateHeroSlide();
});

heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        heroCurrentIndex = index;
        updateHeroSlide();
    });
});

// Auto slide
setInterval(() => {
    heroNextBtn.click();
}, 5000);

// Initialize AOS -------------------------------------------------------------------
AOS.init();

// Counter animation logic ------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll("[data-counter]");

    const animateCounters = () => {
        counters.forEach((counter) => {
            const updateCount = () => {
                const target = +counter.getAttribute("data-counter");
                const current = +counter.textContent.replace(/[^0-9]/g, "");
                const increment = Math.ceil(target / 100);

                if (current < target) {
                    counter.textContent = current + increment + "+";
                    setTimeout(updateCount, 20);
                } else {
                    counter.textContent = target.toLocaleString() + "+";
                }
            };

            updateCount();
        });
    };

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.disconnect();
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
});


