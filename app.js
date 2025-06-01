// Enhanced Portfolio JavaScript - Rahul Balaji

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollAnimations();
    initNavbarEffects();
    initSmoothScrolling();
    initMobileMenu();
    initParallaxEffects();
    initContactInteractions();
    initContactForm();
    initEnhancedAnimations();
    initFloatingShapes();
    initTechBadges();
    initProfileImageEffects();
    
    // Ensure all content is visible immediately
    ensureContentVisibility();
});

// Ensure all content is properly displayed
function ensureContentVisibility() {
    // Make sure all certification cards are visible
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.visibility = 'visible';
        card.style.display = 'block';
    });
    
    // Make sure all other cards are visible
    const allCards = document.querySelectorAll('.skill-card, .experience-card, .education-item, .speaking-card, .language-item');
    allCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.visibility = 'visible';
    });
    
    // Remove any fade-in classes that might be hiding content
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });

    // Ensure profile image is visible
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.opacity = '1';
        profileImage.style.visibility = 'visible';
        profileImage.style.display = 'block';
    }

    // Ensure tech badges are visible
    const techBadges = document.querySelectorAll('.tech-badge');
    techBadges.forEach(badge => {
        badge.style.opacity = '1';
        badge.style.visibility = 'visible';
        badge.style.display = 'flex';
    });
}

// Initialize Profile Image Effects
function initProfileImageEffects() {
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        // Add error handling for image loading
        profileImage.addEventListener('error', function() {
            console.log('Profile image failed to load, trying alternative...');
            // Try alternative avatar service
            this.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=b6e3f4&clothesColor=2563eb';
        });

        profileImage.addEventListener('load', function() {
            console.log('Profile image loaded successfully');
            this.style.opacity = '1';
        });

        // Add parallax effect to profile image
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1;
            
            if (profileImage) {
                profileImage.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
            }
        }, 16));

        // Add mouse interaction
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.filter = 'brightness(1.1) contrast(1.1)';
        });

        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.filter = 'brightness(1) contrast(1)';
        });
    }
}

// Initialize Tech Badges Interactions
function initTechBadges() {
    const techBadges = document.querySelectorAll('.tech-badge');
    
    techBadges.forEach((badge, index) => {
        // Add hover tooltip effect
        badge.addEventListener('mouseenter', function() {
            const techName = this.getAttribute('data-tech');
            showTooltip(this, techName);
            
            // Pause animation on hover
            this.style.animationPlayState = 'paused';
            
            // Add glow effect
            this.style.boxShadow = '0 0 25px rgba(121, 134, 203, 0.6)';
        });

        badge.addEventListener('mouseleave', function() {
            hideTooltip();
            
            // Resume animation
            this.style.animationPlayState = 'running';
            
            // Remove glow effect
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });

        // Add click interaction
        badge.addEventListener('click', function() {
            const techName = this.getAttribute('data-tech');
            showTechInfo(techName);
        });

        // Stagger the initial animation
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
        }, index * 100);
    });

    // Mouse movement effect for tech badges
    document.addEventListener('mousemove', throttle((e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        techBadges.forEach((badge, index) => {
            const speed = (index + 1) * 0.3;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            badge.style.transform += ` translate(${x}px, ${y}px)`;
        });
    }, 16));
}

