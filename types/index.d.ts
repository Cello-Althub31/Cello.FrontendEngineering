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
