import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import {ListItemSecondaryAction} from '@mui/material';
import {DeleteOutlined, EditOutlined} from '@mui/icons-material';

export default function ListView() {
	return (
		<List sx={{width: '100%', bgcolor: 'background.paper'}}>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<ImageIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary="Aceite Oro 1L (3 unidades)" secondary="precio: $5.00 c/u" />
			</ListItem>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<WorkIcon />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary="Galletas Oreo x6 (3 unidades)" secondary="precio: $4.00 c/u" />
				<ListItemSecondaryAction>
					<DeleteOutlined />
					<EditOutlined />
				</ListItemSecondaryAction>
			</ListItem>
		</List>
	);
}
