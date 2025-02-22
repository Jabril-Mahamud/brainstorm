import { FileRecord } from "./file";

// types/conversion.ts
export interface ConversionFile extends FileRecord {
    conversion_status: string;
    audio_file_path: string | null;
    voice_id: string | null;
    conversion_error: string | null;
  }
  
  export interface Voice {
    id: string;
    name: string;
  }
  
  export interface ConversionStatus {
    status: string;
    progress?: number;
    error?: string;
  }
  
  export interface ConversionResult {
    success: boolean;
    error?: string;
    audioPath?: string;
  }
  
  export interface ConversionInterfaceProps {
    initialFiles: ConversionFile[];
  }