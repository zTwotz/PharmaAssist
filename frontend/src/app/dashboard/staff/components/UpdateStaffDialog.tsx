'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function UpdateStaffDialog({
  isOpen,
  onClose,
  staff,
  roles,
  onUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  staff: any;
  roles: any[];
  onUpdate: (id: string, data: any) => void;
}) {
  const currentRole = staff?.userRoles?.[0]?.roleId?.toString() || '';
  const currentStatus = staff?.status || 'ACTIVE';

  const [roleId, setRoleId] = useState<string>(currentRole);
  const [status, setStatus] = useState<string>(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onUpdate(staff.id, {
        roleId: roleId ? parseInt(roleId, 10) : undefined,
        status,
      });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật vai trò & trạng thái</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Nhân viên</label>
            <div className="text-sm text-gray-500">
              {staff?.fullName} ({staff?.username})
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Vai trò (Role)</label>
            <Select value={roleId} onValueChange={(val) => setRoleId(val || '')}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id.toString()}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Trạng thái</label>
            <Select value={status} onValueChange={(val) => setStatus(val || '')}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Hoạt động (ACTIVE)</SelectItem>
                <SelectItem value="INACTIVE">Vô hiệu hóa (INACTIVE)</SelectItem>
                <SelectItem value="SUSPENDED">Đình chỉ (SUSPENDED)</SelectItem>
                <SelectItem value="BANNED">Cấm vĩnh viễn (BANNED)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-primary">
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
