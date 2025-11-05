// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

// Certificate Modals Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all partner cards
    const partnerCards = document.querySelectorAll('.partner-card');
    console.log(`Found ${partnerCards.length} partner cards`);
    
    // Add click event to each partner card
    partnerCards.forEach(card => {
        // Get the certificate ID from data attribute
        const certificateId = card.getAttribute('data-certificate');
        
        // Add has-certificate class to cards with data-certificate attribute
        if (certificateId) {
            card.classList.add('has-certificate');
            console.log(`Card with certificate ID: ${certificateId} marked as has-certificate`);
        }
        
        card.addEventListener('click', function() {
            // Get the certificate ID from data attribute
            const certificateId = this.getAttribute('data-certificate');
            
            if (!certificateId) {
                console.log('This card does not have a certificate ID');
                return;
            }
            
            // Find the corresponding modal
            const modal = document.getElementById(`${certificateId}-certificate`);
            
            // Open the modal
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                
                // Log for debugging
                console.log(`Opening certificate modal: ${certificateId}`);
            } else {
                console.error(`Certificate modal not found for ID: ${certificateId}-certificate`);
            }
        });
    });
    
    // Certificate view buttons now link directly to certificate pages
    console.log('Certificate view buttons now link to separate pages');
    
    // Close modal when clicking the close button
    const closeButtons = document.querySelectorAll('.certificate-modal-close');
    console.log(`Found ${closeButtons.length} close buttons`);
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the parent modal
            const modal = this.closest('.certificate-modal');
            
            // Close the modal
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
                console.log('Modal closed via close button');
            }
        });
    });
    
    // تهيئة سلايدر الشهادات
    function initCertificateSliders() {
        const sliders = document.querySelectorAll('.certificate-modal-slider');
        
        sliders.forEach(slider => {
            const container = slider.querySelector('.certificate-slider-container');
            const slides = slider.querySelectorAll('.certificate-slide');
            const dots = slider.querySelectorAll('.slider-dot');
            const prevBtn = slider.querySelector('.slider-prev');
            const nextBtn = slider.querySelector('.slider-next');
            let currentSlide = 0;
            const slideCount = slides.length;
            let autoSlideInterval;
            let touchStartX = 0;
            let touchEndX = 0;
            
            // تحديث موضع السلايدر (من اليمين إلى اليسار للغة العربية)
            function updateSliderPosition() {
                container.style.transform = `translateX(${currentSlide * -100}%)`;
                
                // تحديث النقاط
                dots.forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // الانتقال للسلايد التالي
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSliderPosition();
            }
            
            // الانتقال للسلايد السابق
            function prevSlide() {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateSliderPosition();
            }
            
            // بدء التمرير التلقائي
            function startAutoSlide() {
                stopAutoSlide(); // إيقاف أي تمرير تلقائي سابق
                autoSlideInterval = setInterval(nextSlide, 5000); // تغيير السلايد كل 5 ثواني
            }
            
            // إيقاف التمرير التلقائي
            function stopAutoSlide() {
                if (autoSlideInterval) {
                    clearInterval(autoSlideInterval);
                }
            }
            
            // معالجة بداية اللمس
            function handleTouchStart(e) {
                touchStartX = e.touches[0].clientX;
                stopAutoSlide(); // إيقاف التمرير التلقائي عند اللمس
            }
            
            // معالجة نهاية اللمس
            function handleTouchEnd(e) {
                touchEndX = e.changedTouches[0].clientX;
                handleSwipe();
                startAutoSlide(); // إعادة تشغيل التمرير التلقائي بعد اللمس
            }
            
            // معالجة السحب
            function handleSwipe() {
                const swipeThreshold = 50; // الحد الأدنى للمسافة للاعتبار كسحب
                const swipeDistance = touchEndX - touchStartX;
                
                if (swipeDistance < -swipeThreshold) {
                    // سحب لليسار (التالي في العربية)
                    prevSlide();
                } else if (swipeDistance > swipeThreshold) {
                    // سحب لليمين (السابق في العربية)
                    nextSlide();
                }
            }
            
            // إضافة مستمعي الأحداث
            if (prevBtn) prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoSlide();
                startAutoSlide(); // إعادة تشغيل المؤقت بعد النقر
            });
            
            if (nextBtn) nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoSlide();
                startAutoSlide(); // إعادة تشغيل المؤقت بعد النقر
            });
            
            // إضافة مستمعي الأحداث للنقاط
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    updateSliderPosition();
                    stopAutoSlide();
                    startAutoSlide(); // إعادة تشغيل المؤقت بعد النقر
                });
            });
            
            // إضافة مستمعي أحداث اللمس
            container.addEventListener('touchstart', handleTouchStart, false);
            container.addEventListener('touchend', handleTouchEnd, false);
            
            // إيقاف التمرير التلقائي عند تحويم الماوس
            slider.addEventListener('mouseenter', stopAutoSlide);
            slider.addEventListener('mouseleave', startAutoSlide);
            
            // تهيئة الموضع الأولي وبدء التمرير التلقائي
            updateSliderPosition();
            startAutoSlide();
        });
    }
    
    // استدعاء دالة تهيئة السلايدر عند فتح النافذة المنبثقة
    document.querySelectorAll('.certificate-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // تأخير قليل لضمان فتح النافذة المنبثقة أولاً
            setTimeout(initCertificateSliders, 100);
        });
    });
    
    // استدعاء دالة تهيئة السلايدر
    initCertificateSliders();
    
    // Close modal when clicking outside the content
    const modals = document.querySelectorAll('.certificate-modal');
    console.log(`Found ${modals.length} certificate modals`);
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            // Check if the click is outside the modal content
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
                console.log('Modal closed via outside click');
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.certificate-modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
                console.log('Modal closed via Escape key');
            }
        }
    });
});

