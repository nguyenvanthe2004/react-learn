export interface TableColumn<T> {
  key: string;
  title: string;
  headerClassName?: string;
  cellClassName?: string;
  render: (row: T) => React.ReactNode;
  hideOnMobile?: boolean;
}
export interface CustomTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyText?: string;
  className?: string;
}