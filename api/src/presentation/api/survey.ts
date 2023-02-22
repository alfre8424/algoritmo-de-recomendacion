import express, { Router } from 'express';
import AppError from '../../core/error';
import SurveyRepository from '../../data/repositories/survey/repository.survey';
import { SurveyEntity } from '../../domain/entities/entity.survey';

export default class SurveyController {
  public path = '/survey';
  public router: Router;
  public repository: SurveyRepository;

  constructor() {
    this.repository = new SurveyRepository();
    this.router = express.Router();

    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path + '/add', (req, res) => this.addSurvey(req, res));
  }

  /**
  * Adds a new survey for the specified commerce on the [survey] object which must match 
  * the SurveyEntity interface.
  */
  async addSurvey(req: any, res: any): Promise<void> {
    const { survey }: {
      survey: SurveyEntity;
    } = req.body;

    if (!survey) {
      return res.status(400).json({
        message: 'No se ha especificado la encuesta',
      });
    }

    // the [survey] must match the SurveyEntity interface
    if (!survey.commerceId || !survey.question || !survey.rating) {
      return res.status(400).json({
        message: 'La encuesta no es válida',
      });
    }

    const response = await this.repository.createSurvey(survey)

    if (response instanceof AppError) {
      console.error(response.debugMessage);
      res.status(400).json({
        message: response.message,
      });
      return;
    }

    res.status(200).json({
      message: 'Encuesta agregada correctamente',
    });
  }
}
