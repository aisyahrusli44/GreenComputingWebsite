/* =======================
   GREEN COMPUTING WEBSITE 
   =======================*/

// =====================
// 1. MAIN IMAGE SLIDER  
// =====================
let currentSlide = 0;
let autoSlideTimer;

function initMainSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) {
        console.log('No main slider found on this page');
        return;
    }
    
    console.log(`Main slider initialized with ${slides.length} slides`);
    
    // Show first slide
    showMainSlide(0);
    
    // Start automatic sliding
    startAutoSlide();
    
    // Pause when mouse is over slider
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
        sliderWrapper.addEventListener('mouseleave', startAutoSlide);
    }
}

function showMainSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function changeSlide(direction) {
    showMainSlide(currentSlide + direction);
    stopAutoSlide();
    startAutoSlide();
}

function goToSlide(index) {
    showMainSlide(index);
    stopAutoSlide();
    startAutoSlide();
}

function startAutoSlide() {
    stopAutoSlide();
    const slides = document.querySelectorAll('.slide');
    
    if (slides.length > 0) {
        autoSlideTimer = setInterval(() => {
            currentSlide++;
            showMainSlide(currentSlide);
        }, 5000);
    }
}

function stopAutoSlide() {
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
    }
}

// Make functions available globally
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;	



// ============================================
// 2. MINI SLIDERS FOR RESEARCH CARDS 
// ============================================
function initMiniSliders() {
    const miniSliders = document.querySelectorAll('.mini-slider');
    
    if (miniSliders.length === 0) {
        console.log('No mini sliders found on this page');
        return;
    }
    
    console.log(`Found ${miniSliders.length} mini sliders`);
    
    miniSliders.forEach((slider, sliderIndex) => {
        const slides = slider.querySelectorAll('.mini-slide');
        const dots = slider.querySelectorAll('.mini-dot');
        const prevBtn = slider.querySelector('.mini-prev');
        const nextBtn = slider.querySelector('.mini-next');
        
        if (slides.length === 0) return;
        
        let currentIndex = 0;
        let miniTimer = null;
        
        function showSlide(index) {
            // Keep index within bounds
            if (index >= slides.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = slides.length - 1;
            } else {
                currentIndex = index;
            }
            
            // Remove active from all
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            // Add active to current
            slides[currentIndex].classList.add('active');
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }
        
        function startMiniAuto() {
            stopMiniAuto();
            miniTimer = setInterval(() => {
                currentIndex++;
                showSlide(currentIndex);
            }, 4000);
        }
        
        function stopMiniAuto() {
            if (miniTimer) {
                clearInterval(miniTimer);
            }
        }
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentIndex--;
                showSlide(currentIndex);
                stopMiniAuto();
                startMiniAuto();
            });
        }
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentIndex++;
                showSlide(currentIndex);
                stopMiniAuto();
                startMiniAuto();
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showSlide(index);
                stopMiniAuto();
                startMiniAuto();
            });
        });
        
        // Pause on hover
        slider.addEventListener('mouseenter', stopMiniAuto);
        slider.addEventListener('mouseleave', startMiniAuto);
        
        // Initialize
        showSlide(0);
        startMiniAuto();
        
        console.log(`Mini slider ${sliderIndex} initialized with ${slides.length} slides`);
    });
}

// ============================================
// 3. SCROLL TO TOP BUTTON
// ============================================
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// 4. SIGN UP FORM HANDLER
// ============================================
function initSignUpForm() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            let isValid = true;
            let errorMessage = '';
            
            if (username.length < 3) {
                isValid = false;
                errorMessage += 'Username must be at least 3 characters long.\n';
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (password.length < 6) {
                isValid = false;
                errorMessage += 'Password must be at least 6 characters long.\n';
            }
            
            if (isValid) {
                const userData = {
                    username: username,
                    email: email,
                    registeredDate: new Date().toISOString()
                };
                
                localStorage.setItem('greenComputingUser', JSON.stringify(userData));
                
                alert(`✅ Registration Successful!\n\nWelcome, ${username}!\n\nYou'll receive updates at ${email}\n\nThank you for joining the Green Computing community!`);
                
                signupForm.reset();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert('❌ Registration Failed:\n\n' + errorMessage);
            }
        });
        
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                const password = e.target.value;
                let color = '#ff4444';
                
                if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
                    color = '#00d9ff';
                } else if (password.length >= 6) {
                    color = '#ffa500';
                }
                
                passwordInput.style.borderColor = color;
            });
        }
    }
}

// ============================================
// 5. FEEDBACK FORM HANDLER
// ============================================
let selectedRating = 0;
let selectedRating2 = 0;

