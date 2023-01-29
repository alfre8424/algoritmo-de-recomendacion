import AppError from "../../../core/error";
import { addToCartUsecase } from "./usecases/add_product";

export default class CartRepository {
	async addCart(userId: string|null, products: string[]): Promise<AppError|boolean> {
		return await addToCartUsecase(userId, products);
	}

}
