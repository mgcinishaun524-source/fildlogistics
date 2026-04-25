// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuClose = document.querySelector(".mobile-menu-close");
const menuOverlay = document.getElementById("menuOverlay");
const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");
const heroSlides = document.querySelectorAll(".hero-bg-slide");

function openMobileMenu() {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (menuToggle && mobileMenu) {
    // Open menu
    menuToggle.addEventListener("click", openMobileMenu);
    
    // Close menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener("click", closeMobileMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMobileMenu);
    }
    
    // Close menu when clicking on mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });
    
    // Close menu on escape key
    document.addEventListener("keydown", function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

const revealItems = document.querySelectorAll("[data-animate]");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll("[data-counter]");
const numberFormatter = new Intl.NumberFormat("en-US");

const animateCounter = (counterEl) => {
  const target = Number(counterEl.dataset.counter);
  const duration = 1700;
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    counterEl.textContent = numberFormatter.format(value);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      counterEl.textContent = numberFormatter.format(target);
    }
  };

  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

if (heroSlides.length > 1) {
  let slideIndex = 0;
  setInterval(() => {
    heroSlides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % heroSlides.length;
    heroSlides[slideIndex].classList.add("active");
  }, 4200);
}

const setMouseGlow = (event) => {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  target.style.setProperty("--mx", `${x}%`);
  target.style.setProperty("--my", `${y}%`);
};

document.querySelectorAll(".btn, .main-nav a").forEach((item) => {
  item.addEventListener("mousemove", setMouseGlow);
});

if (hero && heroContent) {
  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroContent.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
  });

  hero.addEventListener("mouseleave", () => {
    heroContent.style.transform = "translate3d(0, 0, 0)";
  });
}

const tiltCards = document.querySelectorAll(".hero-service-card");
tiltCards.forEach((card) => {
  card.classList.add("js-tilt");
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${y * -7}deg) rotateY(${x * 7}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Blog Filter Functionality
const filterTabs = document.querySelectorAll(".filter-tab");
const articleCards = document.querySelectorAll(".article-card");
const featuredArticle = document.querySelector(".featured-article");

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    filterTabs.forEach((t) => t.classList.remove("active"));
    // Add active class to clicked tab
    tab.classList.add("active");
    
    const filter = tab.dataset.filter;
    
    // Filter article cards
    articleCards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === "all" || category === filter) {
        card.style.display = "block";
        // Re-trigger animation
        card.style.opacity = "0";
        card.style.transform = "translateY(24px)";
        setTimeout(() => {
          card.style.opacity = "";
          card.style.transform = "";
        }, 100);
      } else {
        card.style.display = "none";
      }
    });
    
    // Filter featured article
    if (featuredArticle) {
      const featuredCategory = featuredArticle.dataset.category;
      if (filter === "all" || featuredCategory === filter) {
        featuredArticle.style.display = "block";
      } else {
        featuredArticle.style.display = "none";
      }
    }
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector(".newsletter-form-blog");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
      // Create success message
      const successMsg = document.createElement("div");
      successMsg.textContent = "Thank you for subscribing!";
      successMsg.style.cssText = `
        color: #4ade80;
        font-weight: 600;
        margin-top: 1rem;
        animation: fadeIn 0.5s ease;
      `;
      
      // Clear form and show message
      e.target.reset();
      e.target.appendChild(successMsg);
      
      // Remove message after 3 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
    }
  });
}

// Quote form freight button functionality
const freightButtons = document.querySelectorAll('.freight-option.freight-button');
freightButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active state from all buttons
    freightButtons.forEach(btn => {
      btn.style.background = 'rgba(255, 255, 255, 0.08)';
      btn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      btn.style.color = '#94a3b8';
    });
    
    // Add active state to clicked button
    button.style.background = '#ff6b35';
    button.style.borderColor = '#ff6b35';
    button.style.color = '#ffffff';
  });
});

// Set initial state for checked radio
const checkedFreight = document.querySelector('.freight-option.freight-button input:checked');
if (checkedFreight) {
  checkedFreight.parentElement.style.background = '#ff6b35';
  checkedFreight.parentElement.style.borderColor = '#ff6b35';
  checkedFreight.parentElement.style.color = '#ffffff';
}

// Quote form submission
const quoteForm = document.querySelector('.quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Create success message
    const successMsg = document.createElement("div");
    successMsg.textContent = "Quote request submitted successfully!";
    successMsg.style.cssText = `
      color: #4ade80;
      font-weight: 600;
      text-align: center;
      margin-top: 1rem;
      animation: fadeIn 0.5s ease;
    `;
    
    // Clear form and show message
    e.target.reset();
    e.target.appendChild(successMsg);
    
    // Reset freight buttons
    freightButtons.forEach(btn => {
      btn.style.background = 'rgba(255, 255, 255, 0.08)';
      btn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      btn.style.color = '#94a3b8';
    });
    
    // Set first button as active
    freightButtons[0].style.background = '#ff6b35';
    freightButtons[0].style.borderColor = '#ff6b35';
    freightButtons[0].style.color = '#ffffff';
    
    // Remove message after 3 seconds
    setTimeout(() => {
      successMsg.remove();
    }, 3000);
  });
}

// Premium Quote Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Option button functionality
  const optionButtons = document.querySelectorAll('.option-btn');
  
  optionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const optionType = this.dataset.option;
      const optionValue = this.dataset.value;
      
      // Remove active class from all buttons of the same type
      document.querySelectorAll(`[data-option="${optionType}"]`).forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
    });
  });

  // Form submission
  const quoteCard = document.querySelector('.quote-card');
  const ctaButton = document.querySelector('.cta-button');
  
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.querySelector('input[placeholder="Name"]').value;
      const email = document.querySelector('input[placeholder="Email"]').value;
      const phone = document.querySelector('input[placeholder="Phone"]').value;
      const distance = document.querySelector('input[placeholder="Distance"]').value;
      const weight = document.querySelector('input[placeholder="Weight"]').value;
      
      // Validate required fields
      if (!name || !email || !phone) {
        // Show error message
        showError('Please fill in all required fields (Name, Email, Phone)');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return;
      }
      
      // Show success message
      showSuccess('Quote request submitted successfully! We will contact you soon.');
      
      // Reset form after delay
      setTimeout(() => {
        quoteCard.querySelectorAll('.form-input').forEach(input => {
          input.value = '';
        });
        
        // Reset buttons to default state
        document.querySelectorAll('.option-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        document.querySelector('[data-value="normal"]').classList.add('active');
      }, 2000);
    });
  }
  
  function showError(message) {
    removeExistingMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ef4444;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      animation: fadeIn 0.3s ease;
    `;
    
    ctaButton.parentNode.insertBefore(errorDiv, ctaButton);
    
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }
  
  function showSuccess(message) {
    removeExistingMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-message success';
    successDiv.textContent = message;
    successDiv.style.cssText = `
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #22c55e;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      animation: fadeIn 0.3s ease;
    `;
    
    ctaButton.parentNode.insertBefore(successDiv, ctaButton);
    
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }
  
  function removeExistingMessages() {
    const existingMessages = quoteCard.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
  }
});

// Add fade-in animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
