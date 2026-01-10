import { useState, useEffect } from 'react';

interface UsageLimit {
  count: number;
  lastResetDate: string;
}

const STORAGE_KEY = 'lifekline_usage_limit';
const MAX_FREE_USAGE = 2;

export function useUsageLimit() {
  const [usageData, setUsageData] = useState<UsageLimit>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return { count: 0, lastResetDate: new Date().toDateString() };
  });

  const [isPremium, setIsPremium] = useState<boolean>(() => {
    return !!localStorage.getItem('lifekline_api_key');
  });

  useEffect(() => {
    const today = new Date().toDateString();
    if (usageData.lastResetDate !== today) {
      const newData = { count: 0, lastResetDate: today };
      setUsageData(newData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    }
  }, [usageData.lastResetDate]);

  const incrementUsage = () => {
    if (isPremium) return true;
    
    const newCount = usageData.count + 1;
    const newData = { ...usageData, count: newCount };
    setUsageData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    return newCount <= MAX_FREE_USAGE;
  };

  const canUse = isPremium || usageData.count < MAX_FREE_USAGE;
  const remainingFreeUses = Math.max(0, MAX_FREE_USAGE - usageData.count);

  const upgradeToPremium = (apiKey: string) => {
    localStorage.setItem('lifekline_api_key', apiKey);
    setIsPremium(true);
  };

  return {
    canUse,
    remainingFreeUses,
    isPremium,
    incrementUsage,
    upgradeToPremium,
    MAX_FREE_USAGE,
  };
}
