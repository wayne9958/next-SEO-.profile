'use client'
import { LogIn, X } from 'lucide-react';
import { useState } from 'react';

export function Hero() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [identity, setIdentity] = useState('');

  const handleLogin = () => {
    // 目前不定義登入邏輯
    console.log('身分:', identity);
    setShowLoginModal(false);
    setIdentity('');
  };

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
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
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
          <div className="w-32 h-32 rounded-full bg-slate-300 mx-auto"></div>
          
          <div className="text-center space-y-4">
            <h1 className="text-slate-900">您的名字</h1>
            <p className="text-xl text-slate-600">職位 / 專業領域</p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-slate-900 mb-4">關於我</h2>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}