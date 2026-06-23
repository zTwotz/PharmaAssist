'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [longLoading, setLongLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.mustChangePassword) {
        router.push('/change-password');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Vui lòng nhập địa chỉ email hợp lệ.');
      return false;
    }
    
    if (password.length < 6) {
      setErrorMsg('Mật khẩu phải có độ dài tối thiểu 6 ký tự.');
      return false;
    }

    if (isRegistering && !fullName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password || (isRegistering && !fullName)) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setLongLoading(false);
    
    const timeoutId = setTimeout(() => {
      setLongLoading(true);
    }, 5000);

    try {
      if (isRegistering) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });

        if (error) throw error;
        
        clearTimeout(timeoutId);
        setSuccess(true);
        setErrorMsg('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận hoặc đăng nhập ngay.');
        setTimeout(() => {
          setIsRegistering(false);
          setSuccess(false);
          setErrorMsg('');
        }, 3000);
      } else {
        await login(email, password);
        clearTimeout(timeoutId);
        setSuccess(true);
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn('Auth warning:', err?.message || err);
      const status = err.response?.status;
      const message = err.response?.data?.message || err.message;

      if (status === 401) {
        setErrorMsg('Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.');
      } else if (status === 400 && Array.isArray(message)) {
        setErrorMsg(message.join(', '));
      } else if (message) {
        setErrorMsg(message);
      } else {
        setErrorMsg('Thao tác thất bại. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.');
      }
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
            <span className="text-2xl text-primary font-bold">P</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-ink mt-3">
            Pharma<span className="text-primary">Assist</span>
          </CardTitle>
          <CardDescription className="text-sm text-graphite">
            {isRegistering ? 'Đăng ký tài khoản mới' : 'Hệ thống quản lý nhà thuốc và cảnh báo tương tác thuốc thông minh'}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 px-6">
            {errorMsg && !success && (
              <Alert variant="destructive" className="bg-bloom-rose border-bloom-coral/30 text-bloom-deep">
                <ShieldAlert className="h-4 w-4 text-bloom-deep" />
                <AlertTitle className="font-semibold text-bloom-deep">Lỗi thao tác</AlertTitle>
                <AlertDescription className="text-bloom-wine text-xs mt-1">{errorMsg}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="font-semibold text-green-800">Thành công</AlertTitle>
                <AlertDescription className="text-green-700 text-xs mt-1">
                  {isRegistering ? errorMsg : 'Đăng nhập thành công! Đang chuyển hướng...'}
                </AlertDescription>
              </Alert>
            )}

            {longLoading && !success && !errorMsg && (
              <Alert className="bg-blue-50 border-blue-200 text-blue-800">
                <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                <AlertTitle className="font-semibold text-blue-800">Đang chờ phản hồi</AlertTitle>
                <AlertDescription className="text-blue-700 text-xs mt-1">
                  Máy chủ (Supabase) đang khởi động từ trạng thái nghỉ. Quá trình này có thể mất tới 30-40 giây, vui lòng kiên nhẫn đợi...
                </AlertDescription>
              </Alert>
            )}
            
            {isRegistering && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal uppercase tracking-wider" htmlFor="fullName">
                  Họ và tên
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={isRegistering}
                  disabled={loading}
                  className="h-11 rounded-md border border-hairline focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm font-sans"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal uppercase tracking-wider" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="email@pharmaassist.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="h-11 rounded-md border border-hairline focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm font-sans"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-charcoal uppercase tracking-wider" htmlFor="password">
                  Mật khẩu
                </label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="h-11 rounded-md border border-hairline focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-sm font-sans"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col px-6 pb-8 pt-4">
            <Button
              type="submit"
              className={`w-full font-semibold uppercase tracking-wider text-xs h-11 rounded-md transition-all shadow-md active:scale-[0.98] ${
                success 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-primary hover:bg-primary-deep text-white'
              }`}
              disabled={loading || (success && !isRegistering)}
            >
              {success && !isRegistering ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Thành công
                </>
              ) : loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                isRegistering ? 'Đăng ký tài khoản' : 'Đăng nhập'
              )}
            </Button>
            
            <div className="mt-4 text-center">
              <button 
                type="button" 
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setErrorMsg('');
                  setSuccess(false);
                }} 
                className="text-sm font-medium text-primary hover:underline bg-transparent border-none cursor-pointer"
              >
                {isRegistering ? 'Đã có tài khoản? Đăng nhập ngay' : 'Chưa có tài khoản? Đăng ký ngay'}
              </button>
            </div>

            <p className="mt-5 text-[11px] text-center text-graphite leading-relaxed">
              Hệ thống bảo mật nội bộ. Mọi truy cập trái phép sẽ bị ghi nhật ký.<br />
              &copy; {new Date().getFullYear()} PharmaAssist. All rights reserved.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
