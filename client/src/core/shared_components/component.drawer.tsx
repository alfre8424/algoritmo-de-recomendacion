import { Person, SettingsInputComposite } from "@mui/icons-material";
import { Button, Menu } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from '@mui/icons-material/Menu';
import type { ReactElement } from "react"
import PrivateRoutes from "presentation/routes/private_routes";

interface DrawerProps {
  isOpen: boolean;
  activeRoute: PrivateRoutes;
  onClose: () => void;
  onActiveRouteChange: (route: PrivateRoutes) => void;
}

export default function DrawerComponent({
  isOpen,
  onClose,
  activeRoute,
  onActiveRouteChange
}: DrawerProps): ReactElement {
  return <>
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={() => onClose()}
    >
      <Box
        sx={{ width: 350, backgroundColor: "var(--accent-color)" }}
        role="presentation"
        onClick={() => onClose()}
        onKeyDown={() => onClose()}
      >
        <List
          sx={{ backgroundColor: "white", padding: 0, color: "white" }}
        >
          <ListItem
            disablePadding
            sx={{
              backgroundColor: "var(--accent-color)",
              top: 0,
              padding: "0.5rem 0",
            }}
          >
            <ListItemIcon>
              <Button onClick={() => onClose()} sx={{ padding: 0 }}>
                <MenuIcon
                  sx={{ color: "white" }}
                />
              </Button>
            </ListItemIcon>
            <ListItemText primary="Perfil de usuario" />
          </ListItem>
          <ListItem
            disablePadding
            component="div"
            sx={{
              border: activeRoute === PrivateRoutes.Profile ? "8px 0 0 0 solid var(--accent-color)" : "",
            }}
          >
            <Button onClick={() => onActiveRouteChange(PrivateRoutes.Profile)} >
              <ListItemButton component="button">
                <ListItemIcon>
                  <Person sx={{ color: activeRoute === PrivateRoutes.Profile ? "var(--accent-color)" : "" }}>
                  </Person>
                </ListItemIcon>
                <ListItemText
                  sx={{ color: "var(--accent-color)" }}
                  primary="Perfil"
                  secondary="Editar información personal"
                />
              </ListItemButton>
            </Button>
          </ListItem>

        </List>
      </Box>
    </Drawer>
  </>
}
