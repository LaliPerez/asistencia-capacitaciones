export interface Link {
  id: string;
  url: string;
  title: string;
  isLoading?: boolean;
}

export interface Attendee {
  name: string;
  email: string;
  dni: string;
  company: string;
  signature: string; // base64 data URL
}

export type AttendanceRecord = Record<string, {
  timestamp: string;
} | null>;
