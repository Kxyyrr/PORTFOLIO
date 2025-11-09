document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // NAVIGATION MOBILE
    // ============================================
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Fermer le menu mobile au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject')?.value || 'Pas de sujet';
            const message = document.getElementById('message').value;

            console.log('=== Formulaire soumis ===');
            console.log('Nom:', name);
            console.log('Email:', email);
            console.log('Sujet:', subject);
            console.log('Message:', message);
            console.log('========================');

            // Animation du bouton
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>✓ Message envoyé !</span>';
            submitBtn.style.background = '#4caf50';

            // Reset après 3 secondes
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);

            alert('✅ Merci pour votre message ! Je vous répondrai dès que possible.');
        });
    }

    // ============================================
    // SKILLS ANIMATION
    // ============================================
    const animateSkills = () => {
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;

        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
            window.removeEventListener('scroll', animateSkills);
        }
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Check on load

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.padding = '0 5%';
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.7)';
        } else {
            header.style.padding = '';
            header.style.boxShadow = '';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // IMAGE MODAL
    // ============================================
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close');

    // Ouvrir le modal au clic sur les images de projet
    document.querySelectorAll('.project-image img').forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImage.src = img.src;
            document.body.style.overflow = 'hidden';
        });
    });

    // Fermer le modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // INITIAL LOAD ANIMATION
    // ============================================
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
