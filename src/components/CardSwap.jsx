import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useCallback, useImperativeHandle } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
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

const CardSwap = forwardRef(({
  width = 620,
  height = 190,
  cardDistance = 35,
  verticalDistance = 45,
  scrollDriven = true,
  onCardClick,
  skewAmount = 2,
  easing = 'elastic',
  children
}, ref) => {
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const config =
    easing === 'elastic' && !isReducedMotion
      ? {
          ease: 'elastic.out(0.6,0.95)',
          durDrop: 0.7,
          durMove: 0.7,
          durReturn: 0.7,
          promoteOverlap: 0.85,
          returnDelay: 0.04
        }
      : {
          ease: 'power2.inOut',
          durDrop: isReducedMotion ? 0.2 : 0.5,
          durMove: isReducedMotion ? 0.2 : 0.5,
          durReturn: isReducedMotion ? 0.2 : 0.5,
          promoteOverlap: 0.5,
          returnDelay: 0.1
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const container = useRef(null);
  const isAnimatingRef = useRef(false);

  // Swap Forward (Scroll DOWN)
  const swapForward = useCallback(() => {
    if (order.current.length < 2 || isAnimatingRef.current) return false;
    isAnimatingRef.current = true;

    const [front, ...rest] = order.current;
    const elFront = refs[front]?.current;
    if (!elFront) {
      isAnimatingRef.current = false;
      return false;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        order.current = [...rest, front];
        isAnimatingRef.current = false;
      }
    });
    tlRef.current = tl;

    // Physical 3D card lift & rotate down
    tl.to(elFront, {
      y: '+=220',
      rotateZ: isReducedMotion ? 0 : 5,
      rotateX: isReducedMotion ? 0 : -8,
      z: 60,
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
          rotateZ: 0,
          rotateX: 0,
          duration: config.durMove,
          ease: config.ease
        },
        `promote+=${i * 0.04}`
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
        rotateZ: 0,
        rotateX: 0,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );

    return true;
  }, [cardDistance, verticalDistance, config, refs, isReducedMotion]);

  // Swap Backward (Scroll UP)
  const swapBackward = useCallback(() => {
    if (order.current.length < 2 || isAnimatingRef.current) return false;
    isAnimatingRef.current = true;

    const last = order.current[order.current.length - 1];
    const rest = order.current.slice(0, order.current.length - 1);
    const elLast = refs[last]?.current;
    if (!elLast) {
      isAnimatingRef.current = false;
      return false;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        order.current = [last, ...rest];
        isAnimatingRef.current = false;
      }
    });
    tlRef.current = tl;

    const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);

    // Demote rest cards back into their previous slots
    rest.forEach((idx, i) => {
      const el = refs[idx]?.current;
      if (!el) return;
      const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 0);
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          rotateZ: 0,
          rotateX: 0,
          duration: config.durMove,
          ease: config.ease
        },
        i * 0.04
      );
    });

    tl.set(elLast, { zIndex: frontSlot.zIndex + 2 }, 0);
    tl.to(
      elLast,
      {
        y: '+=220',
        rotateZ: isReducedMotion ? 0 : -5,
        rotateX: isReducedMotion ? 0 : 8,
        z: 80,
        duration: config.durDrop * 0.5,
        ease: 'power2.out'
      },
      0
    );

    tl.to(
      elLast,
      {
        x: frontSlot.x,
        y: frontSlot.y,
        z: frontSlot.z,
        rotateZ: 0,
        rotateX: 0,
        duration: config.durReturn,
        ease: config.ease
      },
      `>-=0.1`
    );

    return true;
  }, [cardDistance, verticalDistance, config, refs, isReducedMotion]);

  useImperativeHandle(ref, () => ({
    swapForward,
    swapBackward,
    isAnimating: () => isAnimatingRef.current
  }));

  // Initial layout placement
  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });
  }, [cardDistance, verticalDistance, skewAmount, refs]);

  // Controlled Wheel Interceptor & Scroll Threshold Handler
  useEffect(() => {
    if (!scrollDriven) return;
    const node = container.current;
    if (!node) return;

    // Wheel event handler (1 wheel notch = 1 card swap, locks multiple triggers)
    const handleWheel = (e) => {
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      if (Math.abs(delta) < 12) return;

      if (delta > 0) {
        const moved = swapForward();
        if (moved) e.preventDefault();
      } else if (delta < 0) {
        const moved = swapBackward();
        if (moved) e.preventDefault();
      }
    };

    // Touch events for mobile swiping
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      if (isAnimatingRef.current || !touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (Math.abs(deltaY) > 40) {
        if (deltaY > 0) {
          swapForward();
        } else {
          swapBackward();
        }
        touchStartY = 0;
      }
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    node.addEventListener('touchstart', handleTouchStart, { passive: true });
    node.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      node.removeEventListener('wheel', handleWheel);
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
      if (tlRef.current) tlRef.current.kill();
    };
  }, [scrollDriven, swapForward, swapBackward]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width: '100%', maxWidth: width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            swapForward();
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
});

CardSwap.displayName = 'CardSwap';

export default CardSwap;
