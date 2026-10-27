export type Language = 'en' | 'hi';

export interface SchoolSettings {
  schoolName: string;
  schoolNameHi: string;
  address: string;
  addressHi: string;
  pinCode: string;
  phone: string;
  email: string;
  board: string;
  boardHi: string;
  medium: string;
  mediumHi: string;
  classes: string;
  classesHi: string;
  schoolType: string;
  schoolTypeHi: string;
  principalName: string;
  principalMessage: string;
  principalMessageHi: string;
  heroTagline: string;
  heroTaglineHi: string;
  heroSubtext: string;
  heroSubtextHi: string;
  updatedAt?: string;
}

export interface Notice {
  id: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  category: 'academic' | 'examination' | 'admission' | 'holiday' | 'event' | 'general';
  publicationDate: string;
  attachmentUrl?: string;
  isPublished: boolean;
  isTicker?: boolean;
  createdAt?: string;
  createdBy?: string;
}

export interface AdmissionApplication {
  id?: string;
  applicationNumber: string;
  studentName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  fatherName: string;
  motherName: string;
  address: string;
  mobileNumber: string;
  previousSchool?: string;
  classApplyingFor: '9' | '10';
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  adminNotes?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export interface Staff {
  id: string;
  name: string;
  designation: string;
  designationHi?: string;
  department: string;
  qualification: string;
  biography?: string;
  photoUrl?: string;
  isPublished: boolean;
  order: number;
}

export interface SubjectMarks {
  code: string;
  name: string;
  theory: number;
  practical: number;
  total: number;
  max: number;
}

export interface Result {
  id: string;
  sessionId: string;
  sessionName?: string;
  rollNumber: string;
  studentName: string;
  dateOfBirth: string;
  class: '9' | '10';
  subjects: SubjectMarks[];
  totalMarks: number;
  maximumMarks: number;
  percentage: number;
  division: '1st Division' | '2nd Division' | '3rd Division' | 'Fail';
  resultStatus: 'PASS' | 'FAIL' | 'COMPARTMENT';
  publicationStatus: 'DRAFT' | 'PUBLISHED' | 'UNPUBLISHED';
  createdAt?: string;
}

export interface ExamSession {
  id: string;
  sessionName: string;
  class: '9' | '10';
  examinationName: string;
  year: number;
  status: 'ACTIVE' | 'CONCLUDED';
}

export interface GalleryImage {
  id: string;
  title: string;
  titleHi?: string;
  category: 'campus' | 'classroom' | 'library' | 'laboratory' | 'sports' | 'events';
  imageUrl: string;
  caption?: string;
  isPublished: boolean;
  createdAt?: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  titleHi?: string;
  category: 'syllabus' | 'admission_form' | 'academic_calendar' | 'model_paper' | 'circular';
  fileUrl: string;
  fileSize: string;
  fileType: string;
  isPublished: boolean;
  createdAt?: string;
}

export interface AuditLog {
  id: string;
  actorEmail: string;
  action: string;
  entityType: string;
  entityId?: string;
  details: string;
  timestamp: string;
}
