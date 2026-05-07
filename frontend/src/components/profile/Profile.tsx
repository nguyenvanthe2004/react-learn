import { Camera, Eye, EyeOff, Shield, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import type { PasswordField } from "../../types/user";
import { Button } from "../ui/Button";

const FAKE_USER = {
  fullName: "Nguyễn Văn A",
  email: "nguyenvana@gmail.com",
  phone: "0912 345 678",
  avatar:
    "https://tuanluupiano.com/wp-content/uploads/2026/01/avatar-facebook-mac-dinh-6.jpg",
};

export default function Profile() {
  const [user, setUser] = useState(FAKE_USER);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showPw, setShowPw] = useState<Record<PasswordField, boolean>>({
    current: false,
    new: false,
    confirm: false,
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUser({ ...user, avatar: URL.createObjectURL(file) });
  };

  const togglePw = (field: PasswordField) =>
    setShowPw((prev) => ({ ...prev, [field]: !prev[field] }));

  const passwordFields = [
    {
      id: "current" as PasswordField,
      label: "Current Password",
      placeholder: "Enter current password",
    },
    {
      id: "new" as PasswordField,
      label: "New Password",
      placeholder: "Enter new password",
    },
    {
      id: "confirm" as PasswordField,
      label: "Confirm New Password",
      placeholder: "Confirm new password",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-10 py-5">
        {/* Header */}
        <div className="mb-8 pt-12 lg:pt-0">
          <h1 className="text-2xl font-black text-[#1c140d] tracking-tight">
            Thông tin cá nhân
          </h1>
          <p className="text-[#9c7349] text-xs mt-1">
            Quản lý hồ sơ và tùy chọn bảo mật của bạn.
          </p>
        </div>

        <div className="space-y-3">
          {/* Avatar Card */}
          <div className="bg-white rounded-2xl border border-[#e8dbce] p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#f0e6da]"
                />
                <label className="absolute -bottom-0.5 -right-0.5 bg-orange-400 hover:bg-orange-500 transition-colors text-white p-1.5 rounded-full border-2 border-white cursor-pointer shadow">
                  <Camera size={11} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <div>
                <p className="font-bold text-[#1c140d] text-base">
                  {user.fullName}
                </p>
                <p className="text-[#9c7349] text-xs mt-0.5">
                  Click the camera icon to update your photo.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-[#e8dbce] shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#e8dbce]">
              <h2 className="text-sm font-bold text-[#1c140d]">
                Personal Information
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c140d]">
                    Full Name
                  </label>
                  <input
                    maxLength={100}
                    defaultValue={user.fullName}
                    placeholder="Enter your full name"
                    className="w-full text-[#1c140d] px-3 py-2 border border-[#e8dbce] rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 text-sm transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1c140d]">
                    Phone
                  </label>
                  <input
                    maxLength={20}
                    defaultValue={user.phone}
                    placeholder="Enter phone number"
                    className="w-full text-[#1c140d] px-3 py-2 border border-[#e8dbce] rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 text-sm transition"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#1c140d]">
                  Email{" "}
                  <span className="font-normal text-[#9c7349]">
                    (Read-only)
                  </span>
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full rounded-lg border border-[#e8dbce] bg-[#f7f4f0] px-3 py-2 text-sm text-[#b09070] cursor-not-allowed"
                />
                <p className="text-[10px] text-[#9c7349] italic">
                  Contact support to change your primary account email.
                </p>
              </div>
              <div className="flex justify-end pt-1">
                <Button label="Save Changes" size="lg" width="w-30" />
              </div>
            </div>
          </div>

          {/* Password & Security */}
          <div className="bg-white rounded-2xl border border-[#e8dbce] shadow-sm overflow-hidden">
            {/* Trigger row */}
            <button
              onClick={() => setShowPasswordSection((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#fdf8f4] transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="bg-orange-50 p-2 rounded-lg">
                  <Shield size={16} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1c140d]">
                    Password &amp; Security
                  </p>
                  <p className="text-[11px] text-[#9c7349]">
                    Update your password to keep your account safe.
                  </p>
                </div>
              </div>
              <div className="text-[#c4a882]">
                {showPasswordSection ? (
                  <X size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
            </button>

            {/* Collapsible form */}
            {showPasswordSection && (
              <div className="border-t border-[#e8dbce] px-5 py-5 bg-[#fffcf9] space-y-3">
                {passwordFields.map(({ id, label, placeholder }) => (
                  <div key={id} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#1c140d]">
                      {label}
                    </label>
                    <div className="relative">
                      <input
                        type={showPw[id] ? "text" : "password"}
                        placeholder={placeholder}
                        className="w-full text-[#1c140d] px-3 py-2 pr-10 border border-[#e8dbce] rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 text-sm transition bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => togglePw(id)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b09070] hover:text-[#7a5c3a] transition-colors"
                      >
                        {showPw[id] ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end pt-2">
                  <Button label="Update Password" size="lg" width="w-30" />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-1 pt-1 text-[#9c7349]">
            <p className="text-[10px]">Member since March 2023</p>
            <div className="flex gap-4">
              <a href="#" className="text-[10px] hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-[10px] hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
