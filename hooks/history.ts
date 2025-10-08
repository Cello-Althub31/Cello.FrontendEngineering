import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export type HistoryEntry = {
  id: string;
  date: string;
  time: string;
  status: 'Completed' | 'Skipped';
};

const STORAGE_KEY = 'history_entries';

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) setEntries(JSON.parse(data));
  };

  const addEntry = async (entry: HistoryEntry) => {
    const updated = [...entries, entry];
    setEntries(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearHistory = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setEntries([]);
  };

  return { entries, addEntry, clearHistory };
}