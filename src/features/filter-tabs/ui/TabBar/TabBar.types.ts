export interface Tab<T = string, U = string> {
  key: T;
  label: U;
}

export interface TabBarProps<T = string, U = string> {
  tabs: Tab<T, U>[];
  selectedKey: T;
  onTabChange: (key: T) => void;
}
