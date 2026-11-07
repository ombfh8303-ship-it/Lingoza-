import { useCallback, useMemo, useState } from 'react';

const STORAGE_KEY = 'lingoza_smart_review_v1';
const readItems = () => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch { return []; }
};
const writeItems = (items) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
};
const intervals = [1, 3, 7, 14, 30];

export default function useSmartReview(unitId = 'unit-1') {
  const [items, setItems] = useState(readItems);
  const persist = useCallback((updater) => {
    setItems(previous => {
      const next = typeof updater === 'function' ? updater(previous) : updater;
      writeItems(next);
      return next;
    });
  }, []);

  const recordAnswer = useCallback((question, { lessonId, lessonTitle, correct, isReview = false } = {}) => {
    if (!question?.id) return;
    const now = Date.now();
    persist(previous => {
      const index = previous.findIndex(item => item.id === question.id && item.unitId === unitId);
      if (index < 0 && correct) return previous;
      const next = [...previous];
      if (index < 0) {
        next.push({
          id: question.id, unitId, lessonId, lessonTitle,
          question, streak: 0, attempts: 1, correctCount: 0,
          createdAt: now, lastReviewedAt: now, dueAt: now + 10 * 60 * 1000
        });
        return next;
      }
      const item = next[index];
      const streak = correct ? (item.streak || 0) + 1 : 0;
      const intervalDays = correct ? intervals[Math.min(streak - 1, intervals.length - 1)] : 0;
      next[index] = {
        ...item,
        lessonId: lessonId || item.lessonId,
        lessonTitle: lessonTitle || item.lessonTitle,
        question: question || item.question,
        streak,
        attempts: (item.attempts || 0) + 1,
        correctCount: (item.correctCount || 0) + (correct ? 1 : 0),
        lastReviewedAt: now,
        dueAt: correct ? now + intervalDays * 86400000 : now + 10 * 60 * 1000
      };
      return next;
    });
  }, [persist, unitId]);

  const dueItems = useMemo(() => items
    .filter(item => item.unitId === unitId && item.dueAt <= Date.now())
    .sort((a,b) => a.dueAt - b.dueAt), [items, unitId]);

  const pendingItems = useMemo(() => items.filter(item => item.unitId === unitId), [items, unitId]);
  return { dueItems, pendingItems, recordAnswer };
}
