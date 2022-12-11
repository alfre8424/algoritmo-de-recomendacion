class Either<T, K> {
	private left?: T;
	private right?: K;

	isLeft(): boolean {
		return this.left === true;
	}
	isRight(): boolean {
		return this.right === true;
	}

	private constructor(left?: T, right?: K) {
		this.left = left;
		this.right = right;
	}

	static left<T, K>(left: T): Either<T, K> {
		return new Either<T, K>(left, undefined);
	}

	static right<T, K>(right: K): Either<T, K> {
		return new Either<T, K>(undefined, right);
	}

	/**
	 * If the [condition] is true then return the [right] value
	 */
	static cond<T, K>(condition: boolean, left: T, right: K): Either<T, K> {
		return !condition ? Either.left(left) : Either.right(right);
	}
}

export default Either;
