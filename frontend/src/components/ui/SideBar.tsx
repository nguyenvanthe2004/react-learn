import { LayoutDashboard, Users, Settings, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: LayoutDashboard, label: "Thống kê", path: "/" },
  { icon: Users, label: "Quản lý người dùng", path: "/manageusers" },
  { icon: Settings, label: "Cài đặt", path: "/settings" },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = (path: string) => pathname === path;
  return (
    <aside
      className={`relative flex flex-col bg-slate-900 text-white h-full transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-4 h-16 border-b border-slate-700/60 shrink-0 overflow-hidden`}
      >
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        <span
          className={`font-semibold text-white text-sm tracking-wide whitespace-nowrap transition-all duration-200 ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
          }`}
        >
          My App
        </span>
      </div>

      <nav className="flex flex-col gap-1 p-2 flex-1 mt-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`group flex items-center gap-3 w-full rounded-xl px-2.5 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all duration-150 ${
              isOpen ? "" : "justify-center"
            } ${
              isActive(path)
                ? "bg-slate-700 text-white border-l-4 border-indigo-400 font-semibold"
                : "text-slate-400 hover:bg-slate-700/50"
            }`}
          >
            <Icon
              className="w-4.5 h-4.5 shrink-0 text-slate-400 group-hover:text-indigo-400 transition-colors"
              size={18}
            />
            <span
              className={`whitespace-nowrap transition-all duration-200 ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 w-0 -translate-x-2"
              }`}
            >
              {label}
            </span>
            {isOpen && (
              <ChevronRight
                size={14}
                className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors"
              />
            )}
          </button>
        ))}
      </nav>

      <div
        onClick={() => navigate("/profile")}
        className={`p-2 border-t border-slate-700/60 shrink-0`}
      >
        <div className="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-slate-700/40 cursor-pointer transition-colors overflow-hidden">
          <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
            <span className="text-indigo-300 text-xs font-semibold">U</span>
          </div>

          <div
            className={`transition-all duration-200 overflow-hidden ${
              isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            <p className="text-xs font-medium text-white whitespace-nowrap">
              User Name
            </p>
            <p className="text-xs text-slate-500 whitespace-nowrap">
              user@email.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
