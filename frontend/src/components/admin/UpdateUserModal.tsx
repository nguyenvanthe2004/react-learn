import { useState } from "react";
import type { User } from "../../types/user";
import { Button } from "../ui/Button";

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: User) => void;
  initialData?: Partial<User>;
}

const defaultData: User = {
  id: 1,
  code: "NSVEAM1",
  fullName: "Ngô Khải Hoàn",
  email: "ngokhaihoan@veamcorp.com",
  phone: "0902909168",
  position: "Hội đồng quản trị",
  org: "Hội đồng quản trị",
  alias: "Nhân sự",
  status: "active",
};

export default function UpdateUserModal({
  isOpen,
  onClose,
  onSave,
  initialData = {},
}: UpdateUserModalProps) {
  const [formData, setFormData] = useState<User>({
    ...defaultData,
    ...initialData,
  });
  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (name: keyof User) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
            Thông tin nhân viên
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Họ tên nhân viên */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Họ tên nhân viên
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
              placeholder="Nhập họ tên nhân viên"
            />
          </div>

          {/* Chức vụ + Ngày sinh */}
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Chức vụ
              </label>
              <div className="relative">
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition pr-9"
                >
                  <option>Hội đồng quản trị</option>
                  <option>Giám đốc</option>
                  <option>Trưởng phòng</option>
                  <option>Nhân viên</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Ngày sinh
              </label>
              <input
                type="text"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
              />
            </div> */}
          </div>

          {/* Tổ chức + Nhóm nhân sự */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Tổ chức
              </label>
              <input
                type="text"
                name="organization"
                value={formData.org}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Nhóm nhân sự
              </label>
              <input
                type="text"
                name="staffGroup"
                value={formData.alias}
                onChange={handleChange}
                placeholder="Nhân sự công ty"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
              />
            </div>
          </div>

          {/* Email + Số điện thoại */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
              />
            </div>
          </div>

          {/* Mật khẩu + Trạng thái tài khoản */}
          <div className="grid gap-4">
            {/* <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Mật khẩu{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                Trạng thái tài khoản <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="accountStatus"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition pr-9"
                >
                  <option>Hoạt động</option>
                  <option>Tạm khóa</option>
                  <option>Vô hiệu hóa</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "allowCmsLogin", label: "Cho phép đăng nhập CMS" },
              {
                key: "allowCreateNotification",
                label: "Cho phép tạo/chỉnh sửa thông báo",
              },
              {
                key: "allowCreateAuthorization",
                label: "Cho phép tạo/chỉnh sửa ủy quyền",
              },
              {
                key: "allowCreateCondolence",
                label: "Cho phép tạo/chỉnh sửa tin buồn và lời cảm ơn",
              },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                <div
                  onClick={() => handleCheckbox(key as keyof User)}
                  className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                    formData[key as keyof User]
                      ? "bg-blue-500 border-blue-500"
                      : "bg-white border-gray-300 group-hover:border-blue-400"
                  }`}
                >
                  {formData[key as keyof User] && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      viewBox="0 0 10 8"
                      fill="none"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700 leading-tight">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/60">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-all"
          >
            Đóng
          </button>
          <Button label="Lưu thông tin" width="w-30" size="lg" />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
