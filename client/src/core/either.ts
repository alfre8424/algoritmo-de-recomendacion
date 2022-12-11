class Either<T, K> {
	/**
	 * Determines if the user checked for the existence 
	 * of a value in the [right] or [left] side of the Either
	 */
	private checked: boolean = false;
	private left?: T;
	private right?: K;

	isLeft(): boolean {
		this.checked = true;
		return this.left !== undefined;
	}
	isRight(): boolean {
		this.checked = true;
		return this.right !== undefined;
	}

	private constructor(left?: T, right?: K) {
		this.left = left;
		this.right = right;
	}

	getLeft(): T {
		if (!this.checked) {
			throw new Error("Either is not checked");
		}
		return this.left!;
	}

	getRight(): K {
		if (!this.checked) {
			throw new Error("Either is not checked");
		}
		return this.right!;
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
