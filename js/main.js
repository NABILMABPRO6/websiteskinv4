// SK'IN Morocco Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle'); // Use ID for consistency
    const mainNav = document.getElementById('main-nav'); // Use ID for consistency

    // --- Mobile Menu Toggle ---
    if (mobileMenuBtn && mainNav && header) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = mainNav.classList.toggle('active');
            header.classList.toggle('mobile-menu-open', isOpen); // Add class to header too if needed

            // Optional: Change icon on toggle
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu if clicking a link inside or outside on mobile
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = mobileMenuBtn.contains(event.target);
            const isNavLink = event.target.tagName === 'A' && mainNav.contains(event.target);

            if (mainNav.classList.contains('active')) {
                if ((!isClickInsideNav && !isClickOnToggle) || isNavLink) {
                    mainNav.classList.remove('active');
                    header.classList.remove('mobile-menu-open');
                    const icon = mobileMenuBtn.querySelector('i');
                     if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    }

    // --- Scroll Header Style Change ---
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    // Note: Native CSS scroll-behavior: smooth; is often sufficient
    // Keeping this JS version provides broader compatibility if needed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Allow normal behaviour for non-anchor links or simple #
            if (href === '#' || !href.startsWith('#') || href.length === 1) {
                return;
            }

            // Check if it's linking to the same page
            const currentPath = window.location.pathname.split('/').pop();
            const linkParts = href.split('#');
            const linkPath = linkParts[0];
            const targetId = linkParts[1];

            // Only prevent default and scroll if it's an anchor on the *current* page
            if (!linkPath || linkPath === currentPath || linkPath === '') {
                 e.preventDefault();

                 if (targetId) {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        // Calculate offset if header is fixed
                        const headerOffset = header ? header.offsetHeight : 0;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        // Close mobile menu if open after clicking anchor
                        if (mainNav && mainNav.classList.contains('active')) {
                             mainNav.classList.remove('active');
                             header.classList.remove('mobile-menu-open');
                             const icon = mobileMenuBtn.querySelector('i');
                             if (icon) {
                                icon.classList.remove('fa-times');
                                icon.classList.add('fa-bars');
                            }
                        }
                    }
                }
            }
            // Otherwise, let the browser handle navigation to a different page's anchor
        });
    });

});