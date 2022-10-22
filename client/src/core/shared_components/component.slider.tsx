import Slider from "@mui/material/Slider";
import type {ReactElement} from "react"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {Tooltip} from "@mui/material";

interface IAppSliderProps {
	defaultValue?: number;
	maxValue?: number;
	minValue?: number;
	displayValue?: boolean;
	onChange?: (value: number) => void;
	valueLabelBuilder?: (value: number) => string;
	label: string;
	infoText?: string;
}

export function AppSlider({
	label,
	defaultValue = 0,
	maxValue = 100,
	minValue = -100,
	displayValue = true,
	infoText,
	onChange = () => {},
	valueLabelBuilder = (value: number) => `${value}`,
}: IAppSliderProps): ReactElement {
	return (
		<div className="max-w-full" style={{boxSizing: 'border-box'}}>
			<label className="flex flex-row items-center">
				<p>{label}&nbsp;</p>
				<Tooltip title={infoText} placement="right-end">
					<InfoOutlinedIcon fontSize="small" />
				</Tooltip>
			</label>
			<Slider
				step={10}
				valueLabelFormat={valueLabelBuilder}
				defaultValue={defaultValue}
				min={minValue}
				max={maxValue}
				marks={true}
				disableSwap={true}
				onChange={(_, value) => {
					onChange(value as number);
				}}
				aria-label="Default"
				valueLabelDisplay={displayValue ? "auto" : "off"}
			/>
		</div>
	);
}
