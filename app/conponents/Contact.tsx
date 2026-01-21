'use client'
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [activeTab, setActiveTab] = useState<'contact' | 'experience' | 'projects'>('contact');

  const exp = [
    { name: '天方', text: '前端工程師' }
  ];

  const projects = [
    { name: '台藝大', text: '台藝大師培作業' },
    { name: '排課', text: '高中職排課系統' }
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4 py-20">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 mb-4">聯繫方式與經歷</h2>
          <p className="text-slate-600">歡迎與我聯繫</p>
        </div>

        {/* 標籤頁切換 */}
        <div className="flex justify-center mb-8 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-8 py-3 relative ${
              activeTab === 'contact'
                ? 'text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            聯繫方式
            {activeTab === 'contact' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-8 py-3 relative ${
              activeTab === 'experience'
                ? 'text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            經歷
            {activeTab === 'experience' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-8 py-3 relative ${
              activeTab === 'projects'
                ? 'text-slate-900'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            過去開發項目
            {activeTab === 'projects' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></div>
            )}
          </button>
        </div>

        {/* 聯繫方式標籤內容 */}
        {activeTab === 'contact' && (
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-200 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">電子郵件</h3>
                    <p className="text-slate-600">your.email@example.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-200 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">電話</h3>
                    <p className="text-slate-600">+886 912-345-678</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-200 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">地址</h3>
                    <p className="text-slate-600">台灣，台北市</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-200 p-3 rounded-lg">
                    <Linkedin className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 mb-1">LinkedIn</h3>
                    <p className="text-slate-600">linkedin.com/in/yourprofile</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <a
                href="#"
                className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors"
              >
                下載履歷
              </a>
              <a
                href="#"
                className="border-2 border-slate-900 text-slate-900 px-8 py-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                聯繫我
              </a>
            </div>

            <div className="mt-12 flex justify-center gap-6">
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        )}

        {/* 經歷標籤內容 */}
        {activeTab === 'experience' && (
          <div className="space-y-8">
            {exp.map((item, index) => (
              <div key={index} className="flex items-start gap-6">
                <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0">
                  <circle cx="40" cy="40" r="38" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                  <text
                    x="40"
                    y="40"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-700"
                    style={{ fontSize: '18px', fontWeight: '500' }}
                  >
                    {item.name}
                  </text>
                </svg>
                <div className="flex-1 pt-2">
                  <p className="text-slate-700">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 過去開發��目標籤內容 */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            {projects.map((item, index) => (
              <div key={index} className="flex items-start gap-6">
                <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0">
                  <circle cx="40" cy="40" r="38" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                  <text
                    x="40"
                    y="40"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-700"
                    style={{ fontSize: item.name.length > 2 ? '16px' : '18px', fontWeight: '500' }}
                  >
                    {item.name}
                  </text>
                </svg>
                <div className="flex-1 pt-2">
                  <p className="text-slate-700">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}