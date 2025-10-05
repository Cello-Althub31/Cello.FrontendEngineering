interface CreateProfileRequest {
  fullName: string;
  dateOfBirth: string; 
  gender: string;
  genotype: string;
  diagnosis: string;
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
  times: string[];
  notificationSettings: {"snoozeMinutes": number};
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