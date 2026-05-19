import React, { useState } from 'react';

const tabs = [
  { id: 'content', label: 'Nội dung' },
  { id: 'docs', label: 'Tài liệu' },
  { id: 'exercises', label: 'Bài tập' },
  { id: 'qa', label: 'Hỏi đáp' },
];

const TabsContent = ({content}: {content: String}) => {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <div className="flex border-b border-gray-100 bg-[#f4f7fc] px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-4 text-sm font-semibold transition-colors relative focus:outline-none ${
              activeTab === tab.id ? 'text-[#0052cc]' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0052cc] rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {activeTab === 'content' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900">Tóm tắt bài học</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Trong bài học này, chúng ta sẽ tìm hiểu về các kiểu dữ liệu cơ bản nhất trong Python bao gồm Integer (số nguyên), Float (số thực), String (chuỗi ký tự) và Boolean (kiểu đúng/sai). Chúng ta cũng sẽ thực hành cách đặt tên biến theo chuẩn PEP 8 và cách gán giá trị cho biến.
            </p>
            <ul className="space-y-3 pl-4 list-disc text-sm text-gray-600">
              <li>Phân biệt sự khác nhau giữa <code className="bg-gray-50 text-gray-800 px-1.5 py-0.5 rounded border border-gray-100 font-mono text-xs">int</code> và <code className="bg-gray-50 text-gray-800 px-1.5 py-0.5 rounded border border-gray-100 font-mono text-xs">float</code>.</li>
              <li>Cách sử dụng hàm <code className="bg-gray-50 text-gray-800 px-1.5 py-0.5 rounded border border-gray-100 font-mono text-xs">type()</code> để kiểm tra kiểu dữ liệu.</li>
              <li>Quy tắc đặt tên biến trong Python.</li>
            </ul>
          </div>
        )}
        {activeTab !== 'content' && (
          <div className="text-sm text-gray-400 py-4 text-center">Nội dung đang được cập nhật...</div>
        )}
      </div>
    </div>
  );
};

export default TabsContent;