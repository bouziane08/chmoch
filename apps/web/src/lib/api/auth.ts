import api from '@/lib/axios';
import { LoginDto, RegisterDto, AuthResponse, User } from '@/types/auth';
import Cookies from 'js-cookie';

export const authApi = {
  /**
   * تسجيل الدخول واستخراج التوكنز بشكل آمن
   */
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);

    // ✅ الـ interceptor حول response.data بالفعل
    // لذلك استخدم response.data مباشرة
    const loginData = response.data;

    const { accessToken, refreshToken, user } = loginData;

    if (!accessToken || !refreshToken) {
      console.error('البيانات القادمة من السيرفر ناقصة:', response.data);
      throw new Error('فشل تسجيل الدخول: لم يتم استلام التوكنز بشكل صحيح');
    }

    // حفظ التوكنز في الكوكيز
    Cookies.set('access_token', accessToken, {
      expires: 7,
      path: '/',
      sameSite: 'lax',
    });
    Cookies.set('refresh_token', refreshToken, {
      expires: 7,
      path: '/',
      sameSite: 'lax',
    });

    return { accessToken, refreshToken, user };
  },

  /**
   * تسجيل حساب جديد
   */
  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    return response.data; // ✅ مباشرة
  },

  /**
   * تسجيل الخروج وتنظيف الكوكيز
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (_error) {
      console.warn('فشل تسجيل الخروج من السيرفر، سيتم تنظيف الجلسة محلياً');
    } finally {
      Cookies.remove('access_token', { path: '/' });
      Cookies.remove('refresh_token', { path: '/' });
    }
  },

  /**
   * جلب بيانات المستخدم الحالي
   */
  async getMe(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data; // ✅ مباشرة
  },

  /**
   * طلب إعادة تعيين كلمة المرور
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data; // ✅ مباشرة
  },

  /**
   * إعادة تعيين كلمة المرور باستخدام التوكن
   */
  async resetPassword(
    token: string,
    password: string,
  ): Promise<{ message: string }> {
    const response = await api.post('/auth/reset-password', {
      token,
      newPassword: password,
    });
    return response.data; // ✅ مباشرة
  },
};