export type UserRole = 'Super Admin' | 'Admin' | 'Editor' | 'Faculty' | 'Student';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  hodId?: string; // Reference to Faculty
  coverImage?: string;
  createdAt: any;
}

export interface FacultyPublication {
  title: string;
  journal: string;
  year: number;
  url?: string;
}

export interface Faculty {
  id: string;
  departmentId: string;
  name: string;
  designation: string;
  email: string;
  phone?: string;
  bio: string;
  image: string;
  specializations: string[];
  publications: FacultyPublication[];
  achievements: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface Program {
  id: string;
  departmentId: string;
  name: string;
  degree: string; // e.g. B.Tech, M.Tech, Ph.D, MBA
  duration: string; // e.g. 4 Years, 2 Years
  eligibility: string;
  feeStructure: string; // Markdown or JSON structure
  syllabusUrl?: string;
  createdAt: any;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  authorId: string;
  coverImage: string;
  status: 'draft' | 'published';
  publishedAt: any;
  createdAt: any;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string; // ISO string or Firestore Timestamp
  location: string;
  image: string;
  isRegistrationOpen: boolean;
  registeredUsers?: string[]; // user UIDs
  createdAt: any;
}

export interface Recruiter {
  name: string;
  logo: string;
}

export interface PlacementSuccessStory {
  studentName: string;
  program: string;
  companyName: string;
  packageLPA: number;
  testimonial: string;
  studentImage?: string;
}

export interface Placement {
  id: string; // typically the academic year, e.g. "2024-2025"
  year: string;
  recruiters: Recruiter[];
  highestPackage: number; // in LPA
  averagePackage: number; // in LPA
  placementPercentage: number;
  reportUrl?: string;
  successStories: PlacementSuccessStory[];
  createdAt: any;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  createdAt: any;
}

export interface GalleryImage {
  id: string;
  albumId: string;
  url: string;
  caption: string;
  uploadedAt: any;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  programOfInterest: string;
  message: string;
  status: 'new' | 'reviewed' | 'contacted' | 'resolved';
  createdAt: any;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g. "B.Tech Student, Class of 2024"
  quote: string;
  image?: string;
  createdAt: any;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'sports' | 'placement' | 'research';
  date: string;
  image?: string;
  createdAt: any;
}
