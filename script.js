// script.js - 活泼多彩的交互
document.addEventListener('DOMContentLoaded', () => {
    // ========== 暗色模式切换 ==========
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // 检查本地存储
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-palette');
        icon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-palette');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-palette');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // ========== 移动菜单 ==========
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // 点击链接关闭菜单
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // ========== 导航激活状态 ==========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ========== 技能条动画 ==========
    const skillFills = document.querySelectorAll('.progress-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                fill.style.width = width + '%';
                skillObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });
    
    skillFills.forEach(fill => skillObserver.observe(fill));
    
    // ========== 滚动显示动画 ==========
    const animateElements = document.querySelectorAll('.service-card, .skill-item, .info-card, .fun-fact');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
    
    // ========== 表单提交 ==========
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 创建彩色提示
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a06cd5'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const alertDiv = document.createElement('div');
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.backgroundColor = randomColor;
        alertDiv.style.color = 'white';
        alertDiv.style.padding = '1rem 2rem';
        alertDiv.style.borderRadius = '40px';
        alertDiv.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        alertDiv.style.zIndex = '1000';
        alertDiv.style.animation = 'slideIn 0.3s ease';
        alertDiv.innerHTML = '✨ message sent! i\'ll reply within 24h';
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
        
        contactForm.reset();
    });
    
    // ========== 平滑滚动 ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // ========== 随机颜色点缀 ==========
    const badges = document.querySelectorAll('.role-badge');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a06cd5', '#ff6b98', '#f9a826'];
    
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.background = `linear-gradient(135deg, ${randomColor}, ${randomColor}dd)`;
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.background = ''; // 恢复原样
        });
    });
});