import React, { useState, useRef } from "react";
import { UploadCloud, File, X, CheckSquare, ArrowLeft } from "lucide-react";
import type { MyAssignmentResponse } from "../types/api-response";

interface FileUploadDoingViewProps {
  assignment: MyAssignmentResponse;
  onBack: () => void;
  onSubmitSuccess: () => void;
}

const FileUploadDoingView: React.FC<FileUploadDoingViewProps> = ({ assignment, onBack, onSubmitSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 25 * 1024 * 1024) {
        alert("Kích thước tệp tin vượt quá giới hạn cho phép (25MB)!");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Vui lòng tải lên file bài làm!");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("Uploading file for Assignment ID:", assignment.id, file.name);
      onSubmitSuccess();
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Khu vực đính kèm tập tin</label>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".zip,.rar,.pdf"
          className="hidden"
        />

        {!file ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 hover:border-purple-500 rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer bg-slate-50/50 hover:bg-purple-50/10 transition-all group"
          >
            <UploadCloud size={32} className="text-slate-400 group-hover:text-purple-500 transition-colors" />
            <span className="text-xs font-bold text-slate-600 group-hover:text-purple-600">Bấm để duyệt tệp tin bài làm</span>
            <span className="text-[10px] text-slate-400">Chấp nhận định dạng hệ thống: .zip, .rar, .pdf (Tối đa 25MB)</span>
          </div>
        ) : (
          <div className="border border-purple-200 bg-purple-50/30 rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-purple-600 text-white rounded-lg flex-shrink-0">
                <File size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 truncate">{file.name}</p>
                <p className="text-[10px] text-slate-400 font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-1.5 hover:bg-purple-100 rounded-lg text-slate-500 hover:text-rose-600 transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-colors"
        >
          <ArrowLeft size={14} /> Quay lại
        </button>
        <button
          onClick={handleSubmit}
          disabled={isUploading || !file}
          className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-bold shadow-sm shadow-purple-600/10 transition-all flex items-center justify-center gap-1.5"
        >
          <CheckSquare size={14} /> {isUploading ? "Đang xử lý tải lên..." : `Xác nhận nộp file (${assignment.maxScore}đ)`}
        </button>
      </div>
    </div>
  );
};

export default FileUploadDoingView;