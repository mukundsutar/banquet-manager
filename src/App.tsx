import { useEffect, useState } from "react";
import { supabase } from "../lib/configs/supabase-config";
import type { ICategoryData, IMenuData } from "../lib/types";
import CategoryForm from "./components/category-form";
import Masonry from "@mui/lab/Masonry";
import { useMediaQuery } from "react-responsive";
import Navbar from "./components/navbar";
import { scrollToSection } from "../lib/functions/dom-functions";
import { Button, Drawer } from "@mui/material";

export default function App() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const [itemListData, setItemListData] = useState<IMenuData | null>(null);
  const [menuData, setMenuData] = useState<ICategoryData[] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    async function getItemList() {
      const { data } = await supabase
        .from("menu_list")
        .select()
        .limit(1)
        .single();

      if (data) {
        const menuDataTyped: IMenuData = {
          ...data,
          menu_data: data.menu_data as unknown as ICategoryData[],
        };

        setItemListData(menuDataTyped);
        setMenuData(menuDataTyped.menu_data);
      }
    }

    getItemList();
  }, []);

  function handleError() {
    if (!menuData) {
      console.log("no Menu Data found");

      return;
    }

    for (let i = 0; i < menuData?.length; i++) {
      let selectedCount = 0;

      menuData[i].item.forEach((j) => {
        if (j.isSelected) {
          selectedCount = selectedCount + 1;
        }
      });

      if (selectedCount !== menuData[i].maxAllowed) {
        scrollToSection(menuData[i].categoryName);
        return;
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* navbar */}
      <Navbar
        label={itemListData?.name ?? ""}
        menuData={menuData}
        handleError={handleError}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />

      <div className="p-8 pr-0">
        {menuData ? (
          <Masonry columns={isTabletOrMobile ? 1 : 6} spacing={4} sequential>
            {menuData?.map((i, index) => (
              <div key={index} className="flex h-fit">
                <CategoryForm
                  categoryData={i}
                  categoryIndex={index}
                  setMenuData={setMenuData}
                />
              </div>
            ))}
          </Masonry>
        ) : null}
      </div>

      <Drawer
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        classes={{
          paper: "!w-full flex flex-col gap-4 items-center justify-center",
        }}
      >
        {menuData?.map((i, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => {
              setIsDrawerOpen(false);
              scrollToSection(i.categoryName);
            }}
            className="!w-fit"
          >
            <div className="text-xl">{i.categoryName}</div>
          </Button>
        ))}
      </Drawer>
    </div>
  );
}