document.querySelectorAll('.project-card, .skill-item, .about-content').forEach((el) => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Skills Progress Animation
function updateSkillProgress() {
    document.querySelectorAll('.skill-progress').forEach(progress => {
        const percent = progress.dataset.progress;
        progress.style.setProperty('--percent', percent);
    });
}

// Form Validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name.length < 3) {
            showAlert('الرجاء إدخال اسم صحيح');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('الرجاء إدخال بريد إلكتروني صحيح');
            return;
        }
        
        if (message.length < 10) {
            showAlert('الرجاء إدخال رسالة أطول');
            return;
        }
        
        // Here you can add your form submission logic
        showAlert('تم إرسال الرسالة بنجاح!', 'success');
        this.reset();
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(message, type = 'error') {
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;
    document.querySelector('.contact-form').prepend(alert);
    
    setTimeout(() => alert.remove(), 3000);
}

// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Mobile Menu
const mobileMenu = document.querySelector('.mobile-menu');
const menuToggles = document.querySelectorAll('.mobile-menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const menuLinks = document.querySelectorAll('.mobile-menu a');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

menuToggles.forEach(btn => btn?.addEventListener('click', toggleMenu));
closeMenu?.addEventListener('click', toggleMenu);

// إغلاق القائمة عند النقر على أي رابط
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
        // تأخير التمرير قليلاً للسماح بإغلاق القائمة أولاً
        setTimeout(() => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    });
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', (e) => {
    const clickedToggle = Array.from(menuToggles).some(t => t.contains(e.target));
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !clickedToggle) {
        toggleMenu();
    }
});

// منع التمرير عند فتح القائمة
document.addEventListener('touchmove', (e) => {
    if (mobileMenu.classList.contains('active')) {
        e.preventDefault();
    }
}, { passive: false });

// حذف كود الوضع المظلم
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.remove();
}

// حذف الإعدادات المحفوظة للوضع المظلم
localStorage.removeItem('theme');

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
});

// Update Skills Animation
const updateSkills = () => {
    document.querySelectorAll('.skill-progress').forEach((progress, index) => {
        const percent = progress.dataset.progress;
        setTimeout(() => {
            progress.style.setProperty('--progress', `${percent * 3.6}deg`);
        }, index * 100);
    });
};

// Intersection Observer for Skills
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateSkills();
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills-container').forEach(el => {
    skillsObserver.observe(el);
});

// Fix duplicate config and optimize particles
const particlesConfig = {
    particles: {
        number: { value: 30 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: {
            value: 0.3,
            random: true,
            animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
                sync: false
            }
        },
        size: {
            value: 2,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false
            }
        },
        move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outMode: "out",
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            bubble: {
                distance: 250,
                size: 6,
                duration: 2,
                opacity: 0.8,
                speed: 3
            }
        }
    },
    retina_detect: true
};

// Initialize particles with optimized config
particlesJS("particles-js", particlesConfig);

// Optimize performance with throttling
// Removed unused 'throttle' function
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// إزالة كل الأكواد القديمة المتعلقة بحركة الماوس
document.addEventListener('mousemove', () => {
    // تم إزالة كل التأثيرات
});

// تحسين أداء المراقبة
// Removed unused 'createObserver' function
    return new IntersectionObserver(callback, options);
};

