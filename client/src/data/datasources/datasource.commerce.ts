import Either from "core/either";
import AppError from "core/error";
import Globals from "core/globals";

/** 
 * Datasource to comunicate this client with the session API
 */
export default class CommerceDatasource {

  /**
   *
   */
  async loadAll(): Promise<Either<AppError, any[]>> {

    // target url to login
    const url = `${Globals.TRANSACTIONAL_API}/commerce`;

    // sending the request 
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    // extracting the body 
    const responseBody = await response.json();

    if (response.status === 400 || response.status === 500) {
      return Either.left({
        error: responseBody.message ?? "Ha ocurrido un error crítico",
        errCode: responseBody.errCode ?? "ERR__DATASOURCES__SESSION__LOGIN",
        errorDate: new Date()
      } as AppError);
    }

    return Either.right(responseBody.data);
  }
}

