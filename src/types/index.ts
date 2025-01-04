export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType;
}

export interface Organization {
  id: string;
  name: string;
  type: 'masjid' | 'charity';
  address: string;
  image: string;
  description: string;
}

export interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface Window {
  PaystackPop: any;
}