import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  distance = 300,
  direction = 'horizontal',
  reverse = true,
  duration = 1.5,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 0.3,
  threshold = 0.1,
  delay = 0.2,
  onComplete,
  // valfria förbättringar
  once = true,
  rootMargin = '0px 0px -10% 0px',
  scroller = null, // sätt till en scrollcontainer (Element/selector) om du inte scrollar på window
}) => {
  const ref = useRef(null);
  const tweenRef = useRef(null); // spara vår tween/trigger

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ev. scroller-element
    let scrollerEl = scroller;
    if (typeof scroller === 'string') {
      scrollerEl = document.querySelector(scroller);
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    // initial state
    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      willChange: 'transform, opacity',
    });

    // skapa tween + ScrollTrigger för endast detta element
    const tween = gsap.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
      delay,
      onComplete,
      scrollTrigger: {
        trigger: el,
        start: `top ${startPct}%`,
        toggleActions: 'play none none none',
        once,
        invalidateOnRefresh: true,
        // scroller används bara om det finns
        ...(scrollerEl ? { scroller: scrollerEl } : {}),
        // Gör trigger lite mer tolerant om layout hoppar
        // markers: true, // (debugga vid behov)
      },
    });

    tweenRef.current = tween;

    // Vänta till nästa frame innan refresh så alla instanser hinner mounta
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // cleanup: döda bara VÅR tween/trigger, inte alla globalt
    return () => {
      if (tweenRef.current) {
        const st = tweenRef.current.scrollTrigger;
        st && st.kill();
        tweenRef.current.kill();
        tweenRef.current = null;
      }
      gsap.killTweensOf(el);
    };
    // Viktigt: om du vill återskapa animationen vid prop-ändringar kan du ha props i deps;
    // men håll den här listan kort för att undvika onödig recreate.
     
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete,
    once,
    rootMargin,
    scroller,
  ]);

  return <div ref={ref}>{children}</div>;
};

export default AnimatedContent;
