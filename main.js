// main.js - دالة Scroll Reveal وقائمة الهامبرغر

document.addEventListener('DOMContentLoaded', () => {

    // 1. Hamburger Menu Toggle Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a'); // جميع الروابط داخل القائمة

    // فتح/إغلاق القائمة عند النقر على الهامبرغر
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        // تغيير أيقونة الهامبرغر إلى X عند الفتح
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // إغلاق القائمة عند النقر على أي رابط (لتسهيل التنقل في الموبايل)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });


    // 2. Smooth Scroll for Navbar links 
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Scroll with an offset for the fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20; // -20px for extra space

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Observer for Scroll Animation (محدث لتكرار الحركة في كل مرة)
    const elementsToAnimate = document.querySelectorAll(
        // العناصر الرئيسية
        '#services h2, #services p, #about h2, #about p, #areas h2, #areas p, #contact h2, #contact p, #contact h3, ' +
        
        // عناصر الأقسام
        '.mission-box, .about-image, .service-card, .contact-form-wrapper, .faq-container, ' +
        
        // الأزرار والنصوص داخل الـ Hero
        '#hero h1, #hero p, .hero-buttons-wrapper a, ' +
        
        // القوائم والعناصر الفرعية
        '.feature-list .feature-item, ' + 
        '.contact-info-wrapper h3, .contact-info-item, ' +
        '#areas .container div, #areas .container p:last-of-type'
    );
    
    // تم حذف observer.unobserve(entry.target); وإضافة شرط else لإعادة الحركة
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element entered view: show it (تفعيل الحركة)
                entry.target.classList.add('animate-reveal'); 
            } else {
                // Element left view: hide it (إعادة التعيين استعداداً للحركة التالية)
                entry.target.classList.remove('animate-reveal');
            }
        });
    }, {
        threshold: 0.1 
    });

    elementsToAnimate.forEach(element => {
        // إضافة الفئة 'animate-on-scroll' وضمان تفعيل المراقبة
        if (!element.classList.contains('animate-on-scroll')) {
             element.classList.add('animate-on-scroll');
        }
        observer.observe(element);
    });
    
    
    // 4. Accordion Functionality (FAQ)
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // إغلاق كل العناصر المفتوحة أولاً (لفتح عنصر واحد فقط)
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = 0;
                }
            });

            // فتح أو إغلاق العنصر الحالي
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');

            if (item.classList.contains('active')) {
                // الفتح: تعيين الارتفاع ليتناسب مع المحتوى
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                // الإغلاق: إعادة الارتفاع إلى صفر
                content.style.maxHeight = 0;
            }
        });
    });
});

// 3. Observer for Scroll Animation (محدث لتكرار الحركة في كل مرة)
    const elementsToAnimate = document.querySelectorAll(
        // العناصر الرئيسية
        '#services h2, #services p, #about h2, #about p, #areas h2, #areas p, #contact h2, #contact p, #contact h3, ' +
        
        // عناصر الأقسام الجديدة (عزل الخزانات)
        '#tank-insulation h2, #tank-insulation h3, #tank-insulation p, .insulation-image-wrapper, .insulation-text-content a, ' + 
        
        // عناصر قسم الأسئلة المتكررة (مهم)
        '#faq-section h2, #faq-section p, .faq-container, ' + 
        
        // عناصر الأقسام
        '.mission-box, .about-image, .service-card, .contact-form-wrapper, ' +
        
        // الأزرار والنصوص داخل الـ Hero
        '#hero h1, #hero p, .hero-buttons-wrapper a, ' +
        
        // القوائم والعناصر الفرعية
        '.feature-list .feature-item, ' + 
        '.contact-info-wrapper h3, .contact-info-item, ' +
        '#areas .container div, #areas .container p:last-of-type'
    );
    
    // ...