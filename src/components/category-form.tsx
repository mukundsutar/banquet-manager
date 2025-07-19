import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import type { ICategoryData } from "../../lib/types";

interface CategoryFormProps {
  categoryData: ICategoryData;
  categoryIndex: number;
  setMenuData: Dispatch<SetStateAction<ICategoryData[] | null>>;
}

export default function CategoryForm({
  categoryData,
  categoryIndex,
  setMenuData,
}: CategoryFormProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setMenuData((prev) => {
      if (!prev) return prev;

      const updated = [...prev];
      const updatedCategory = { ...updated[categoryIndex] };

      updatedCategory.item = updatedCategory.item.map((item) =>
        item.itemName === name ? { ...item, isSelected: checked } : item,
      );

      updated[categoryIndex] = updatedCategory;
      return updated;
    });
  };

  const selectedItems = categoryData.item
    .filter((i) => i.isSelected)
    .map((i) => i.itemName);

  const isError =
    selectedItems.length !== categoryData.maxAllowed &&
    selectedItems.length > 0;

  return (
    <div
      id={categoryData.categoryName}
      className="h-fit flex-1 rounded-lg bg-gray-200 p-2"
    >
      <FormControl
        required
        error={isError}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
        <FormLabel component="legend">{categoryData.categoryName}</FormLabel>
        <FormGroup>
          {categoryData.item.map((i, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedItems.includes(i.itemName)}
                  onChange={handleChange}
                  name={i.itemName}
                />
              }
              label={i.itemName}
              className="text-black"
            />
          ))}
        </FormGroup>
        {isError && (
          <FormHelperText>
            Please select {categoryData.maxAllowed}{" "}
            {categoryData.maxAllowed > 1 ? "items" : "item"}.
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
}
