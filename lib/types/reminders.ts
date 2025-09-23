export type Reminder = {
  _id: string;
  name: string;
  dosage: string;
  times: string[]; // ISO date strings
};

export type ReminderPayload = {
  name: string;
  dosage: string;
  times: string[];
};