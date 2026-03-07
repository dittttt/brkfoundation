import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const lenis = (window as any).__lenis as any;

    // 1. Pause Lenis so it stops driving scroll
    if (lenis) lenis.stop();

    // 2. Force native scroll to 0 instantly
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 3. After the browser paints, reset Lenis internals and restart
    const frame = requestAnimationFrame(() => {
      if (lenis) {
        // Reset Lenis internal tracked values
        lenis.scrollTo(0, { immediate: true, force: true });
        lenis.start();
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
