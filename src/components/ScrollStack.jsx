import { useLayoutEffect, useRef, useCallback } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 24,
  itemScale = 0.018,
  itemStackDistance = 32,
  stackPosition = '18%',
  scaleEndPosition = '10%',
  baseScale = 0.92,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const tickingRef = useRef(false);

  const initialOffsetsRef = useRef([]);
  const endElementOffsetRef = useRef(0);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY || window.pageYOffset || 0,
        containerHeight: window.innerHeight || 800,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller?.scrollTop || 0,
        containerHeight: scroller?.clientHeight || 0,
      };
    }
  }, [useWindowScroll]);

  const measureOffsets = useCallback(() => {
    const scroller = scrollerRef.current;
    const cards = cardsRef.current;
    if (!scroller || !cards || !cards.length) return;

    // Temporarily reset transforms to read true layout position
    const previousTransforms = cards.map(c => c.style.transform);
    cards.forEach(c => {
      c.style.transform = 'none';
    });

    const scrollY = window.scrollY || window.pageYOffset || 0;
    initialOffsetsRef.current = cards.map(card => {
      if (useWindowScroll) {
        return card.getBoundingClientRect().top + scrollY;
      } else {
        return card.offsetTop;
      }
    });

    const endElement = scroller.querySelector('.scroll-stack-end');
    if (endElement) {
      endElementOffsetRef.current = useWindowScroll
        ? endElement.getBoundingClientRect().top + scrollY
        : endElement.offsetTop;
    }

    // Restore previous transforms
    cards.forEach((c, i) => {
      c.style.transform = previousTransforms[i] || '';
    });
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    tickingRef.current = false;
    const cards = cardsRef.current;
    if (!cards || !cards.length) return;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endElementOffsetRef.current || 0;
    const totalCards = cards.length;
    const commonPinEnd = Math.max(0, endElementTop - stackPositionPx - itemStackDistance * totalCards);

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = initialOffsetsRef.current[i] || 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = commonPinEnd;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = Math.max(0.75, 1 - scaleProgress * (1 - targetScale));
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = initialOffsetsRef.current[j] || 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && (pinEnd <= pinStart || scrollTop <= pinEnd);

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd && pinEnd > pinStart) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 10) / 10,
        blur: Math.round(blur * 10) / 10
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.05 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.0005 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.05 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.05;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        if (blurAmount) card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && (pinEnd <= pinStart || scrollTop <= pinEnd);
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData
  ]);

  const requestUpdate = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      animationFrameRef.current = requestAnimationFrame(updateCardTransforms);
    }
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.zIndex = `${i + 1}`;
      card.style.transform = 'translate3d(0, 0, 0)';
    });

    measureOffsets();
    requestUpdate();

    const scrollTarget = useWindowScroll ? window : scroller;
    const handleScroll = () => requestUpdate();
    const handleResize = () => {
      measureOffsets();
      requestUpdate();
    };

    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      tickingRef.current = false;
    };
  }, [
    itemDistance,
    useWindowScroll,
    measureOffsets,
    requestUpdate
  ]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
