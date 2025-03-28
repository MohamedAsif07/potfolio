// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.toggle('light-mode', savedTheme === 'light');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Contact Card Flip
document.addEventListener('DOMContentLoaded', function() {
    const contactCard = document.querySelector('.contact-card');
    if (contactCard) {
        contactCard.addEventListener('click', function() {
            this.querySelector('.card-inner').style.transform = 
                this.querySelector('.card-inner').style.transform === 'rotateY(180deg)' 
                    ? 'rotateY(0deg)' 
                    : 'rotateY(180deg)';
        });
    }
});

// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.1';
        document.body.appendChild(this.canvas);
        this.resize();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        requestAnimationFrame(() => this.animate());
    }
}

// Terminal Effect
class TerminalEffect {
    constructor(element) {
        this.element = element;
        this.text = element.textContent;
        this.element.textContent = '';
        this.currentIndex = 0;
        this.typingSpeed = 50;
        this.commands = [
            'Initializing system...',
            'Loading security protocols...',
            'Scanning for vulnerabilities...',
            'Checking firewall status...',
            'Verifying encryption...',
            'System secure and operational.'
        ];
        this.currentCommand = 0;
        this.startTyping();
    }

    startTyping() {
        if (this.currentCommand < this.commands.length) {
            this.typeCommand(this.commands[this.currentCommand]);
        }
    }

    typeCommand(command) {
        if (this.currentIndex < command.length) {
            this.element.textContent += command.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.typeCommand(command), this.typingSpeed);
        } else {
            this.element.textContent += '\n';
            this.currentCommand++;
            this.currentIndex = 0;
            setTimeout(() => this.startTyping(), 1000);
        }
    }
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain
    const matrixRain = new MatrixRain();

    // Initialize Terminal Effect
    const terminalElement = document.querySelector('.terminal-text');
    if (terminalElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    new TerminalEffect(terminalElement);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(terminalElement);
    }

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));

            submitBtn.textContent = 'Message Sent!';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }, 3000);
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Enhanced 3D Animations and Effects
    // Parallax effect for project header
    const projectHeader = document.querySelector('.project-header');
    if (projectHeader) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = projectHeader.getBoundingClientRect();
            const x = (clientX - left) / width;
            const y = (clientY - top) / height;
            
            projectHeader.style.transform = `
                perspective(2000px)
                rotateX(${(y - 0.5) * 10}deg)
                rotateY(${(x - 0.5) * 10}deg)
            `;
        });
    }

    // 3D hover effect for project content
    const projectContent = document.querySelectorAll('.content-section');
    projectContent.forEach(section => {
        section.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = section.getBoundingClientRect();
            const x = (clientX - left) / width;
            const y = (clientY - top) / height;
            
            section.style.transform = `
                translateZ(50px)
                rotateX(${(y - 0.5) * 5}deg)
                rotateY(${(x - 0.5) * 5}deg)
            `;
        });

        section.addEventListener('mouseleave', () => {
            section.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Image loading animation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
    });

    // Scroll reveal animation
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

    document.querySelectorAll('.content-section, .feature-card, .tech-item, .challenge-card, .impact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Mouse trail effect
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.1;
        trailY += dy * 0.1;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(animate);
    }

    animate();

    // Add styles for mouse trail
    const style = document.createElement('style');
    style.textContent = `
        .mouse-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0, 255, 157, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            filter: blur(5px);
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s;
        }
    `;
    document.head.appendChild(style);

    // Enhanced 3D canvas animations
    const canvas3d = document.querySelector('#genai-3d, #ambulance-3d');
    if (canvas3d) {
        let rotationX = 0;
        let rotationY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { width, height } = window;
            
            targetRotationX = (clientY / height - 0.5) * 20;
            targetRotationY = (clientX / width - 0.5) * 20;
        });

        function animate3D() {
            rotationX += (targetRotationX - rotationX) * 0.1;
            rotationY += (targetRotationY - rotationY) * 0.1;
            
            canvas3d.style.transform = `
                perspective(2000px)
                rotateX(${rotationX}deg)
                rotateY(${rotationY}deg)
            `;
            
            requestAnimationFrame(animate3D);
        }

        animate3D();
    }

    // Add particle effect to project header
    const header = document.querySelector('.project-header');
    if (header) {
        const particles = document.createElement('div');
        particles.className = 'particles';
        header.appendChild(particles);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particles.appendChild(particle);
        }

        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            .particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }
            .particle {
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-color);
                border-radius: 50%;
                opacity: 0.5;
                animation: float 10s infinite linear;
            }
            @keyframes float {
                0% {
                    transform: translateY(100%) translateX(0);
                    opacity: 0;
                }
                50% {
                    opacity: 0.5;
                }
                100% {
                    transform: translateY(-100%) translateX(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }
}); 