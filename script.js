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

//hAMBURGER MENU --------------------------------------------------------------------------
// Select the hamburger menu button and mobile menu elements
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

// Add an event listener to the hamburger menu button
mobileMenuButton.addEventListener('click', () => {
  // Toggle the 'hidden' class on the mobile menu
  mobileMenu.classList.toggle('hidden');

  // Add a smooth transition for better UX
  if (!mobileMenu.classList.contains('hidden')) {
    mobileMenu.style.transition = 'all 0.3s ease-in-out';
    mobileMenu.style.opacity = '1';
  } else {
    mobileMenu.style.opacity = '0';
  }
});

// Optional: Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
  if (
    !mobileMenu.contains(event.target) && // If the click is not inside the menu
    !mobileMenuButton.contains(event.target) // And not on the hamburger button
  ) {
    mobileMenu.classList.add('hidden'); // Hide the menu
  }
});

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
document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let slides = [...track.children];
    let slideWidth = slides[0].offsetWidth;
    let isDragging = false, startX, currentTranslate, prevTranslate;
    let currentIndex = slides.length;

    // Duplicate slides for seamless infinite scrolling
    function duplicateSlides() {
      slides.forEach(slide => {
        let clone = slide.cloneNode(true);
        track.appendChild(clone);
      });
      slides.forEach(slide => {
        let clone = slide.cloneNode(true);
        track.insertBefore(clone, track.firstChild);
      });
    }

    duplicateSlides();

    // Position track to show original slides first
    track.style.transform = `translateX(-${slideWidth * slides.length}px)`;

    function moveToSlide(index) {
      track.style.transition = "transform 0.5s ease-in-out";
      currentTranslate = -index * slideWidth;
      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function handleTransitionEnd() {
      if (currentIndex === 0) {
        track.style.transition = "none";
        currentIndex = slides.length;
        track.style.transform = `translateX(-${slideWidth * slides.length}px)`;
      } else if (currentIndex === slides.length * 2) {
        track.style.transition = "none";
        currentIndex = slides.length;
        track.style.transform = `translateX(-${slideWidth * slides.length}px)`;
      }
    }

    track.addEventListener("transitionend", handleTransitionEnd);

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        moveToSlide(currentIndex);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex < slides.length * 2) {
        currentIndex++;
        moveToSlide(currentIndex);
      }
    });

    // Drag functionality
    function dragStart(e) {
      isDragging = true;
      startX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      prevTranslate = currentTranslate;
      track.style.transition = "none";
    }

    function dragMove(e) {
      if (!isDragging) return;
      const currentPosition = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
      currentTranslate = prevTranslate + (currentPosition - startX);
      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function dragEnd() {
      isDragging = false;
      const movedBy = currentTranslate - prevTranslate;

      if (movedBy < -50) {
        currentIndex++;
      } else if (movedBy > 50) {
        currentIndex--;
      }

      moveToSlide(currentIndex);
    }

    // Add event listeners for drag support
    track.addEventListener("mousedown", dragStart);
    track.addEventListener("mousemove", dragMove);
    track.addEventListener("mouseup", dragEnd);
    track.addEventListener("mouseleave", dragEnd);

    track.addEventListener("touchstart", dragStart);
    track.addEventListener("touchmove", dragMove);
    track.addEventListener("touchend", dragEnd);

    // Handle window resize
    window.addEventListener("resize", () => {
      slideWidth = track.children[0].offsetWidth;
      moveToSlide(currentIndex);
    });

    moveToSlide(currentIndex);
  });

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
AOS.init({
    duration: 1000,  // Animation duration in milliseconds (default is 400)
    easing: 'ease-in-out',  // Easing function for smoothness
    delay: 300,  // Delay before the animation starts
    once: true,  // Animation happens only once while scrolling
    mirror: false  // Whether elements should animate when scrolling past them again
  });

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
                    setTimeout(updateCount, 40);
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


// Clintele scroll --------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('logoSlider');
    const firstGroup = slider.children[0];
    let position = 0;
    const speed = 1; // Adjust speed as needed
    
    function animate() {
        position -= speed;
        
        // When first group is fully scrolled, reset position
        if (-position >= firstGroup.offsetWidth) {
            position = 0;
        }
        
        // Apply transform with hardware acceleration
        slider.style.transform = `translate3d(${position}px, 0, 0)`;
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
});