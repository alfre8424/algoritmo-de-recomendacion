import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerComponent from './component.drawer';
import {Link} from 'react-router-dom';
import PrivateRoutes from 'presentation/routes/private_routes';
import GeneralRoutes from 'presentation/routes/general_routes';
import {Home} from '@mui/icons-material';

interface AppNavbarProps {
	roundedBorders?: boolean;
	showDrawerButton?: boolean;
	showHomeButton?: boolean;
	activeRoute?: PrivateRoutes;
	onActiveRouteChange?: (route: PrivateRoutes) => void;
	title?: string;
}

function AppNavbar({
	activeRoute,
	roundedBorders = true,
	showDrawerButton = false,
	showHomeButton = false,
	onActiveRouteChange,
	title = ""

}: AppNavbarProps): JSX.Element {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const [openDrawer, setOpenDrawer] = React.useState(false);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	if(!activeRoute && showDrawerButton) {
		throw new Error("activeRoute is required when showDrawerButton is true");
	}

	return (
		<AppBar position="static"
			style={{
				backgroundColor: "var(--accent-color)",
				borderRadius: roundedBorders ? "var(--border-radius) 0 0 var(--border-radius)" : "",
			}}
		>
			<div className="flex flex-row justify-end px-4">
				{
					showDrawerButton &&
					<>
						<div className="flex flex-row w-full justify-start items-center">
							<Button onClick={() => setOpenDrawer(!openDrawer)}>
								<MenuIcon sx={{color: "white"}} />
							</Button>
							{
								showHomeButton &&
								<Link to={GeneralRoutes.Home}>
									<img 
									src="/assets/images/Logoclan2.png"
									alt="logo"
										className="w-[40px] h-[40px] ml-2"
									/>
								</Link>

							}
							<div id="title" className="mx-2">
								<span>{title}</span>
							</div>
						</div>
						<DrawerComponent
							activeRoute={activeRoute!}
							isOpen={openDrawer}
							onActiveRouteChange={onActiveRouteChange!}
							onClose={() => setOpenDrawer(false)}
						/>
					</>
				}
				<Toolbar disableGutters>
					<span>Jean Carlos Zambrano</span>
					&nbsp;
					&nbsp;
					&nbsp;
					<Box sx={{flexGrow: 0}}>
						<Tooltip title="Mostrar opciones">
							<IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{mt: '45px'}}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<Link
								onClick={handleCloseUserMenu}
								to={PrivateRoutes.Profile}
							>
								<Typography textAlign="center">Perfil</Typography>
							</Link>
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography textAlign="center">Cerrar Sesión</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</div>
		</AppBar>
	);
}
export default AppNavbar;
