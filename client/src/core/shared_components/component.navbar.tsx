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
import {ExitToApp, Home, Person} from '@mui/icons-material';
import PublicRoutes from 'presentation/routes/public_routes';

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

	if (!activeRoute && showDrawerButton) {
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
							sx={{mt: '45px', paddingX: 4}}
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
							<div className="px-6 flex flex-col items-start">
								<Link
									onClick={handleCloseUserMenu}
									className="flex flex-row items-center"
									to={GeneralRoutes.Home}
								>
									<Home />
									&nbsp;
									<Typography textAlign="center">Home</Typography>
								</Link>
								<br />

								<Link
									onClick={handleCloseUserMenu}
									to={PrivateRoutes.Profile}
									className="flex flex-row items-center"
								>
									<Person />
									&nbsp;
									<Typography textAlign="center">Perfil</Typography>
								</Link>
								<br />

								<Link
									onClick={handleCloseUserMenu}
									to={PublicRoutes.Login}
									className="flex flex-row items-center"
								>
									<ExitToApp />
									&nbsp;
									<Typography textAlign="center">Cerrar Sesión</Typography>
								</Link>
							</div>
						</Menu>
					</Box>
				</Toolbar>
			</div>
		</AppBar>
	);
}
export default AppNavbar;
