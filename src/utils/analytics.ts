declare global {
  interface Window {
    ym: (counterId: number, action: string, url: string) => void;
  }
}

export const YM_ACCOUNT_ID = 56585698;

export const trackPageView = (url: string): void => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YM_ACCOUNT_ID, 'hit', url);
  }
};

export const trackEvent = (category: string, action: string): void => {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(YM_ACCOUNT_ID, 'reachGoal', `${category}_${action}`);
  }
}; 