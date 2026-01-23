"use client";
import { LogIn, X } from "lucide-react";
import { useState, useEffect } from "react";
import useUserStore from "@/store/useUserStore";
import Image from "next/image";
import profilePic from "@/public/me.jpg"; // 也可以用 import
export function Hero() {
  const { login } = useUserStore(); // 1. 先從 Store 引入 login 方法
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [identity, setIdentity] = useState("");
  const handleLogin = () => {
    if (identity === "wei") {
      // 2. 在這裡傳入 identity 到 Store
      login({
        name: identity,
        role: "admin",
        loginTime: new Date().toLocaleTimeString(),
      });

      alert(`歡迎回來，${identity}！`);
    } else {
      alert("身分驗證失敗");
    }

    // 3. 清理 UI 狀態
    setShowLoginModal(false);
    setIdentity("");
  };
  const { userData, fetchUser, isLoading } = useUserStore();
  useEffect(() => {
    // 頁面載入時只抓一次，之後資料就會保存在 Store 裡
    if (!userData) {
      fetchUser("wei");
    }
  }, []);
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 relative text-slate-900">
        讀取中...
      </div>
    );
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 relative">
      <button
        onClick={() => setShowLoginModal(true)}
        className="absolute top-8 right-8 flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <LogIn className="w-5 h-5" />
        <span>登入</span>
      </button>

      {/* 登入彈窗 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-slate-900 mb-6">登入</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="identity" className="block text-slate-700 mb-2">
                  身分
                </label>
                <input
                  id="identity"
                  type="text"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900"
                  placeholder="請輸入身分"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                確認登入
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl w-full">
        <div className="space-y-6">
          <div className="relative w-32 h-32 rounded-full bg-slate-300 mx-auto">
            <Image
              className="relative w-32 h-32 rounded-full bg-slate-300 mx-auto"
              src={profilePic}
              alt="作者照片"
              fill
              // 本地圖片 import 後，Next 會自動偵測寬高，不需要手動寫 width/height
              placeholder="blur" // 載入前會顯示模糊預覽，超酷！
            />
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-slate-900">莊詠惟</h1>
            <p className="text-xl text-slate-600">前端工程師 / vue3、react</p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-slate-900 mb-4">關於我</h2>
            <div className="space-y-3">
              <p className="text-slate-700 leading-relaxed">
                過去主要使用vue3配合element-plus開發，詳細的經歷和過去項目可下滑查看，有與設計師和後端工程師合作經驗，
                目前正在嘗試用nextjs+figma
                make，自己產生設計與頁面，利用mongoDB去做簡單的資料庫處理
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
