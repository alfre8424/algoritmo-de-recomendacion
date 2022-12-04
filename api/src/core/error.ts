interface IAppError {
	message: string;
	debugMessage?: string;
	errorDate?: Date;
	errCode?: string;
}

export default class AppError implements IAppError {

	message: string;
	debugMessage?: string | undefined;
	errorDate?: Date | undefined;
	errCode?: string | undefined;

	constructor(intput: IAppError) {
		this.message = intput.message;
		this.debugMessage = intput.debugMessage;
		this.errCode = intput.errCode;
	}

	// override to string 
	getJSON() {
		console.error(this);
		return {
			message: this.message,
			errCode: this.errCode,
		};
	}
}
