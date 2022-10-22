import TextField from "@mui/material/TextField";

interface IAppSearchBarProps {
	value: string;
	onChange: (value: string) => void;
	label: string;
	id?: string;
}
const SearchAppBar = ({
	value,
	onChange,
	label,
	id,
}: IAppSearchBarProps) => {
	return <TextField
		id={id}
		label={label}
		variant="filled"
	/>;
}

export default SearchAppBar;
