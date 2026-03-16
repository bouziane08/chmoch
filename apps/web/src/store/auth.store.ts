//apps/web/src/store/
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/auth';
import { authApi } from '@/lib/api/auth';
import Cookies from 'js-cookie';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearAuth: () => void; // دالة مساعدة لتنظيف الحالة
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      // دالة لتنظيف كل شيء عند الخطأ أو تسجيل الخروج
      clearAuth: () => {
        Cookies.remove('access_token', { path: '/' });
        Cookies.remove('refresh_token', { path: '/' });

        // تنظيف التخزين المحلي لمنع التضارب عند إعادة التحميل
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
        }

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setAuth: (user, accessToken, refreshToken) => {
        // تخزين التوكنز في الكوكيز للميدل وير
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

        set({
          user,
          token: accessToken,
          isAuthenticated: true,
          isLoading: false,
        });

        // ملاحظة: التوجيه يفضل أن يكون في المكون نفسه (Component) باستخدام router.push
        // ولكن إذا أردت استخدامه هنا:
        if (typeof window !== 'undefined') {
          window.location.href = '/dashboard';
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch (_error) {
          console.error(
            'Logout failed on server, clearing local session anyway',
          );
        } finally {
          get().clearAuth();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      },

      checkAuth: async () => {
        // إذا كان هناك فحص جاري، لا تبدأ فحصاً جديداً
        set({ isLoading: true });

        const token = Cookies.get('access_token');

        // إذا لم يوجد توكن في الكوكيز، لا تحاول الاتصال بالسيرفر
        if (!token) {
          get().clearAuth();
          return;
        }

        try {
          const user = await authApi.getMe();
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: unknown) {
          console.error('Authentication check failed:', error);

          // إذا أعاد السيرفر 401، فهذا يعني أن التوكن (والـ refresh) غير صالحين
          get().clearAuth();

          // كسر الحلقة: التوجه للوجن فقط إذا كنا في صفحة محمية
          if (
            typeof window !== 'undefined' &&
            window.location.pathname.startsWith('/dashboard')
          ) {
            window.location.href = '/login';
          }
        }
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // لا تخزن التوكن في localStorage، اعتمد على الكوكيز كمصدر وحيد للحقيقة
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false;
        }
      },
    },
  ),
);
