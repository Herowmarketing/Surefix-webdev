import { useEffect, useState } from 'react';

export const KITCHEN_PROMOTION = {
  id: 'kitchen-sale-2026',
  eyebrow: 'Limited-Time Kitchen Sale',
  title: 'Save 10% on Your Kitchen Remodel',
  headline: '10% off, up to $2,000',
  promise: 'Prices will never be lower.',
  description:
    'Transform the heart of your home with custom design, expert craftsmanship, and Sure-Fix’s lowest kitchen pricing of the season.',
  startDate: new Date(2026, 6, 30, 0, 0, 0, 0),
  endDate: new Date(2026, 9, 31, 23, 59, 59, 999),
} as const;

export type KitchenPromotionState = {
  active: boolean;
  month: 'August' | 'September' | 'October';
  deadline: Date;
  deadlineLabel: string;
  validThrough: string;
};

function dateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getKitchenPromotion(now = new Date()): KitchenPromotionState {
  const active = now >= KITCHEN_PROMOTION.startDate && now <= KITCHEN_PROMOTION.endDate;
  const monthIndex = now.getMonth();

  const month: KitchenPromotionState['month'] =
    monthIndex >= 9 ? 'October' : monthIndex === 8 ? 'September' : 'August';
  const deadline =
    month === 'October'
      ? new Date(2026, 9, 31, 23, 59, 59, 999)
      : month === 'September'
        ? new Date(2026, 8, 30, 23, 59, 59, 999)
        : new Date(2026, 7, 31, 23, 59, 59, 999);

  return {
    active,
    month,
    deadline,
    deadlineLabel: `Ends ${month} ${deadline.getDate()}`,
    validThrough: dateOnly(deadline),
  };
}

export function useKitchenPromotion(): KitchenPromotionState {
  const [promotion, setPromotion] = useState(() => getKitchenPromotion());

  useEffect(() => {
    const update = () => setPromotion(getKitchenPromotion());
    const interval = window.setInterval(update, 60 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  return promotion;
}

export function kitchenPromotionDetails(state: KitchenPromotionState): string {
  return [
    `${KITCHEN_PROMOTION.headline}.`,
    KITCHEN_PROMOTION.promise,
    `${state.deadlineLabel}, 2026.`,
  ].join(' ');
}

export const KITCHEN_PROMOTION_TERMS =
  '10% discount applies up to a maximum savings of $2,000 on qualifying kitchen remodeling projects. Contact Sure-Fix for eligibility and complete offer details.';
