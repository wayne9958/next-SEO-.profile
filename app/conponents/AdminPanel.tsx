"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import useUserStore from "@/store/useUserStore";
import api from "@/utils/axios"; // 使用 @ 代表根目錄路徑（需檢查 tsconfig/jsconfig 設定）
export function AdminPanel() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    linkedin: "", // 注意資料庫區分大小寫，建議與 API 規範一致
  });
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "contact" | "experience" | "projects"
  >("contact");
  const {
    userData,
    fetchUser,
    isLoading,
    setUserData,
    isLoggedIn,
    currentUser,
  } = useUserStore();
  // 負責抓取資料
  useEffect(() => {
    fetchUser("wei");
  }, []);

  // 負責同步到本地表單 (只在 userData 改變且本地表單為空時執行)
  useEffect(() => {
    if (userData && formData.email === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        linkedin: userData.linkedin || "",
      });
    }
  }, [userData]);
  const handleSaveContact = async () => {
    try {
      // 呼叫你的 axios 封裝 (api)
      const response = await api.post("/user/wei", formData);
      fetchUser("wei"); // 儲存完重新抓取，確保同步
      alert("更新成功！");

      // 選做：更新全局 Store 狀態，讓畫面即時連動
      // updateUser(formData);
    } catch (error) {
      console.error("更新失敗:", error);
      alert("更新失敗，請檢查網路連線");
    }
  };
  if (!isLoggedIn || currentUser?.name !== "wei") {
    return null;
  }
  if (isLoading) return <div>讀取中...</div>;

  return (
    <>
      {/* 切換按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-slate-900 text-white p-3 rounded-r-lg hover:bg-slate-800 transition-all z-50"
        style={{ left: isOpen ? "320px" : "0" }}
      >
        {isOpen ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>

      {/* 側邊欄 */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-2xl transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "320px" }}
      >
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-slate-900">內容維護</h2>
        </div>

        <div className="flex flex-col h-[calc(100%-80px)]">
          {/* 選單按鈕 */}
          <div className="border-b border-slate-200">
            <button
              onClick={() => setActiveSection("contact")}
              className={`w-full text-left px-6 py-4 hover:bg-slate-50 transition-colors ${
                activeSection === "contact"
                  ? "bg-slate-100 border-l-4 border-slate-900"
                  : ""
              }`}
            >
              <span className="text-slate-700">聯繫方式</span>
            </button>
            <button
              onClick={() => setActiveSection("experience")}
              className={`w-full text-left px-6 py-4 hover:bg-slate-50 transition-colors ${
                activeSection === "experience"
                  ? "bg-slate-100 border-l-4 border-slate-900"
                  : ""
              }`}
            >
              <span className="text-slate-700">經歷</span>
            </button>
            <button
              onClick={() => setActiveSection("projects")}
              className={`w-full text-left px-6 py-4 hover:bg-slate-50 transition-colors ${
                activeSection === "projects"
                  ? "bg-slate-100 border-l-4 border-slate-900"
                  : ""
              }`}
            >
              <span className="text-slate-700">過去開發項目</span>
            </button>
          </div>

          {/* 內容區域 */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeSection === "contact" && (
              <div className="space-y-4">
                <h3 className="text-slate-900 mb-4">編輯聯繫方式</h3>

                <div>
                  <label className="block text-slate-700 mb-2">電子郵件</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700"
                    value={formData?.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">電話</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700"
                    value={formData?.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">地址</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700"
                    value={formData?.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">LinkedIn</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-700"
                    value={formData?.linkedin}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                  />
                </div>

                <button
                  className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                  onClick={() => handleSaveContact()}
                >
                  儲存變更
                </button>
              </div>
            )}

            {activeSection === "experience" && (
              <div className="space-y-4">
                <h3 className="text-slate-900 mb-4">編輯經歷</h3>

                <div>
                  <label className="block text-slate-700 mb-2">名稱</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="天方"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-2">描述</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="前端工程師"
                  />
                </div>

                <button className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                  儲存變更
                </button>
              </div>
            )}

            {activeSection === "projects" && (
              <div className="space-y-6">
                <h3 className="text-slate-900 mb-4">編輯過去開發項目</h3>

                <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                  <h4 className="text-slate-700">項目 1</h4>
                  <div>
                    <label className="block text-slate-700 mb-2">名稱</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="台藝大"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-2">描述</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="台藝大師培作業"
                    />
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                  <h4 className="text-slate-700">項目 2</h4>
                  <div>
                    <label className="block text-slate-700 mb-2">名稱</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="排課"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-2">描述</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                      placeholder="高中職排課系統"
                    />
                  </div>
                </div>

                <button className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                  儲存變更
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
