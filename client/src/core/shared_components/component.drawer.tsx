import {Person, SettingsInputComposite} from "@mui/icons-material";
import {Button, Menu} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from '@mui/icons-material/Menu';
import type {ReactElement} from "react"

interface DrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function DrawerComponent({
	isOpen,
	onClose
}: DrawerProps): ReactElement {
	return <>
		<Drawer
			anchor="left"
			open={isOpen}
			onClose={() => onClose()}
		>
			<Box
				sx={{width: 350, backgroundColor: "var(--accent-color)"}}
				role="presentation"
				onClick={() => onClose()}
				onKeyDown={() => onClose()}
			>
				<List
					sx={{backgroundColor: "white", padding: 0, color: "white"}}
				>
					<ListItem
						disablePadding
						sx={{
							backgroundColor: "var(--accent-color)",
							top: 0,
							padding: "0.5rem 0"
						}}
					>
						<ListItemIcon>
							<Button onClick={() => onClose()} sx={{padding: 0}}>
								<MenuIcon 
									sx={{color: "white"}}
								/>
							</Button>
						</ListItemIcon>
						<ListItemText primary="Perfil de usuario" />
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<Person></Person>
							</ListItemIcon>
							<ListItemText
								sx={{color: "var(--accent-color)"}}
								primary="Perfil"
								secondary="Editar información personal"
							/>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<SettingsInputComposite></SettingsInputComposite>
							</ListItemIcon>
							<ListItemText
								sx={{color: "var(--accent-color)"}}
								primary="Motor de recomendación"
								secondary="Configurar preferencias de recomendación"
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Box>
		</Drawer>
	</>
}
