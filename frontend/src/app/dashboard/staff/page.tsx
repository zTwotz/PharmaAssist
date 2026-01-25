'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UpdateStaffDialog } from './components/UpdateStaffDialog';
import { getCookie } from 'cookies-next';
import { useAuth } from '@/context/auth-context';

export default function StaffListPage() {
  const [staffs, setStaffs] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { hasRole } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = getCookie('auth_token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Fetch staffs
      const staffRes = await fetch('http://localhost:3001/users/staff', { headers });
      if (staffRes.ok) {
        const data = await staffRes.json();
        setStaffs(data);
      }

      // Fetch roles
      const roleRes = await fetch('http://localhost:3001/roles', { headers });
      if (roleRes.ok) {
        const roleData = await roleRes.json();
        setRoles(roleData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    try {
      const token = getCookie('auth_token');
      const res = await fetch(`http://localhost:3001/users/staff/${id}/role-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await fetchData(); // Refresh data
      } else {
        alert('Cập nhật thất bại');
      }
    } catch (error) {
      console.error(error);
      alert('Đã xảy ra lỗi');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500';
      case 'INACTIVE':
        return 'bg-gray-500';
      case 'SUSPENDED':
        return 'bg-yellow-500';
      case 'BANNED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách nhân viên</h1>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ tên</TableHead>
              <TableHead>Tài khoản</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : staffs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  Không có nhân viên nào.
                </TableCell>
              </TableRow>
            ) : (
              staffs.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.fullName}</TableCell>
                  <TableCell>{staff.username}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>
                    {staff.userRoles?.map((ur: any) => (
                      <Badge key={ur.id} variant="outline" className="mr-1">
                        {ur.role.name}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(staff.status)} text-white`}>
                      {staff.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {hasRole(['ADMIN']) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedStaff(staff);
                          setIsDialogOpen(true);
                        }}
                      >
                        Cập nhật
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedStaff && (
        <UpdateStaffDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedStaff(null);
          }}
          staff={selectedStaff}
          roles={roles}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
