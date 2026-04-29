
import { useState } from 'react';
import { Button } from './ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';
import api from '@/lib/api';

export function MedicineImageUpload({ medicineId, currentImageUrl, onUploadSuccess }: { medicineId: number, currentImageUrl?: string, onUploadSuccess: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post(`/admin/storage/medicines/${medicineId}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploadSuccess(response.data.url);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 border p-4 rounded-md">
      <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
        {currentImageUrl ? (
          <img src={currentImageUrl} alt="Medicine" className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-8 h-8 text-gray-400" />
        )}
      </div>
      <div>
        <h4 className="text-sm font-medium mb-1">Medicine Image</h4>
        <p className="text-xs text-gray-500 mb-3">JPG, PNG up to 5MB</p>
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm" className="relative cursor-pointer" disabled={uploading}>
            {uploading ? 'Uploading...' : <><Upload className="w-4 h-4 mr-2" /> Upload</>}
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              accept="image/*" 
              onChange={handleUpload}
              disabled={uploading}
            />
          </Button>
          {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
      </div>
    </div>
  );
}
