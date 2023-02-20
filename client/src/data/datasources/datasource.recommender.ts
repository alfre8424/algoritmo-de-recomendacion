import Either from "core/either"
import AppError from "core/error"
import Globals from "core/globals"
import RecommendationEntity from "domain/entities/entity.recommendation"

export default class RecommenderDatasource {
  /**
  * This is the method used to recommend a determined commerce for a given  
* basket of products.
*
  * @param {string[]} basket - List of product ids
  */
  async recommend(basket: string[]): Promise<Either<AppError, RecommendationEntity>> {
    const response = await fetch(Globals.MODEL_API + "/api/v1/recomendar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "canasta": basket
      })
    });

    const responseBody = await response.json();

    if (response.status !== 200) {
      return Either.left({
        error: responseBody.message ?? "Ha ocurrido un error crítico",
        errCode: responseBody.errCode ?? "ERR__DATASOURCES__SESSION__LOGIN",
        errorDate: new Date()
      });
    }

    return Either.right({
      basket: responseBody.canasta,
      commerce: {
        "id": "5-0 coqueta",
        "location": "",
        "popularity": -1,
        "quality": -1,
        "name": responseBody.mejor_local,
      },
      basketPrice: responseBody.precio,
      missingProducts: responseBody.productos_faltantes,
      score: responseBody.score
    });
  }
}
