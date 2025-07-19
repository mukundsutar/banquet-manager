import type { Database } from "../database.types";

export type IMenuRow = Database["public"]["Tables"]["menu_list"]["Row"];

export interface IMenuData {
  id: string;
  name: string | null;
  menu_data: ICategoryData[];
  created_at: string;
}

export interface ICategoryData {
  categoryName: string;
  item: {
    itemName: string;
    isSelected: boolean;
  }[];
  maxAllowed: number;
}

export type IMenuPost = ICategoryData[];
