interface CreateProfileRequest {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  genotype: string;
  diagnosis: string;
}

interface IProfilePatch {
  name: string;
  bio: string;
  location: string;
}
interface MenuItemProps {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  alert?: boolean;
  action?: () => void;
  toggle?: boolean;
}
interface createMedicationReminderRequest {
  name: string;
  dosage: string;
  frequency: string;
  type: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  timeSlot: string;
  notificationSettings: { "snoozeMinutes": number };
}
interface createHydrationReminderRequest {
  targetLiters: number;
  reminderInterval: number; // in minutes
  timeRange: { start: string; end: string }; // e.g., { start: "08:00", end: "20:00" }
}
interface createDoctorAppointmentRequest {
  dateTime: string; // ISO string
  hospitalName: string;
  doctorName: string;


}
interface createEmergencyContactRequest {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  relationship: string;
}

interface IJournalEntry {
  folderId: string;
  entryDate: string;
  feeling: string;
  title: string;
  description: string;
  timeOfDay: string;
}

interface IJournalPatch {
  feeling: string,
  title: string,
  description: string
}