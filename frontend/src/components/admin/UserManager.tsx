import { Eye, Search, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { STATUS_LABELS } from "../../constants";
import type { Status, User } from "../../types/user";
import EllipsisMenu from "../ui/EllipsisMenu";
import CustomTable from "../ui/CustomTable";

const FAKE_USERS: User[] = [
  {
    id: 1,
    code: "NSVEAM1",
    fullName: "Ngô Khải Hoàn",
    email: "ngokhaihoan@veamcorp.com",
    phone: "0902909168",
    position: "Hội đồng quản trị",
    org: "Hội đồng quản trị",
    alias: "Nhân sự",
    status: "active",
  },
  {
    id: 2,
    code: "NSVEAM2",
    fullName: "Trần Thị Minh",
    email: "tranthiminh@veamcorp.com",
    phone: "0913456789",
    position: "Giám đốc điều hành",
    org: "Ban giám đốc",
    alias: "Lãnh đạo",
    status: "active",
  },
  {
    id: 3,
    code: "NSVEAM3",
    fullName: "Lê Văn Đức",
    email: "levanduc@veamcorp.com",
    phone: "0924567890",
    position: "Trưởng phòng kỹ thuật",
    org: "Phòng kỹ thuật",
    alias: "Kỹ thuật",
    status: "inactive",
  },
  {
    id: 4,
    code: "NSVEAM4",
    fullName: "Phạm Hồng Nhung",
    email: "phamhongnhung@veamcorp.com",
    phone: "0935678901",
    position: "Kế toán trưởng",
    org: "Phòng tài chính",
    alias: "Tài chính",
    status: "inactive",
  },
  {
    id: 5,
    code: "NSVEAM5",
    fullName: "Hoàng Minh Tuấn",
    email: "hoangminhtuan@veamcorp.com",
    phone: "0946789012",
    position: "Chuyên viên nhân sự",
    org: "Phòng nhân sự",
    alias: "Nhân sự",
    status: "inactive",
  },
];

const ORGS = [...new Set(FAKE_USERS.map((u) => u.org))];

export default function UserManager() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [orgFilter, setOrgFilter] = useState("");
  const [users, setUsers] = useState<User[]>(FAKE_USERS);
 
  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchQ =
      !q ||
      u.fullName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(q) ||
      u.code.toLowerCase().includes(q);
    const matchS = !statusFilter || u.status === statusFilter;
    const matchO = !orgFilter || u.org === orgFilter;
    return matchQ && matchS && matchO;
  });
 
  const columns = [
    {
      key: "stt",
      title: "#",
      headerClassName: "w-10",
      render: (row: User) => (
        <span className="text-[#9c7349]">
          {filtered.findIndex((u) => u.id === row.id) + 1}
        </span>
      ),
    },
    {
      key: "action",
      title: "Hành động",
      headerClassName: "w-24",
      render: (row: User) => (
        <div className="flex items-center gap-1.5">
          <button className="w-7 h-7 flex items-center justify-center border border-[#e8dbce] rounded-lg text-[#9c7349] hover:bg-[#fff0e0] hover:text-orange-500 hover:border-orange-300 transition-colors">
            <Eye size={13} />
          </button>
          <EllipsisMenu
            align="left"
            actions={[
              {
                label: "Chỉnh sửa",
                icon: <Pencil size={13} />,
                onClick: () => alert(`Sửa: ${row.fullName}`),
              },
              {
                label: "Xóa người dùng",
                icon: <Trash2 size={13} />,
                variant: "danger",
                onClick: () => setUsers((prev) => prev.filter((u) => u.id !== row.id)),
              },
            ]}
          />
        </div>
      ),
    },
    {
      key: "code",
      title: "Mã nhân viên",
      cellClassName: "font-mono text-xs text-[#9c7349]",
      render: (row: User) => row.code,
    },
    {
      key: "user",
      title: "Người dùng",
      render: (row: User) => (
        <div>
          <p className="font-semibold text-[#1c140d]">{row.fullName}</p>
          <p className="text-xs text-[#9c7349] mt-0.5">{row.email}</p>
        </div>
      ),
    },
    {
      key: "phone",
      title: "Số điện thoại",
      cellClassName: "text-[#1c140d]",
      render: (row: User) => row.phone,
    },
    {
      key: "position",
      title: "Vị trí",
      cellClassName: "text-[#1c140d]",
      render: (row: User) => row.position,
    },
    {
      key: "org",
      title: "Tổ chức",
      cellClassName: "text-[#1c140d]",
      render: (row: User) => row.org,
    },
    {
      key: "alias",
      title: "Tên nhóm",
      render: (row: User) => (
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
            row.status === "active"
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {STATUS_LABELS[row.status]}
        </span>
      ),
    },
  ];
 
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-10 py-5">
        {/* Header */}
        <div className="mb-6 pt-12 lg:pt-0">
          <h1 className="text-2xl font-black text-[#1c140d] tracking-tight">
            Quản lý người dùng
          </h1>
          <p className="text-[#9c7349] text-xs mt-1">
            Xem và quản lý tất cả tài khoản trong hệ thống.
          </p>
        </div>
 
        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-[#e8dbce] shadow-sm p-4 mb-3">
          <div className="grid grid-cols-3 gap-3">
            {/* Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1c140d]">Tìm kiếm</label>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b09070]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm ..."
                  className="w-full pl-8 pr-3 py-2 border border-[#e8dbce] rounded-lg text-sm text-[#1c140d] focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 transition"
                />
              </div>
            </div>
 
            {/* Status filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1c140d]">Trạng thái</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Status | "")}
                  className="w-full appearance-none px-3 py-2 pr-8 border border-[#e8dbce] rounded-lg text-sm text-[#1c140d] bg-white focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 transition"
                >
                  <option value="">--Chọn trạng thái--</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Lưu nháp</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b09070] pointer-events-none" />
              </div>
            </div>
 
            {/* Org filter */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1c140d]">Tổ chức</label>
              <div className="relative">
                <select
                  value={orgFilter}
                  onChange={(e) => setOrgFilter(e.target.value)}
                  className="w-full appearance-none px-3 py-2 pr-8 border border-[#e8dbce] rounded-lg text-sm text-[#1c140d] bg-white focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-400 transition"
                >
                  <option value="">-Chọn vị trí-</option>
                  {ORGS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b09070] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
 
        {/* Table */}
        <CustomTable
          data={FAKE_USERS}
          columns={columns}
          emptyText="Không tìm thấy dữ liệu"
          className="min-w-[900px] bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-[#e8f0f2] overflow-hidden"
        />
 
        {/* Footer */}
        <div className="px-1 py-3 flex items-center justify-between">
          <p className="text-xs text-[#9c7349]">
            Hiển thị {filtered.length} / {users.length} bản ghi
          </p>
        </div>
      </div>
    </div>
    
  );
}
