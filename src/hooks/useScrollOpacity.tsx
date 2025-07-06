import { useEffect } from "react";

export function useScrollOpacity() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionBottom = sectionTop + rect.height;

        // Remove existing classes
        section.classList.remove('current', 'scrolled');

        // If section is currently in view
        if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
          section.classList.add('current');
        }
        // If section has been scrolled past
        else if (sectionTop < scrollY) {
          section.classList.add('scrolled');
        }
      });
    };

    // Initial call
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
} 