function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        initStarRating(feedbackForm, 'selectedRating');
        
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('feedbackName').value.trim();
            const email = document.getElementById('feedbackEmail').value.trim();
            const suggestion = document.getElementById('suggestion').value.trim();
            
            if (!name || !email || !suggestion || selectedRating === 0) {
                alert('❌ Please fill in all fields and provide a rating.');
                return;
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('❌ Please enter a valid email address.');
                return;
            }
            
            const feedback = {
                name: name,
                email: email,
                rating: selectedRating,
                suggestion: suggestion,
                date: new Date().toISOString()
            };
            
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
            feedbacks.push(feedback);
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
            
            alert(`✅ Thank you for your feedback, ${name}!\n\nYour rating: ${'⭐'.repeat(selectedRating)}\n\nWe appreciate your input!`);
            
            feedbackForm.reset();
            selectedRating = 0;
            updateStars(feedbackForm, -1);
        });
    }
    
    const feedbackForm2 = document.getElementById('feedbackForm2');
    if (feedbackForm2) {
        initStarRating(feedbackForm2, 'selectedRating2');
        
        feedbackForm2.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('feedbackName2').value.trim();
            const email = document.getElementById('feedbackEmail2').value.trim();
            const suggestion = document.getElementById('suggestion2').value.trim();
            
            if (!name || !email || !suggestion || selectedRating2 === 0) {
                alert('❌ Please fill in all fields and provide a rating.');
                return;
            }
            
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('❌ Please enter a valid email address.');
                return;
            }
            
            const feedback = {
                name: name,
                email: email,
                rating: selectedRating2,
                suggestion: suggestion,
                date: new Date().toISOString()
            };
            
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
            feedbacks.push(feedback);
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
            
            alert(`✅ Thank you for your feedback, ${name}!\n\nYour rating: ${'⭐'.repeat(selectedRating2)}\n\nWe appreciate your input!`);
            
            feedbackForm2.reset();
            selectedRating2 = 0;
            updateStars(feedbackForm2, -1);
        });
    }
}

function initStarRating(form, ratingVar) {
    const stars = form.querySelectorAll('.star');
    const starsContainer = form.querySelector('.stars');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            if (ratingVar === 'selectedRating') {
                selectedRating = index + 1;
            } else {
                selectedRating2 = index + 1;
            }
            updateStars(form, index);
        });
        
        star.addEventListener('mouseenter', () => {
            updateStars(form, index);
        });
    });
    
    if (starsContainer) {
        starsContainer.addEventListener('mouseleave', () => {
            const rating = ratingVar === 'selectedRating' ? selectedRating : selectedRating2;
            updateStars(form, rating - 1);
        });
    }
}

function updateStars(form, index) {
    const stars = form.querySelectorAll('.star');
    stars.forEach((star, i) => {
        if (i <= index) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// ============================================
// 6. SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 7. LOGIN/LOGOUT FUNCTIONALITY
// ============================================
window.showLoginModal = function() {
    window.location.href = 'login-web.html';
};

window.closeLoginModal = function() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
};

window.logoutUser = function() {
    window.location.href = 'logout-web.html';
};

window.confirmLogout = function() {
    localStorage.removeItem('greenComputingUser');
    alert('✅ You have been logged out successfully!');
    window.location.href = 'index-web.html';
};

window.cancelLogout = function() {
    window.location.href = 'index-web.html';
};

function initLoginForm() {
    const loginPageForm = document.getElementById('loginPageForm');
    
    if (loginPageForm) {
        loginPageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginPageEmail').value.trim();
            const password = document.getElementById('loginPagePassword').value;
            const rememberMe = document.getElementById('rememberMe')?.checked;
            
            const userData = localStorage.getItem('greenComputingUser');
            
            if (userData) {
                const user = JSON.parse(userData);
                
                if (user.email === email) {
                    if (rememberMe) {
                        localStorage.setItem('rememberMe', 'true');
                    }
                    
                    alert(`✅ Welcome back, ${user.username}!`);
                    window.location.href = 'index-web.html';
                } else {
                    alert('❌ Invalid email or password.');
                }
            } else {
                alert('❌ No account found. Please sign up first.');
                window.location.href = 'index-web.html#signup';
            }
        });
    }
}

function initLogoutPage() {
    if (window.location.pathname.includes('logout-web.html')) {
        const userData = localStorage.getItem('greenComputingUser');
        
        if (userData) {
            const user = JSON.parse(userData);
            
            const userNameElement = document.getElementById('logoutUserName');
            if (userNameElement) {
                userNameElement.textContent = user.username;
            }
            
            const memberSinceElement = document.getElementById('memberSince');
            if (memberSinceElement && user.registeredDate) {
                const date = new Date(user.registeredDate);
                memberSinceElement.textContent = date.toLocaleDateString();
            }
            
            const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
            const userFeedbacks = feedbacks.filter(f => f.email === user.email);
            const feedbackCountElement = document.getElementById('feedbackCount');
            if (feedbackCountElement) {
                feedbackCountElement.textContent = userFeedbacks.length;
            }
        } else {
            alert('⚠️ You are not logged in.');
            window.location.href = 'login-web.html';
        }
    }
}

// ============================================
// 8. NAVIGATION HIGHLIGHT
// ============================================
function initNavigationHighlight() {
    const currentPage = window.location.pathname.split('/').pop() || 'index-web.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================
// 9. CONSOLE WELCOME MESSAGE
// ============================================
function displayWelcomeMessage() {
    console.log('%c🌍 Welcome to Green Computing! 🌍', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
    console.log('%cBuilding a sustainable digital future together', 'color: #00a8cc; font-size: 14px;');
}

// ============================================
// INITIALIZE ALL FUNCTIONS ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Green Computing Website...');
    
    displayWelcomeMessage();
    
    // Initialize all features
    initMainSlider();
    initMiniSliders();
    initScrollToTop();
    initSignUpForm();
    initFeedbackForm();
    initSmoothScroll();
    initNavigationHighlight();
    initLoginForm();
    initLogoutPage();
    
    console.log('✅ All features initialized successfully!');
});

window.addEventListener('load', () => {
    console.log('✅ Page fully loaded!');
});