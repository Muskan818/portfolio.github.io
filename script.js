// script.js - Week 02 Portfolio JavaScript Features

// ============================================
// 1. Animated Skill Progress Bars (on scroll)
// ============================================
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const progress = progressBar.getAttribute('data-progress');
        progressBar.style.width = progress + '%';
        progressBar.classList.add('animated');
        observer.unobserve(progressBar);
      }
    });
  }, observerOptions);

  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}

// ============================================
// 2. Contact Form Validation + localStorage
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
      nameError.textContent = 'Name is required';
      nameInput.classList.add('error');
      return false;
    }
    nameError.textContent = '';
    nameInput.classList.remove('error');
    return true;
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    if (email === '') {
      emailError.textContent = 'Email is required';
      emailInput.classList.add('error');
      return false;
    }
    if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email address';
      emailInput.classList.add('error');
      return false;
    }
    emailError.textContent = '';
    emailInput.classList.remove('error');
    return true;
  }

  function validateMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
      messageError.textContent = 'Message is required';
      messageInput.classList.add('error');
      return false;
    }
    if (message.length < 10) {
      messageError.textContent = 'Message must be at least 10 characters';
      messageInput.classList.add('error');
      return false;
    }
    messageError.textContent = '';
    messageInput.classList.remove('error');
    return true;
  }

  // Real-time validation
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  messageInput.addEventListener('blur', validateMessage);

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      // Save to localStorage
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      localStorage.setItem('contactFormData', JSON.stringify(formData));

      // Redirect to form-details.html
      window.location.href = 'form-details.html';
    }
  });
}

// ============================================
// 3. Open Portfolio Projects (JavaScript)
// ============================================
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('click', () => {
      const projectUrl = card.getAttribute('data-project-url');
      if (projectUrl) {
        window.open(projectUrl, '_blank', 'noopener,noreferrer');
      }
    });

    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectUrl = card.getAttribute('data-project-url');
        if (projectUrl) {
          window.open(projectUrl, '_blank', 'noopener,noreferrer');
        }
      }
    });
  });
}

// ============================================
// 4. Canvas Drawing
// ============================================
function initCanvas() {
  const canvas = document.getElementById('myCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Draw a simple design
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw some shapes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  ctx.arc(100, 100, 40, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.arc(200, 100, 50, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.arc(300, 100, 60, 0, Math.PI * 2);
  ctx.fill();

  // Draw text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('Portfolio Canvas', canvas.width / 2, 170);
}

// ============================================
// 5. Image Slider
// ============================================
function initImageSlider() {
  const sliderTrack = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const sliderDots = document.getElementById('sliderDots');
  
  if (!sliderTrack) return;

  const slides = sliderTrack.querySelectorAll('.slide');
  let currentSlide = 0;
  const totalSlides = slides.length;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
  });

  function updateSlider() {
    const offset = -currentSlide * 100;
    sliderTrack.style.transform = `translateX(${offset}%)`;

    // Update dots
    const dots = sliderDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Auto-play (optional)
  // setInterval(nextSlide, 5000);
}

// ============================================
// 6. Dark/Light Mode Toggle
// ============================================
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      themeIcon.textContent = '☀️';
    } else {
      localStorage.setItem('theme', 'light');
      themeIcon.textContent = '🌙';
    }
  });
}

// ============================================
// 7. Back to Top Button
// ============================================
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// Initialize all features when DOM is ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initProgressBars();
  initContactForm();
  initProjectCards();
  initCanvas();
  initImageSlider();
  initThemeToggle();
  initBackToTop();
});

