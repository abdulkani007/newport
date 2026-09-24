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

const CardSwap = ({
  width = 750,
  height = 300,
  cardDistance = 45,
  verticalDistance = 35,
  delay = 0,
  pauseOnHover = true,
  scrollDriven = true,
  onCardClick,
  skewAmount = 3,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.95)',
          durDrop: 1.0,
          durMove: 1.0,
          durReturn: 1.0,
          promoteOverlap: 0.85,
          returnDelay: 0.05
        }
      : {
          ease: 'power2.inOut',
          durDrop: 0.7,
          durMove: 0.7,
          durReturn: 0.7,
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
  const lastStepRef = useRef(0);
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

    tl.to(elFront, {
      y: '+=450',
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
        `promote+=${i * 0.08}`
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

    if (scrollDriven) {
      const handleScroll = () => {
        const node = container.current;
        if (!node) return;

        const rect = node.getBoundingClientRect();
        const windowHeight = window.innerHeight || 800;

        // Progress of node as user scrolls through viewport
        const start = windowHeight * 0.9;
        const end = -rect.height + windowHeight * 0.1;
        const totalDist = start - end;
        const currentDist = start - rect.top;

        const progress = Math.max(0, Math.min(0.99, currentDist / totalDist));
        const totalCards = childArr.length;
        const targetStep = Math.floor(progress * totalCards);

        if (targetStep > lastStepRef.current) {
          lastStepRef.current = targetStep;
          swap();
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else if (delay > 0) {
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
    }
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, scrollDriven, swap, childArr.length, refs]);

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