// تحسين أداء الصفحة
const optimizePerformance = () => {
    const progressBar = document.querySelector('.scroll-progress');
    const updateProgress = debounce(() => {
        const scroll = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scroll}%`;
    }, 10);

    window.addEventListener('scroll', updateProgress, { passive: true });
};

// تحسين تأثيرات المهارات
function initSkills() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const progress = skillItem.querySelector('.progress');
                const percent = skillItem.dataset.progress || '0';
                const percentageSpan = skillItem.querySelector('.percentage');
                
                // تأخير لكل مهارة
                setTimeout(() => {
                    // تحريك شريط التقدم بنعومة
                    progress.style.width = `${percent}%`;
                    
                    // عداد متحرك للنسبة
                    if (percentageSpan) {
                        let count = 0;
                        const duration = 1500;
                        const increment = parseFloat(percent) / (duration / 16);
                        
                        const updateCounter = () => {
                            count += increment;
                            if (count <= parseFloat(percent)) {
                                percentageSpan.textContent = `${Math.round(count)}%`;
                                requestAnimationFrame(updateCounter);
                            } else {
                                percentageSpan.textContent = `${percent}%`;
                                skillItem.classList.add('animate');
                            }
                        };
                        
                        requestAnimationFrame(updateCounter);
                    }

                    // تأثير الأيقونة المحسن
                    const icon = skillItem.querySelector('.skill-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1.2) rotate(5deg)';
                        setTimeout(() => {
                            icon.style.transform = 'scale(1) rotate(0deg)';
                        }, 300);
                    }
                }, skillItem.dataset.delay || 0);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px'
    });

    // إضافة تأخير متزايد لكل مهارة
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.dataset.delay = index * 150;
        observer.observe(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Ensure all necessary code is properly enclosed
    optimizePerformance();
    initSkills();
    AOS.init({ duration: 800, once: true });
    smoothReveal();
});

// Smooth Scroll with Progress
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / height) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Project Cards Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Smooth Reveal Animation
const revealElements = document.querySelectorAll('[data-aos]');
const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px',
};

const revealCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));

// Enhanced Scroll Progress
const updateScrollProgress = () => {
    requestAnimationFrame(() => {
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / height) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
// Removed unused 'smoothScroll' function
// Smooth Scroll with Enhanced Easing
const smoothScroll = (target, duration) => {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Enhanced Easing Function
        const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + distance * ease(progress));
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
};

// Fix Performance Issues
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// تحديث أنيميشن المهارات
function initSkills() {
    const skills = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                const percent = entry.target.dataset.progress;
                const percentageSpan = entry.target.querySelector('.percentage');
                
                progressBar.style.width = `${percent}%`;
                progressBar.style.opacity = '1';
                
                // تحديث النسبة المئوية
                if (percentageSpan) {
                    percentageSpan.textContent = `${percent}%`;
                }
            }
        });
    }, { threshold: 0.2 });
    
    skills.forEach(skill => observer.observe(skill));
}

// تفعيل المهارات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initSkills);

// Add smooth reveal animations
const smoothReveal = () => {
    const elements = document.querySelectorAll('.welcome-card, .skill-item, .contact-form');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    initSkills();
    AOS.init({ duration: 800, once: true });
    smoothReveal();
    loadProjects();
});

// تحميل المشاريع من LocalStorage
function loadProjects() {
    const projectsContainer = document.querySelector('#projects .projects-grid');
    if (!projectsContainer) return;

    try {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        
        if (projects.length === 0) {
            projectsContainer.innerHTML = `
                <div class="empty-projects">
                    <i class="fas fa-folder-open"></i>
                    <p>لا توجد مشاريع حالياً</p>
                    <span>سيتم إضافة المشاريع قريباً</span>
                </div>`;
            return;
        }

        const projectsHTML = projects.map(project => `
            <div class="project-card" data-aos="fade-up">
                <div class="project-image">
                    <img src="${project.imageUrl}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.projectUrl}" target="_blank" class="btn project-btn">
                            <i class="fas fa-external-link-alt"></i>
                            <span>معاينة المشروع</span>
                        </a>
                        <a href="${project.githubUrl}" target="_blank" class="btn github-btn">
                            <i class="fab fa-github"></i>
                            <span>شيفرة المصدر</span>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        projectsContainer.innerHTML = projectsHTML;

        // تحديث تأثيرات AOS
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>حدث خطأ أثناء تحميل المشاريع</p>
            </div>`;
    }
}

// تنظيف وتحسين الأحداث
function initProjectsSystem() {
    // تحميل المشاريع عند تحميل الصفحة
    loadProjects();

    // الاستماع لتحديثات المشاريع
    window.addEventListener('storage', (e) => {
        if (e.key === 'projects') {
            loadProjects();
        }
    });

    // استقبال التحديثات من لوحة التحكم
    window.addEventListener('message', (event) => {
        if (event.data?.type === 'projectsUpdated' || event.data?.type === 'refreshProjects') {
            loadProjects();
        }
    });
}

// إضافة مستمع لتحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    initSkills();
    AOS.init({ duration: 800, once: true });
    smoothReveal();
    loadProjects();
    initProjectsSystem();
});

// تفعيل مراقبة التغييرات في LocalStorage
window.addEventListener('storage', (e) => {
    if (e.key === 'projects') {
        loadProjects();
    }
});

// تحميل المشاريع عند تحميل الصفحة
window.addEventListener('load', loadProjects);

// استقبال تحديثات المشاريع من لوحة التحكم
window.addEventListener('message', (event) => {
    if (event.data.type === 'projectsUpdated') {
        loadProjects();
    }
});

// الاستماع لتحديثات المشاريع
window.addEventListener('projectsUpdated', () => {
    loadProjects();
});

// حذف event listeners المكررة للـ storage
const storageHandler = (e) => {
    if (e.key === 'projects') {
        loadProjects();
    }
};

window.addEventListener('storage', storageHandler);

// تحميل المشاريع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadProjects);

// تحديث دالة تهيئة المهارات
function initSkills() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const progress = skillItem.querySelector('.progress');
                const percent = skillItem.dataset.progress || '0';
                const percentageSpan = skillItem.querySelector('.percentage');
                
                // تأخير لكل مهارة
                setTimeout(() => {
                    // تحريك شريط التقدم بنعومة
                    progress.style.width = `${percent}%`;
                    
                    // عداد متحرك للنسبة
                    if (percentageSpan) {
                        let count = 0;
                        const duration = 1500;
                        const increment = parseFloat(percent) / (duration / 16);
                        
                        const updateCounter = () => {
                            count += increment;
                            if (count <= parseFloat(percent)) {
                                percentageSpan.textContent = `${Math.round(count)}%`;
                                requestAnimationFrame(updateCounter);
                            } else {
                                percentageSpan.textContent = `${percent}%`;
                                skillItem.classList.add('animate');
                            }
                        };
                        
                        requestAnimationFrame(updateCounter);
                    }

                    // تأثير الأيقونة المحسن
                    const icon = skillItem.querySelector('.skill-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1.2) rotate(5deg)';
                        setTimeout(() => {
                            icon.style.transform = 'scale(1) rotate(0deg)';
                        }, 300);
                    }
                }, skillItem.dataset.delay || 0);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px'
    });

    // إضافة تأخير متزايد لكل مهارة
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.dataset.delay = index * 150;
        observer.observe(item);
    });
}

// حذف الدوال المكررة
document.addEventListener('DOMContentLoaded', () => {
    initSkills();
    AOS.refresh();
});

// حذف كود تبديل اللغة
const initLanguageSwitcher = () => {
    // تم إزالة الدالة
};

// حذف مستمع تحميل الصفحة المتعلق باللغة
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    initSkills();
    AOS.init({ duration: 800, once: true });
    smoothReveal();
    loadProjects();
    initProjectsSystem();
});

// تفعيل التحسينات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    initSkills();
    AOS.init({ duration: 800, once: true });
    smoothReveal();
    loadProjects();
    initProjectsSystem();
});

// تحسينات الأداء للجوال
function mobileOptimizations() {
    // تحسين التمرير
    let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        // تعطيل الجزيئات على الجوال لتحسين الأداء
        const particles = document.querySelector('#particles-js');
        if (particles) {
            particles.style.opacity = '0.3';
        }

        // تبسيط الأنيميشن على الجوال
        document.querySelectorAll('.skill-item, .project-card').forEach(el => {
            el.style.transition = 'transform 0.3s ease';
        });

        // تحسين معالجة النقر للقائمة
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('touchend', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                const target = document.querySelector(href);
                if (target) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
            });
        });
    }
}

// تفعيل التحسينات
document.addEventListener('DOMContentLoaded', () => {
    optimizePerformance();
    initSkills();
    AOS.init({ duration: 800, once: true });
    smoothReveal();
    loadProjects();
    initProjectsSystem();
    mobileOptimizations();
});

// تحديث الرابط النشط عند التمرير
function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// تحديث الهيدر عند التمرير
window.addEventListener('scroll', () => {
    updateActiveSection();
    
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// تحديث الرابط النشط عند النقر
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// تحديث الرابط النشط عند تحميل الصفحة
window.addEventListener('load', updateActiveSection);
