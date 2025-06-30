// وظائف القائمة المتحركة للجوال
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggles = document.querySelectorAll('.mobile-menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    // إضافة مستمع الحدث لزر القائمة
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleMenu);
    });

    // إضافة مستمع الحدث لزر الإغلاق
    closeMenu?.addEventListener('click', toggleMenu);

    // إغلاق القائمة عند النقر على أي رابط
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !Array.from(menuToggles).some(toggle => toggle.contains(e.target))) {
            toggleMenu();
        }
    });

    // تحسين تجربة المستخدم على الأجهزة المحمولة
    function adjustForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        // تعديل ارتفاع منطقة الدردشة بناءً على حجم الشاشة
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages) {
            const viewportHeight = window.innerHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            const chatHeader = document.querySelector('.chat-header').offsetHeight;
            const inputArea = document.querySelector('.chat-input-area').offsetHeight;
            const quickReplies = document.querySelector('.quick-replies').offsetHeight;
            
            // حساب الارتفاع المناسب لمنطقة الرسائل
            let messagesHeight = viewportHeight - (headerHeight + chatHeader + inputArea + quickReplies + 40);
            messagesHeight = Math.max(messagesHeight, 250); // الحد الأدنى للارتفاع
            
            chatMessages.style.height = `${messagesHeight}px`;
        }
    }

    // تطبيق التعديلات عند تحميل الصفحة وتغيير حجم النافذة
    adjustForMobile();
    window.addEventListener('resize', adjustForMobile);
});