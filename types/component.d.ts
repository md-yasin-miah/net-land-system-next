interface leftSideMainItemType {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

interface MenuItemType {
  id: number;
  titel?: string;
  items: leftSideMainItemType[];
}