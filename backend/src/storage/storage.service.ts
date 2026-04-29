
import { Injectable, BadRequestException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || 'https://mock.supabase.co',
      process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock-key'
    );
  }

  async uploadMedicineImage(file: any, medicineId: number) {
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      throw new BadRequestException('File size must be less than 5MB');
    }

    const fileExt = file.originalname.split('.').pop();
    const fileName = `${medicineId}-${Date.now()}.${fileExt}`;
    const filePath = `medicines/${fileName}`;

    // Mock upload for tests if no real supabase url
    if (process.env.SUPABASE_URL === 'https://mock.supabase.co') {
      return { url: `https://mock.supabase.co/storage/v1/object/public/images/${filePath}` };
    }

    const { data, error } = await this.supabase.storage
      .from('images')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new BadRequestException('Failed to upload image: ' + error.message);
    }

    const { data: { publicUrl } } = this.supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return { url: publicUrl };
  }
}