// Show tooltip for tech badges
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tech-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: linear-gradient(135deg, var(--portfolio-accent), var(--portfolio-accent-light));
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        animation: tooltipFadeIn 0.3s ease-out;
        transform: translateX(-50%);
    `;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top - 40 + 'px';
    
    document.body.appendChild(tooltip);
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tech-tooltip');
    if (tooltip) {
        tooltip.style.animation = 'tooltipFadeOut 0.3s ease-out forwards';
        setTimeout(() => tooltip.remove(), 300);
    }
}

// Show tech information
function showTechInfo(techName) {
    const techInfo = {
        'React': 'A JavaScript library for building user interfaces',
        'Python': 'A versatile programming language for web development, data science, and AI',
        'JavaScript': 'The programming language of the web',
        'AWS': 'Amazon Web Services - Cloud computing platform',
        'Docker': 'Platform for developing, shipping, and running applications in containers',
        'MongoDB': 'NoSQL database for modern applications',
        'Node.js': 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
        'Git': 'Distributed version control system',
        'Linux': 'Open-source operating system',
        'HTML5': 'The latest version of the markup language for the web',
        'CSS3': 'Style sheet language for describing web page presentation',
        'Machine Learning': 'AI that enables computers to learn without explicit programming',
        'AI': 'Artificial Intelligence - Simulation of human intelligence in machines',
        'Data Science': 'Field that uses scientific methods to extract insights from data',
        'Cloud': 'Computing services delivered over the internet'
    };

    const info = techInfo[techName] || 'Technology expertise';
    showNotification(`${techName}: ${info}`, 'info');
}

// Enhanced Scroll Animations with Staggered Effects
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('skills-grid') || 
                    entry.target.classList.contains('certifications-grid') ||
                    entry.target.classList.contains('experience-grid') ||
                    entry.target.classList.contains('speaking-grid') ||
                    entry.target.classList.contains('languages-grid')) {
                    animateGridItems(entry.target);
                }

                // Special animation for education timeline
                if (entry.target.classList.contains('education-timeline')) {
                    animateTimelineItems(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe sections and grids
    const sectionsToAnimate = document.querySelectorAll('section, .skills-grid, .certifications-grid, .experience-grid, .speaking-grid, .languages-grid, .education-timeline');
    sectionsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Animate grid items with enhanced stagger effect
function animateGridItems(container) {
    const items = container.children;
    Array.from(items).forEach((item, index) => {
        // Initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.9)';
        item.style.visibility = 'visible';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 100); // Staggered delay
    });
}

// Animate timeline items with special effects
function animateTimelineItems(container) {
    const items = container.querySelectorAll('.education-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// Enhanced Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Add/remove background blur effect with smooth transition
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(26, 35, 126, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(26, 35, 126, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
        }

        // Keep navbar visible at all times
        navbar.style.transform = 'translateY(0)';
        
        lastScrollY = currentScrollY;
    }, 16));

    // Active nav link highlighting with smooth transitions
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', throttle(() => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 16));
}

// Smooth Scrolling with Enhanced Easing
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                // Enhanced smooth scroll with custom easing
                smoothScrollTo(offsetTop, 1000);
                
                // Add ripple effect to clicked nav link
                createRippleEffect(link, e);
            }
        });
    });
}

// Custom smooth scroll function
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// Create ripple effect for interactive elements
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(121, 134, 203, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Enhanced Mobile Menu
function initMobileMenu() {
    if (window.innerWidth <= 768) {
        const navbar = document.querySelector('.navbar .container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu-btn {
                    display: block;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 10px;
                    transition: all 0.3s ease;
                    border-radius: 8px;
                }
                
                .mobile-menu-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: scale(1.1);
                }
                
                @media (max-width: 768px) {
                    .nav-menu {
                        position: fixed;
                        top: 70px;
                        left: 0;
                        width: 100%;
                        background: rgba(26, 35, 126, 0.98);
                        backdrop-filter: blur(20px);
                        flex-direction: column;
                        padding: 20px;
                        transform: translateX(-100%);
                        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    }
                    
                    .nav-menu.active {
                        transform: translateX(0);
                    }
                    
                    .nav-link {
                        padding: 15px 0;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        transition: all 0.3s ease;
                    }
                    
                    .nav-link:hover {
                        transform: translateX(10px);
                        color: var(--portfolio-accent-light);
                    }
                }
            `;
            document.head.appendChild(style);
            
            navbar.appendChild(mobileMenuBtn);
            
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
                
                // Add rotation animation to icon
                icon.style.transform = navMenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            });
            
            navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.className = 'fas fa-bars';
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        }
    }
}

// Enhanced Parallax Effects for Floating Shapes
function initParallaxEffects() {
    const shapes = document.querySelectorAll('.shape, .geometric-shape');
    const particles = document.querySelectorAll('.particle');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05 + 0.02;
            const yPos = rate * speed;
            const rotation = scrolled * 0.05 * (index + 1);
            
            shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });

        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.03;
            const yPos = rate * speed;
            const xPos = Math.sin(scrolled * 0.001 + index) * 10;
            
            particle.style.transform = `translateY(${yPos}px) translateX(${xPos}px)`;
        });
    }, 16));
}

