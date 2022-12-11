export enum UIActionType {
	loginLoader = "[UI] login loader",
}

export default interface UIState {
	/**
	 * This user will also include the token
	 */
	showLoginLoader: boolean;
}

export interface UIAction {
	type: UIActionType;
	payload: {show?: boolean};
}
