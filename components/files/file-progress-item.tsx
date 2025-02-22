import { FileProgressItemProps, UploadProgress } from "@/utils/types";
import { Progress } from "../ui/progress";
import { ConvertButton } from "../upload/convert-button";

// components/upload/file-progress-item.tsx

  
  export function FileProgressItem({
    file,
    progress,
    showButtons,
    isText,
    convertedText,
    onUpdateProgress,
    onConvertComplete,
    onConvertError,
    getStatusText,
  }: FileProgressItemProps) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="flex justify-between text-sm">
              <span className="truncate max-w-[300px]">{file.name}</span>
              <span className="text-muted-foreground ml-2 shrink-0">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
            {progress && (
              <div className="space-y-1">
                <Progress value={progress.progress} className="h-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{getStatusText(progress.status)}</span>
                  <span>{progress.progress}%</span>
                </div>
              </div>
            )}
          </div>
          {showButtons && isText && convertedText && (
            <ConvertButton
              text={convertedText}
              fileName={file.name}
              onProgress={(progress) => onUpdateProgress(file.name, progress)}
              onComplete={onConvertComplete}
              onError={onConvertError}
            />
          )}
        </div>
      </div>
    );
  }