// Initialize Enhanced Floating Shapes Behavior
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    const geometricShapes = document.querySelectorAll('.geometric-shape');
    const particles = document.querySelectorAll('.particle');

    // Add random delays and variations to floating animations
    shapes.forEach((shape, index) => {
        const randomDelay = Math.random() * 5;
        const randomDuration = 6 + Math.random() * 4;
        shape.style.animationDelay = `${randomDelay}s`;
        shape.style.animationDuration = `${randomDuration}s`;
    });

    geometricShapes.forEach((shape, index) => {
        const randomDelay = Math.random() * 8;
        const randomDuration = 8 + Math.random() * 6;
        shape.style.animationDelay = `${randomDelay}s`;
        shape.style.animationDuration = `${randomDuration}s`;
    });

    particles.forEach((particle, index) => {
        const randomDelay = Math.random() * 12;
        const randomDuration = 10 + Math.random() * 8;
        particle.style.animationDelay = `${randomDelay}s`;
        particle.style.animationDuration = `${randomDuration}s`;
    });

    // Add mouse interaction for floating shapes
    document.addEventListener('mousemove', throttle((e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            shape.style.transform += ` translate(${x}px, ${y}px)`;
        });
    }, 16));
}

// Enhanced Contact Interactions
function initContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-info .contact-item');
    
    contactItems.forEach(item => {
        // Add hover effect with scale and glow
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px) scale(1.02)';
            item.style.boxShadow = '0 8px 25px rgba(63, 81, 181, 0.15)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
            item.style.boxShadow = 'none';
        });

        item.addEventListener('click', (e) => {
            const phoneIcon = item.querySelector('.fa-phone');
            const emailIcon = item.querySelector('.fa-envelope');
            const linkedinIcon = item.querySelector('.fa-linkedin');
            
            // Add click animation
            item.style.transform = 'translateX(5px) scale(0.98)';
            setTimeout(() => {
                item.style.transform = 'translateX(5px) scale(1.02)';
            }, 150);
            
            if (phoneIcon) {
                const phoneNumber = item.querySelector('p').textContent;
                window.location.href = `tel:${phoneNumber}`;
            } else if (emailIcon) {
                const email = item.querySelector('p').textContent;
                window.location.href = `mailto:${email}`;
            } else if (linkedinIcon) {
                const linkedinLink = item.querySelector('a');
                if (linkedinLink) {
                    window.open(linkedinLink.href, '_blank');
                }
            }
        });
    });
    
    // Also handle hero contact items
    const heroContactItems = document.querySelectorAll('.hero-contact .contact-item');
    heroContactItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const phoneIcon = item.querySelector('.fa-phone');
            const emailIcon = item.querySelector('.fa-envelope');
            const linkedinIcon = item.querySelector('.fa-linkedin');
            
            // Add click ripple effect
            createRippleEffect(item, e);
            
            if (phoneIcon) {
                const phoneNumber = item.querySelector('span').textContent;
                window.location.href = `tel:${phoneNumber}`;
            } else if (emailIcon) {
                const email = item.querySelector('span').textContent;
                window.location.href = `mailto:${email}`;
            } else if (linkedinIcon) {
                const linkedinLink = item.querySelector('a');
                if (linkedinLink) {
                    window.open(linkedinLink.href, '_blank');
                }
            }
        });
    });
}

// Professional Contact Form Functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Real-time validation
    nameField.addEventListener('blur', () => validateField(nameField, nameError, 'Name is required'));
    emailField.addEventListener('blur', () => validateEmail(emailField, emailError));
    messageField.addEventListener('blur', () => validateField(messageField, messageError, 'Message is required'));

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateField(nameField, nameError, 'Name is required');
        const isEmailValid = validateEmail(emailField, emailError);
        const isMessageValid = validateField(messageField, messageError, 'Message is required');
        
        if (isNameValid && isEmailValid && isMessageValid) {
            handleFormSubmission();
        }
    });

    // Enhanced input interactions
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'scale(1.02)';
            input.style.boxShadow = '0 8px 25px rgba(0, 188, 212, 0.2)';
        });

        input.addEventListener('blur', () => {
            input.style.transform = 'scale(1)';
            input.style.boxShadow = 'none';
        });
    });
}

