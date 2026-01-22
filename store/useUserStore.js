import { create } from 'zustand';
import api from '@/utils/axios';

// 這就相當於 Pinia 的 defineStore('user', { ... })
const useUserStore = create((set) => ({
  userData: null,
  isLoading: false,
  error: null,
  currentUser: null,
  isLoggedIn: false,
  isLoading: false,

  // Action: 純前端登入，直接接收資訊並存入
  login: (userInfo) => {
    set({ isLoading: true });
    
    // 模擬一點點讀取感
    set({ 
      currentUser: userInfo, 
      isLoggedIn: true, 
      isLoading: false 
    });
    
    // 選做：存入 sessionStorage，關閉分頁前都會記住登入狀態
    sessionStorage.setItem('user_session', JSON.stringify(userInfo));
  },

  // Action: 登出
  logout: () => {
    sessionStorage.removeItem('user_session');
    set({ currentUser: null, isLoggedIn: false });
  },
  // Action: 取得使用者資料
  fetchUser: async (id) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/user/${id}`);
      set({ userData: res.data, isLoading: false, error: null });
    } catch (err) {
      set({ error: "抓取失敗", isLoading: false });
    }
  },

  // Action: 更新使用者資料 (更新 Store 同時也更新資料庫)
  updateUser: (newData) => {
    set((state) => ({
      userData: { ...state.userData, ...newData }
    }));
  }
}));

export default useUserStore;