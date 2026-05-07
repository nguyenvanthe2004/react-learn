import { Bell, Search, TextAlignJustify } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/currentUser";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

export default function Header({ toggle }: { toggle: () => void }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.currentUser);

  return (
    <header className="flex items-center justify-between bg-white border-b border-slate-200 px-4 h-16 shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <TextAlignJustify size={18} />
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 w-56">
          <Search size={14} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white" />
        </button>

        <Menu as="div" className="relative inline-block">
          <MenuButton className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 bg-white hover:bg-slate-50 shadow-sm transition-colors">
            <div className="w-7 h-7 rounded-full bg-indigo-500/15 border border-indigo-300/40 flex items-center justify-center">
              <span className="text-indigo-600 text-xs font-semibold">
                {user.userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-slate-700">
              {" "}
              {user?.userName?.charAt(0).toUpperCase() +
                user?.userName?.slice(1)}
            </span>
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <form onClick={() => navigate("/login")}>
                <MenuItem>
                  <button
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      dispatch(logout());
                    }}
                    type="submit"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
