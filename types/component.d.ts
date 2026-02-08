interface leftSideMainItemType {
  key: string;
  label: string;
  icon?: React.ReactNode;
  link?: string;
}
interface MenuItemType {
  id: number;
  titel?: string;
  items: leftSideMainItemType[];
}
