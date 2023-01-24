import React from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

interface IAppDialogProps {
	isOpen: boolean;
	title?: string;
	content?: React.ReactNode;
	actionButtons?: React.ReactNode[];
	onClose: () => void;
}

function AppSimpleDialog({
	isOpen,
	title,
	content,
	actionButtons,
	onClose
}: IAppDialogProps) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	return <Dialog
		fullScreen={false}
		maxWidth="lg"
		open={isOpen}
	>
		<DialogTitle id="responsive-dialog-title">
			{title}
		</DialogTitle>
		<DialogContent>
			{content}
		</DialogContent>
		<DialogActions>
			{
				actionButtons ? actionButtons.map((actionButton, index) => {
					return <React.Fragment key={index}>
						{actionButton}
					</React.Fragment>
				}) :
					<Button autoFocus onClick={onClose}>
						Aceptar
					</Button>
			}
		</DialogActions>
	</Dialog >
}

export default AppSimpleDialog;
