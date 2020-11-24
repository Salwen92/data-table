import { ReactNode } from "react";

export type toolbarOptions = {
  title?: string;
  remote?: boolean;
  searchRemote?: (searchText: string, data: any) => any;
  toolbarCustomItems?: ReactNode;
  onDelete?: () => void;
  checkBox?: boolean;
  selection?: "multiple" | "single";
};
