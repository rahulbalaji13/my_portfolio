// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const navbar = document.querySelector('.navbar');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(26, 35, 126, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(26, 35, 126, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');

const highlightNavLink = () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
};

// Throttled scroll event for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(highlightNavLink, 10);
});

// Contact Form Validation and Submission
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const showError = (fieldId, message) => {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const field = document.getElementById(fieldId);
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    field.style.borderColor = '#ff5252';
};

const clearError = (fieldId) => {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const field = document.getElementById(fieldId);
    
    errorElement.style.display = 'none';
    field.style.borderColor = 'rgba(255, 255, 255, 0.3)';
};

const clearAllErrors = () => {
    ['name', 'email', 'message'].forEach(clearError);
};

const validateForm = (formData) => {
    let isValid = true;
    clearAllErrors();
    
    // Validate name
    if (!formData.name.trim()) {
        showError('name', 'Name is required');
        isValid = false;
    } else if (formData.name.trim().length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (!formData.email.trim()) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(formData.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!formData.message.trim()) {
        showError('message', 'Message is required');
        isValid = false;
    } else if (formData.message.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
};

const showSuccessMessage = () => {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('hidden');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000);
};

const simulateFormSubmission = async () => {
    // Simulate API call delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 2000);
    });
};

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    if (!validateForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoader = submitButton.querySelector('.btn-loader');
    
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    submitButton.disabled = true;
    
    try {
        // Simulate form submission
        await simulateFormSubmission();
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        clearAllErrors();
        
        console.log('Form submitted successfully:', formData);
        
    } catch (error) {
        console.error('Form submission error:', error);
        // Handle error (could show error message to user)
    } finally {
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        submitButton.disabled = false;
    }
});

// Real-time validation
['name', 'email', 'message'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    field.addEventListener('blur', () => {
        const value = field.value.trim();
        
        if (fieldId === 'name' && value && value.length < 2) {
            showError(fieldId, 'Name must be at least 2 characters');
        } else if (fieldId === 'email' && value && !validateEmail(value)) {
            showError(fieldId, 'Please enter a valid email address');
        } else if (fieldId === 'message' && value && value.length < 10) {
            showError(fieldId, 'Message must be at least 10 characters');
        } else if (value) {
            clearError(fieldId);
        }
    });
    
    field.addEventListener('input', () => {
        if (field.value.trim()) {
            clearError(fieldId);
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add scroll animation to elements
const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        '.skill-card, .experience-card, .cert-card, .timeline-item, .highlight-item'
    );
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
};

// Orbital animation pause/resume on hover
const orbitIcons = document.querySelectorAll('.orbit-icon');

orbitIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.animationPlayState = 'paused';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.animationPlayState = 'running';
    });
});

// Parallax effect for floating shapes
const floatingShapes = document.querySelectorAll('.shape');

const parallaxEffect = () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    floatingShapes.forEach((shape, index) => {
        const speed = parallaxSpeed * (index + 1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
};

// Throttled parallax scroll
let parallaxTimeout;
window.addEventListener('scroll', () => {
    if (parallaxTimeout) {
        clearTimeout(parallaxTimeout);
    }
    parallaxTimeout = setTimeout(parallaxEffect, 10);
});

// Typing effect for hero title
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';
    
    const typing = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    };
    
    typing();
};

// Enhanced scroll to top functionality
const createScrollToTop = () => {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #7c4dff, #3f51b5);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(124, 77, 255, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
};

// Initialize cursor effect
const createCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(124, 77, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Enhance cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .orbit-icon, .skill-card, .cert-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
};

// Preloader
const createPreloader = () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1a237e;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="width: 50px; height: 50px; border: 3px solid rgba(124, 77, 255, 0.3); border-top: 3px solid #7c4dff; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <h3>Loading Portfolio...</h3>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create preloader
    createPreloader();
    
    // Initialize scroll animations
    setTimeout(() => {
        animateOnScroll();
    }, 100);
    
    // Create scroll to top button
    createScrollToTop();
    
    // Create custom cursor effect (only on desktop)
    if (window.innerWidth > 768) {
        createCursorEffect();
    }
    
    // Add loading class to body to prevent FOUC
    document.body.classList.add('loaded');
    
    // Initialize active nav link
    highlightNavLink();
    
    console.log('Portfolio website initialized successfully!');
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
        // Re-initialize cursor effect if needed
        const existingCursor = document.querySelector('.custom-cursor');
        if (window.innerWidth > 768 && !existingCursor) {
            createCursorEffect();
        } else if (window.innerWidth <= 768 && existingCursor) {
            existingCursor.remove();
        }
    }, 250);
});

// Add smooth transitions to all elements
const addGlobalTransitions = () => {
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        }
        
        .nav-link.active {
            color: #7c4dff !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        .loaded {
            visibility: visible;
        }
    `;
    document.head.appendChild(style);
};

// Initialize global transitions
addGlobalTransitions();

// Export functions for potential external use
window.portfolioApp = {
    highlightNavLink,
    validateForm,
    showSuccessMessage,
    typeWriter
};