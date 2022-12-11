import UIState from "./type";
import {UIAction, UIActionType} from "./type"

const initialState: UIState = {showLoginLoader: false};

export const uiReducer = (state = initialState, action: UIAction): UIState => {
	switch (action.type) {
		case UIActionType.loginLoader:
			const {show} = action.payload;
			return {
				...state,
				showLoginLoader: show === true,
			};
		default:
			return state;
	}
}
