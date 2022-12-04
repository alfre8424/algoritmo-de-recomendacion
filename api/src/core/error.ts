class AppError {
	message: string;
	debugMessage?: string;
	errorDate?: Date;
	errCode?: string;

	constructor(intput: AppError) {
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
