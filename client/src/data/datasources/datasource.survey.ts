import AppError from "core/error"
import Globals from "core/globals"
import SurveyModel from "data/models/model.survey";

export default class SurveyDatasource {
  async save(survey: SurveyModel): Promise<AppError | boolean> {
    const response = await fetch(Globals.TRANSACTIONAL_API + "/survey/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        survey: survey.toJson()
      })
    });

    const responseBody = await response.json();

    if (response.status !== 200) {
      return ({
        error: responseBody.message ?? "Ha ocurrido un error crítico",
        errCode: responseBody.errCode ?? "ERR__DATASOURCES__SESSION__LOGIN",
        errorDate: new Date()
      } as AppError);
    }

    return true;
  }
}
