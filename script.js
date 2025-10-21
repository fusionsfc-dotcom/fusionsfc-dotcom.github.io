// Navigation elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const statNumbers = document.querySelectorAll('.stat-number');

// Mobile navigation toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu on link click + smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            event.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 60;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }

        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 40) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.08)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.92)';
        navbar.style.boxShadow = '0 10px 40px rgba(10, 24, 60, 0.08)';
    }
});

// Animation observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Assign animation classes
function registerAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const animationClass = index % 2 === 0 ? 'fade-in' : 'slide-in-left';
        section.classList.add(animationClass);
        observer.observe(section);
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    const journeySteps = document.querySelectorAll('.journey-step');
    journeySteps.forEach(step => {
        step.classList.add('slide-in-right');
        observer.observe(step);
    });

    const communityCards = document.querySelectorAll('.community-card');
    communityCards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });

    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.classList.add('slide-in-left');
        observer.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', registerAnimations);

// Statistic counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

const statsTrigger = document.querySelector('.hero');
if (statsTrigger) {
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.target, 10);
                    if (!Number.isNaN(target)) {
                        animateCounter(stat, target);
                    }
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsTrigger);
}

// Parallax effect for phone mockup
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const mockup = document.querySelector('.phone-mockup');
    if (mockup) {
        const translate = Math.min(scrolled * -0.1, 0);
        mockup.style.transform = `translateY(${translate}px)`;
    }
});

// Hero typing effect
function applyHighlight(element, highlightText) {
    if (!highlightText) return;

    const content = element.textContent;
    const index = content.indexOf(highlightText);

    if (index === -1) return;

    const before = content.slice(0, index);
    const highlight = content.slice(index, index + highlightText.length);
    const after = content.slice(index + highlightText.length);

    element.innerHTML = `${before}<span class="highlight">${highlight}</span>${after}`;
}

function typeWriter(element, text, speed = 80, highlightText = '') {
    let index = 0;

    function type() {
        if (index <= text.length) {
            element.textContent = text.slice(0, index);
            index += 1;
            setTimeout(type, speed);
        } else {
            applyHighlight(element, highlightText);
        }
    }

    type();
}

window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const highlightNode = heroTitle.querySelector('.highlight');
        const highlightText = highlightNode ? highlightNode.textContent.trim() : '';
        const originalText = heroTitle.textContent.trim();
        typeWriter(heroTitle, originalText, 45, highlightText);
    }
});

// Insight panel interactions
const insightTabs = document.querySelectorAll('.insight-tab');
const insightTitle = document.getElementById('insightTitle');
const insightScore = document.getElementById('insightScore');
const insightDescription = document.getElementById('insightDescription');
const metricPrimaryLabel = document.getElementById('metricPrimaryLabel');
const metricPrimaryValue = document.getElementById('metricPrimaryValue');
const metricPrimaryBar = document.getElementById('metricPrimaryBar');
const metricSecondaryLabel = document.getElementById('metricSecondaryLabel');
const metricSecondaryValue = document.getElementById('metricSecondaryValue');
const metricSecondaryBar = document.getElementById('metricSecondaryBar');
const metricTag = document.getElementById('metricTag');

const insightData = {
    glucose: {
        title: '혈당 관리 주간 리포트',
        scoreText: '안정',
        scoreTone: 'stable',
        description: '공복 혈당과 식후 혈당이 목표 범위에서 유지되고 있어요. 식단 기록을 바탕으로 주 3회 저강도 유산소 운동을 추천합니다.',
        primary: { label: '공복 혈당', value: '94 mg/dL', percent: 62 },
        secondary: { label: '목표 달성률', value: '88%', percent: 88 },
        tag: '저녁 식사 후 15분 걷기'
    },
    'blood-pressure': {
        title: '혈압 안정 리포트',
        scoreText: '주의',
        scoreTone: 'warning',
        description: '수축기 혈압이 주 후반에 일시적으로 상승했습니다. 저녁 염분 섭취량을 줄이고, 취침 전 5분 호흡 운동을 제안합니다.',
        primary: { label: '평균 수축기 혈압', value: '135 mmHg', percent: 78 },
        secondary: { label: '복약 준수율', value: '92%', percent: 92 },
        tag: '취침 전 복식호흡 5분'
    },
    wellness: {
        title: '생활 습관 리포트',
        scoreText: '집중 케어',
        scoreTone: 'alert',
        description: '주간 활동량은 목표의 60% 수준입니다. 출근 전 10분 스트레칭과 점심 시간 걷기 미션을 추천합니다.',
        primary: { label: '일일 활동량', value: '5,200보', percent: 52 },
        secondary: { label: '수면 점수', value: '76점', percent: 76 },
        tag: '점심 시간 1,500보 걷기'
    }
};

