/**
 * this interface will help us to manage all the app errors 
 * on the presentation layer. This class is used along 
 * with Either class to propagate the errors from the 
 * data layer to the presentation layer.
 */
interface AppError {
	/**
	 * The error to show to the user 
	 */
	error: string;
	/**
	 * The error for debug
	 */ 
	debugError?: string;
	/**
	 * The error code indicating the layer, the file and the 
	 * method where the error was thrown
	 */
	errorCode?: string;
	errorDate?: Date;
}

export default AppError;
