import { useState, useRef, useCallback } from 'react';
import { PanInfo } from 'framer-motion';

export const useIconReorder = <T extends { id: string }>(initialItems: T[]) => {
  const [items, setItems] = useState<T[]>(initialItems);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [previewTargetIdx, setPreviewTargetIdx] = useState<number | null>(null);
  const [showDragHint, setShowDragHint] = useState(false);

  const iconRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const capturedRects = useRef<Record<string, DOMRect>>({});
  const gridRef = useRef<HTMLElement | null>(null);
  const iconDragged = useRef(false);

  const captureRects = useCallback(() => {
    for (const [id, el] of Object.entries(iconRefs.current)) {
      if (el) capturedRects.current[id] = el.getBoundingClientRect();
    }
  }, []);

  const getTargetIdx = useCallback((draggedId: string, info: PanInfo, cols = 3): number => {
    const rect = capturedRects.current[draggedId];
    if (!rect || !gridRef.current) return -1;
    const cx = rect.left + rect.width / 2 + info.offset.x;
    const cy = rect.top + rect.height / 2 + info.offset.y;
    const grid = gridRef.current.getBoundingClientRect();
    const numRows = Math.ceil(items.length / cols);
    const col = Math.max(0, Math.min(cols - 1, Math.floor((cx - grid.left) / (grid.width / cols))));
    const row = Math.max(0, Math.min(numRows - 1, Math.floor((cy - grid.top) / (grid.height / numRows))));
    return row * cols + col;
  }, [items.length]);

  return {
    items,
    setItems,
    draggingId,
    setDraggingId,
    previewTargetIdx,
    setPreviewTargetIdx,
    showDragHint,
    setShowDragHint,
    iconRefs,
    gridRef,
    iconDragged,
    captureRects,
    getTargetIdx
  };
};