function validateField(field, errorElement, message) {
    if (field.value.trim() === '') {
        showError(errorElement, message);
        field.style.borderColor = '#ff5252';
        return false;
    } else {
        hideError(errorElement);
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        return true;
    }
}

function validateEmail(field, errorElement) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (field.value.trim() === '') {
        showError(errorElement, 'Email is required');
        field.style.borderColor = '#ff5252';
        return false;
    } else if (!emailRegex.test(field.value)) {
        showError(errorElement, 'Please enter a valid email address');
        field.style.borderColor = '#ff5252';
        return false;
    } else {
        hideError(errorElement);
        field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        return true;
    }
}

function showError(errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        errorElement.style.animation = 'fadeInUp 0.3s ease-out';
    }
}

function hideError(errorElement) {
    if (errorElement) {
        errorElement.classList.remove('show');
    }
}

function handleFormSubmission() {
    const submitBtn = document.querySelector('.btn-contact-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #666, #888)';
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // Show success state
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = 'linear-gradient(135deg, var(--portfolio-form-button), #26c6da)';
        }, 3000);
        
        // Show success notification
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }, 2000);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4caf50, #66bb6a)' : 
                    type === 'info' ? 'linear-gradient(135deg, #2196f3, #64b5f6)' :
                    'linear-gradient(135deg, #f44336, #e57373)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        max-width: 350px;
        font-size: 14px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    }, 4000);
}

// Enhanced Skills Animation on Hover
function initEnhancedAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    const certCards = document.querySelectorAll('.cert-card');
    const experienceCards = document.querySelectorAll('.experience-card');
    
    // Enhanced skill cards animations
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.03)';
            card.style.boxShadow = '0 25px 50px rgba(63, 81, 181, 0.2)';
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.2)';
                icon.style.color = 'var(--portfolio-accent-light)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
                icon.style.color = 'var(--portfolio-accent)';
            }
        });
    });

    // Enhanced certification cards
    certCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(5deg)';
                icon.style.color = 'var(--portfolio-accent-light)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = 'var(--portfolio-accent)';
            }
        });
    });

    // Experience cards with special effects
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95))';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.background = 'var(--portfolio-card-bg)';
        });
    });
}

// Performance optimization with throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add tooltip animation CSS
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    @keyframes tooltipFadeIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes tooltipFadeOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
        }
    }
`;
document.head.appendChild(tooltipStyle);

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add CSS for active nav link
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-link.active {
        color: #7986cb !important;
        background: rgba(121, 134, 203, 0.15) !important;
    }
    
    .nav-link.active::after {
        width: 80% !important;
    }
`;
document.head.appendChild(activeNavStyle);

// Initialize additional animations on load
window.addEventListener('load', () => {
    // Ensure all content is visible after load
    setTimeout(() => {
        ensureContentVisibility();
        
        // Add entrance animations to hero elements
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-contact');
        heroElements.forEach((el, index) => {
            el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s both`;
        });
        
        // Trigger floating shapes variations
        const shapes = document.querySelectorAll('.shape, .geometric-shape, .particle');
        shapes.forEach(shape => {
            shape.style.animationPlayState = 'running';
        });

        // Animate profile image entrance
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            profileImage.style.animation = 'fadeInUp 1s ease-out 0.5s both';
        }

        // Animate tech badges entrance
        const techBadges = document.querySelectorAll('.tech-badge');
        techBadges.forEach((badge, index) => {
            badge.style.animation = `fadeInUp 0.6s ease-out ${0.8 + index * 0.1}s both`;
        });
    }, 100);
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', throttle(() => {
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (mobileBtn) {
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
                icon.style.transform = 'rotate(0deg)';
            }
        }
    }
}, 250));

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    const animatableElements = document.querySelectorAll('.skill-card, .cert-card, .experience-card, .education-item, .speaking-card, .language-item');
    animatableElements.forEach(el => {
        intersectionObserver.observe(el);
    });
});

// Add animate-in CSS class
const animateInStyle = document.createElement('style');
animateInStyle.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;
document.head.appendChild(animateInStyle);