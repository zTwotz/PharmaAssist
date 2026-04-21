import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface AiDisclaimerProps {
  className?: string;
}

export const AiDisclaimer: React.FC<AiDisclaimerProps> = ({ className = '' }) => {
  return (
    <div className={`flex gap-2 items-start p-3 bg-amber-50 rounded border border-amber-200 text-amber-800 ${className}`}>
      <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
      <div className="text-xs leading-relaxed">
        <strong>Lưu ý an toàn:</strong> Cảnh báo và giải thích do AI Copilot tạo ra mang tính chất tham khảo. AI Copilot không chẩn đoán y tế và không thay thế quyết định chuyên môn của bác sĩ/dược sĩ. Hãy tự kiểm chứng thông tin trước khi thực hiện.
      </div>
    </div>
  );
};
