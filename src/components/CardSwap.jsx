import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useCallback } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.2,
  zIndex: total - i
});

const placeNow = (el, slot, skew) => {
  if (!el) return;
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });
};

const CardSwap = ({
  width = 680,
  height = 200,
  cardDistance = 28,
  verticalDistance = 18,
  delay = 0,
  pauseOnHover = true,
  scrollDriven = true,
  onCardClick,
  skewAmount = 2,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.95)',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.85,
          returnDelay: 0.04
        }
      : {
          ease: 'power2.inOut',
          durDrop: 0.6,
          durMove: 0.6,
          durReturn: 0.6,
          promoteOverlap: 0.5,
          returnDelay: 0.15
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const isAnimatingRef = useRef(false);

  const swap = useCallback(() => {
    if (order.current.length < 2 || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const [front, ...rest] = order.current;
    const elFront = refs[front]?.current;
    if (!elFront) {
      isAnimatingRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });
    tlRef.current = tl;

    // Drop front card down cleanly by 260px
    tl.to(elFront, {
      y: '+=260',
      duration: config.durDrop,
      ease: config.ease
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx]?.current;
      if (!el) return;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `promote+=${i * 0.06}`
      );
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        if (elFront) gsap.set(elFront, { zIndex: backSlot.zIndex });
      },
      undefined,
      'return'
    );
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );

    tl.call(() => {
      order.current = [...rest, front];
    });
  }, [cardDistance, verticalDistance, config, refs]);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });
  }, [cardDistance, verticalDistance, skewAmount, refs]);

  useEffect(() => {
    if (!scrollDriven) return;

    let lastScrollY = window.scrollY || window.pageYOffset || 0;
    let accumulatedScroll = 0;
    const threshold = 130;

    const handleScroll = () => {
      const node = container.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      if (rect.top > windowHeight || rect.bottom < 0) return;

      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (delta > 0) {
        accumulatedScroll += delta;
        if (accumulatedScroll >= threshold) {
          accumulatedScroll = 0;
          swap();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDriven, swap]);

  useEffect(() => {
    if (scrollDriven || delay <= 0) return;

    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      if (node) {
        const pause = () => {
          tlRef.current?.pause();
          clearInterval(intervalRef.current);
        };
        const resume = () => {
          tlRef.current?.play();
          intervalRef.current = window.setInterval(swap, delay);
        };
        node.addEventListener('mouseenter', pause);
        node.addEventListener('mouseleave', resume);
        return () => {
          node.removeEventListener('mouseenter', pause);
          node.removeEventListener('mouseleave', resume);
          clearInterval(intervalRef.current);
        };
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [delay, pauseOnHover, scrollDriven, swap]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width: '100%', maxWidth: width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            swap();
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width: '100%', maxWidth: width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
