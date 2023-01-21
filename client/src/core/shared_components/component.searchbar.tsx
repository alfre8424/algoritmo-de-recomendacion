import {SearchOutlined} from "@mui/icons-material";
import {Input, InputAdornment, InputLabel} from "@mui/material";

interface IAppSearchBarProps {
	value: string;
	onChange: (value: string) => void;
	label: string;
	placeholder?: string;
	id?: string;
}
const SearchAppBar = ({
	value,
	onChange,
	placeholder,
	label,
	id,
}: IAppSearchBarProps) => {
	return (
		<div className="w-full">
			<InputLabel htmlFor={id}>{label}</InputLabel>
			<Input
				placeholder={placeholder}
				className="w-full"
				onChange={(e) => onChange(e.target.value)}
				startAdornment={
					<InputAdornment position="start">
						<SearchOutlined />
					</InputAdornment>
				}
				id={id}
			/>
		</div>
	);
}

export default SearchAppBar;
