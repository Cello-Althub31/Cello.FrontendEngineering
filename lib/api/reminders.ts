import axios from 'axios';
import { Reminder, ReminderPayload } from '../types/reminders';

const BASE_URL = 'https://your-api.com/api/medications';

export const getActiveReminders = async (): Promise<Reminder[]> => {
  const response = await axios.get(`${BASE_URL}?status=active`);
  return response.data;
};

export const createReminder = async (data: ReminderPayload): Promise<Reminder> => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateReminder = async (id: string, data: Partial<ReminderPayload>): Promise<Reminder> => {
  const response = await axios.patch(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteReminder = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};