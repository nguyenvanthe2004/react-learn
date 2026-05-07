import type { Status } from "../types/user";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const STATUS_LABELS: Record<Status, string> = {
  active: "Hoạt động",
  inactive: "Lưu Nháp",
};

