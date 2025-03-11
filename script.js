  //header script--------------------------------------------------------------------------------
  document.addEventListener("DOMContentLoaded", function () {
    // Active page highlighting
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll("nav a").forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("font-bold");
      }
    });
  
    // Dropdown functionality
    const productMenu = document.getElementById("contact");
    const dropdown = document.getElementById("contactDropdown");
  
    productMenu.addEventListener("mouseenter", () => {
      dropdown.classList.remove("hidden");
    });
  
    productMenu.addEventListener("mouseleave", () => {
      dropdown.classList.add("hidden");
    });
  
    dropdown.addEventListener("mouseenter", () => {
      dropdown.classList.remove("hidden");
    });
  
    dropdown.addEventListener("mouseleave", () => {
      dropdown.classList.add("hidden");
    });
  
    // Close dropdown when clicking anywhere outside the dropdown's width
    document.addEventListener("click", (event) => {
      const dropdownRect = dropdown.getBoundingClientRect();
      if (
        !productMenu.contains(event.target) &&
        !dropdown.contains(event.target) &&
        (event.clientX < dropdownRect.left || event.clientX > dropdownRect.right || event.clientY < dropdownRect.top || event.clientY > dropdownRect.bottom)
      ) {
        dropdown.classList.add("hidden");
      }
    });
  
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileMenu = document.getElementById("mobileMenu");
  
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
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

// products carousel functionality ----------------------------------------------------------------------------
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



// Initialize AOS -------------------------------------------------------------------

AOS.init({
  offset: 20, // Start animation at 5% of viewport
  duration: 1000, // Animation duration in milliseconds
  once: false, // Ensures animations happen only once
  easing: 'ease-in-out',
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


//product pages scroller 
document.addEventListener("DOMContentLoaded", function() {
  const scroller = document.getElementById('scroller');
  if (scroller) {
    let scrollSpeed = 2; // Adjust the speed as needed
    scroller.innerHTML += scroller.innerHTML; // Duplicate content for seamless scrolling

    // Use setInterval to move the scroller continuously
    setInterval(() => {
      scroller.scrollLeft += scrollSpeed;

      // Reset the scroll position to create an infinite loop
      if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
        scroller.scrollLeft = 0;
      }
    }, 20); 

    // Optional: Pause scrolling on hover
    scroller.addEventListener('mouseenter', () => {
      scrollSpeed = 0;
    });

    scroller.addEventListener('mouseleave', () => {
      scrollSpeed = 2; // Resume scrolling when the mouse leaves
    });
  } 
});