// types/file.ts
import { ReactNode } from 'react';

// Basic File Types
export interface FileRecord {
  id: string;
  file_path: string;
  file_type: string;  // Made required
  original_name: string;  // Made required
  created_at: string;  // Made required
}

// Upload Related Types
export interface FileUploadProps {
  children?: ReactNode;
  onSuccess?: () => void;
}

export interface UploadFormProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  files: FileList | null;
  error: string | null;
  uploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: "uploading" | "converting" | "processing" | "complete" | "error";
  fileRecord?: FileRecord;
}

// Progress Related Types
export interface FileProgressItemProps {
  file: File;
  progress?: UploadProgress;
  showButtons: boolean;
  isText: boolean;
  convertedText?: string;
  onUpdateProgress: (fileName: string, progress: number) => void;
  onConvertComplete: () => void;
  onConvertError: (error: string) => void;
  getStatusText: (status: UploadProgress["status"]) => string;
}

export interface FileProgressListProps {
  files: FileList;
  uploadProgress: Record<string, UploadProgress>;
  convertedFiles: Record<string, string>;
  onUpdateProgress: (fileName: string, progress: number) => void;
  onConvertComplete: () => void;
  onConvertError: (error: string) => void;
}

// Dialog Related Types
export interface FileDialogProps {
  title?: string;
  file?: FileRecord | null;
  mode?: "upload" | "view";
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  content?: string;
}

// Stats Related Types
export interface FileStatsProps {
  files: FileRecord[];
}

export interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  subtitle?: string;
  href?: string;
}

// UI Component Props
export interface DeleteButtonProps {
  filePath: string;
  fileId: string;
  onComplete?: () => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  iconOnly?: boolean;
  onOptimisticDelete?: (fileId: string) => void;
}

export interface FileIconProps {
  type: string;
  size?: number;
}

export interface FileUploadHook {
  files: FileList | null;
  setFiles: (files: FileList | null) => void;
  uploading: boolean;
  handleUpload: () => Promise<string | null>;
  validateFiles: (files: FileList) => string | null;
}

export interface FileValidationRules {
  maxSize: number; // in bytes
  allowedTypes: string[];
}

export interface FileUploadError {
  code: 'SIZE_ERROR' | 'TYPE_ERROR' | 'UPLOAD_ERROR';
  message: string;
}