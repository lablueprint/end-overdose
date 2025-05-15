import { create } from 'zustand';
import { NewStudent } from '@/types/newStudent';
import { NewSchoolAdmin } from '@/types/newSchoolAdmin';
import { NewEOAdmin } from '@/types/newEOAdmin';

export type role = 'student' | 'school_admin' | 'eo_admin' | '';

interface UserState {
    user: NewStudent | NewSchoolAdmin | NewEOAdmin | null;
    loading: boolean;
    role: role;
    token: string | null;
    uid: string;
    progress: number;
    setUser: (user: NewStudent | NewSchoolAdmin | NewEOAdmin | null) => void;
    setLoading: (loading: boolean) => void;
    setRole: (role: role) => void;
    setToken: (token: string | null) => void;
    setUID: (uid: string) => void;
    setProgress: (progress: number) => void;
}

export const useUserStore = create<UserState>()((set) => ({
    user: null,
    loading: true,
    role: '',
    token: null,
    uid: '',
    progress: 0,
    setUser: (user: NewStudent | NewSchoolAdmin | NewEOAdmin | null) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setRole: (role: role) => set({ role }),
    setToken: (token) => set({ token }),
    setUID: (uid) => set({ uid }),
    setProgress: (progress) => set({ progress }),
}));
