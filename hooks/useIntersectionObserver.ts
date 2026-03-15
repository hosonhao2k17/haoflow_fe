"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface UseIntersectionObserverOptions {
  /** Gọi callback một lần rồi ngừng observe (mặc định true) */
  once?: boolean;
  /** % element visible để coi là "intersecting" (0–1, mặc định 0.1) */
  threshold?: number;
  /** Margin quanh viewport (vd. "50px" để fire sớm hơn) */
  rootMargin?: string;
  /** Element gốc thay vì viewport (vd. scroll container) */
  root?: Element | null;
}

/**
 * Intersection Observer: theo dõi khi element vào/ra viewport.
 * Dùng khi cần "khi user scroll tới và thấy element thì làm gì đó" (vd. đánh dấu đã xem, lazy load).
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  onIntersect: () => void,
  options: UseIntersectionObserverOptions = {}
) {
  const {
    once = true,
    threshold = 0.1,
    rootMargin = "0px",
    root = null,
  } = options;

  const didFire = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        if (once && didFire.current) return;

        didFire.current = true;
        onIntersect();

        if (once) observer.disconnect();
      },
      { threshold, rootMargin, root }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, onIntersect, once, threshold, rootMargin, root]);
}
