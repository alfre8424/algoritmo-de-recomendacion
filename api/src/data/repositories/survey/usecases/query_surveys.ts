import AppError from '../../../../core/error';
import mysqlConnection from '../../../../core/mysql_connection';
import { SurveyEntity } from '../../../../domain/entities/entity.survey';


/**
 * @param products - The Ids of all the products to be added
 */
export const queryByCommerceUsecase = async (commerceId: string): Promise<AppError | SurveyEntity[]> => {
  return new AppError({
    message: 'Not implemented yet',
    debugMessage: 'Calling to the non implemented method: queryByCommerceUsecase for commerce id: ' + commerceId,
  });
}

export const createSurveyByCommerceUsecase = async (survey: SurveyEntity): Promise<AppError | boolean> => {
  const connector = mysqlConnection;

  try {
    // creating the cart
    await connector.connection.execute(
      'insert into commerce_surveys values(?, ?, ?, ?, now(), now())',
      // TODO: add user support here (second parameter)
      [survey.commerceId, null, survey.question, survey.rating]
    );
  } catch (e) {
    console.error(e);
    if ((e as string).toString().split(' ').indexOf('FOREIGN') > -1) {
      return new AppError({
        message: "El local ingresado no existe",
        debugMessage: `${e}`,
      });
    }
    return new AppError({
      message: "Error agregando la encuesta, intente más tarde.\n" + e,
      debugMessage: `${e}`,
    });
  }

  return true;
}

