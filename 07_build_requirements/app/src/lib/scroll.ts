import type { WheelEvent } from 'react';

export function onHorizontalWheel(e: WheelEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  if (el.scrollWidth <= el.clientWidth) return;
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    el.scrollLeft += e.deltaY;
    e.preventDefault();
  }
}