function updateInsightPanel(type) {
    const data = insightData[type];
    if (!data) return;

    insightTitle.textContent = data.title;
    insightDescription.textContent = data.description;
    metricPrimaryLabel.textContent = data.primary.label;
    metricPrimaryValue.textContent = data.primary.value;
    metricPrimaryBar.style.width = `${data.primary.percent}%`;
    metricSecondaryLabel.textContent = data.secondary.label;
    metricSecondaryValue.textContent = data.secondary.value;
    metricSecondaryBar.style.width = `${data.secondary.percent}%`;
    metricTag.textContent = data.tag;

    insightScore.textContent = data.scoreText;
    insightScore.classList.remove('stable', 'warning', 'alert');
    insightScore.classList.add(data.scoreTone);
}

insightTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        insightTabs.forEach(item => item.classList.remove('active'));
        tab.classList.add('active');
        updateInsightPanel(tab.dataset.target);
    });
});

// Initialize default insight state
if (insightTabs.length) {
    updateInsightPanel(insightTabs[0].dataset.target);
}

// FAQ accordion
const faqButtons = document.querySelectorAll('.faq-question');
faqButtons.forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        faqButtons.forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
            btn.nextElementSibling?.classList.remove('open');
        });

        if (!expanded) {
            button.setAttribute('aria-expanded', 'true');
            button.nextElementSibling?.classList.add('open');
        }
    });
});

// Scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
    });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Form validation helpers
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const goal = document.getElementById('goal');
    const message = document.getElementById('message');

    let isValid = true;
    [name, email, phone, goal, message].forEach(field => {
        if (field) {
            field.style.borderColor = 'rgba(255, 255, 255, 0.25)';
        }
    });

    if (!name.value.trim()) {
        name.style.borderColor = '#f87171';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.style.borderColor = '#f87171';
        isValid = false;
    }

    if (phone.value.trim()) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone.value)) {
            phone.style.borderColor = '#f87171';
            isValid = false;
        }
    }

    if (!goal.value) {
        goal.style.borderColor = '#f87171';
        isValid = false;
    }

    if (!message.value.trim()) {
        message.style.borderColor = '#f87171';
        isValid = false;
    }

    return isValid;
}

function showMessage(type, message) {
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    contactForm?.appendChild(messageDiv);

    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

if (contactForm) {
    const formInputs = contactForm.querySelectorAll('input, select, textarea');

    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.style.borderColor === 'rgb(248, 113, 113)') {
                input.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }
        });

        input.addEventListener('blur', () => {
            if (input.value.trim()) {
                input.style.borderColor = '#60c5ff';
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }
        });
    });

    contactForm.addEventListener('submit', async event => {
        event.preventDefault();

        if (!validateForm()) {
            showMessage('error', '모든 필수 항목을 올바르게 입력해주세요.');
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (!submitButton) return;

        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<span class="loading"></span> 전송 중...';
        submitButton.disabled = true;

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        try {
            console.info('문의 전송 데이터', data);
            await new Promise(resolve => setTimeout(resolve, 1800));
            showMessage('success', '문의가 성공적으로 접수되었습니다. 담당자가 연락드릴 예정입니다.');
            contactForm.reset();
        } catch (error) {
            console.error('문의 전송 중 오류', error);
            showMessage('error', '문의 전송에 실패했습니다. 다시 시도해주세요.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Lazy loading for potential future images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Console welcome
console.log(`\n헬스케어메이트에 오신 것을 환영합니다!\n스마트 환자 건강관리 솔루션으로 일상을 바꿔보세요.\n문의: hello@healthcaremate.kr | 02-3456-7890\n`);

// Error boundary for missing elements
window.addEventListener('error', event => {
    console.warn('페이지 로딩 중 오류가 발생했습니다:', event.message);
});

// Placeholder for service worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('Service Worker registered', registration))
        //     .catch(error => console.log('Service Worker registration failed', error));
    });
}
