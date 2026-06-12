'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { supabase } from '@/lib/supabase';
import { authService } from '@/lib/auth-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldAlert, KeyRound } from 'lucide-react';

export default function ChangePasswordPage() {
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateForm = () => {
    if (newPassword.length < 6) {
      setErrorMsg('Mật khẩu mới phải có độ dài tối thiểu 6 ký tự.');
      return false;
    }
    
    if (newPassword !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      return false;
    }
    return true;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newPassword || !confirmPassword) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        throw error;
      }

      await authService.clearMustChangePassword();
      
      // Use window.location.href to force a full reload so AuthContext refetches getMe()
      window.location.href = '/dashboard';
    } catch (err: any) {
      console.error('Change password error:', err);
      setErrorMsg(err.message || 'Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cloud px-4 py-12 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[30%] h-[150%] bg-primary opacity-5 transform rotate-[25deg] hidden lg:block pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[25%] h-[150%] bg-primary opacity-5 transform rotate-[25deg] hidden lg:block pointer-events-none"></div>

      <Card className="w-full max-w-md shadow-lg border border-hairline rounded-xl bg-white relative z-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-xl"></div>
        
        <CardHeader className="space-y-2 text-center pt-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-ink mt-3">
            Thiết lập mật khẩu
          </CardTitle>
          <CardDescription className="text-sm text-graphite">
            Vui lòng đổi mật khẩu mới cho lần đăng nhập đầu tiên để bảo vệ tài khoản của bạn.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleChangePassword}>
          <CardContent className="space-y-4 px-6">
            {errorMsg && (
              <Alert variant="destructive" className="bg-bloom-rose border-bloom-coral/30 text-bloom-deep">
                <ShieldAlert className="h-4 w-4 text-bloom-deep" />
                <AlertTitle className="font-semibold text-bloom-deep">Lỗi</AlertTitle>
                <AlertDescription className="text-bloom-wine text-xs mt-1">{errorMsg}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal uppercase tracking-wider" htmlFor="newPassword">
                Mật khẩu mới
              </label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
                className="h-11 rounded-md border border-hairline focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm font-sans"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal uppercase tracking-wider" htmlFor="confirmPassword">
                Xác nhận mật khẩu mới
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                className="h-11 rounded-md border border-hairline focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm font-sans"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col px-6 pb-8 pt-4">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-deep text-white font-semibold uppercase tracking-wider text-xs h-11 rounded-md transition-all shadow-md active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                'Cập nhật mật khẩu'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
