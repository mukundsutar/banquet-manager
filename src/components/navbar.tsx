import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import type { ICategoryData } from "../../lib/types";
import MenuIcon from "@mui/icons-material/Menu";
import { toastSuccess, toastWarn } from "../../lib/configs/toast-config";
import { useMediaQuery } from "react-responsive";
import { type Dispatch, type SetStateAction } from "react";

interface NavbarProps {
  label: string;
  menuData: ICategoryData[] | null;
  handleError: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({
  label,
  menuData,
  handleError,
  isDrawerOpen,
  setIsDrawerOpen,
}: NavbarProps) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  // const [copyText, setCopyText] = useState(second);

  function compileMenu(): string {
    if (!menuData) return "";

    let formattedStr = "";

    for (const category of menuData) {
      const selectedItems = category.item.filter((i) => i.isSelected);

      if (selectedItems.length > 0) {
        formattedStr += `${category.categoryName.toUpperCase()}\n`;
        formattedStr += selectedItems
          .map((i) => `[✓] ${i.itemName}`)
          .join("\n");
        formattedStr += `\n\n`;
      }
    }

    return formattedStr.trim();
  }

  async function handleCopy() {
    handleError();

    const result = `${label}\n\n\n` + compileMenu();

    console.log(compileMenu());

    if (!result) {
      console.log("Please items from all categories!");
      toastWarn("Please items from all categories!");
      return;
    }

    try {
      await navigator.clipboard.writeText(result ?? "");

      await navigator.share({
        text: result,
      });

      toastSuccess("Copied to clipboard!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        {isTabletOrMobile ? (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setIsDrawerOpen(!isDrawerOpen);
            }}
          >
            <MenuIcon />
          </IconButton>
        ) : null}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {label}
        </Typography>

        <div className="flex gap-4">
          <Button variant="outlined" color="inherit" onClick={handleCopy}>
            Finalize
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
