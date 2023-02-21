import AppError from "../../../core/error";
import { SurveyEntity } from "../../../domain/entities/entity.survey";
import { createSurveyByCommerceUsecase, queryByCommerceUsecase } from "./usecases/query_surveys";

export default class SurveyRepository {
  async createSurvey(survey: SurveyEntity): Promise<AppError | boolean> {
    return await createSurveyByCommerceUsecase(survey);
  }

  async queryAllSurveys(commerceId: string): Promise<AppError | SurveyEntity[]> {
    return await queryByCommerceUsecase(commerceId);
  }
}
