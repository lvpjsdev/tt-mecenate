export interface Tab {
  key: string;
  label: string;
}

export interface TabBarProps {
  tabs: Tab[];
  selectedKey: string;
  onTabChange: (key: string) => void;
}
