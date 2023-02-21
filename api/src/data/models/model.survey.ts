import { SurveyEntity } from "../../domain/entities/entity.survey";

export class SurveyModel implements SurveyEntity {
  commerceId: string;
  commerceName: string;
  question: string;
  rating: number;
  createdAt: Date;

  constructor(survey: SurveyEntity) {
    this.commerceId = survey.commerceId;
    this.commerceName = survey.commerceName;
    this.question = survey.question;
    this.rating = survey.rating;
    this.createdAt = survey.createdAt;
  }

  static fromJson(json: any): SurveyModel {
    return new SurveyModel({
      commerceId: json['commerce_id'],
      commerceName: json['commerce_name'],
      question: json['question'],
      rating: json['rating'],
      createdAt: json['created_at'],
    });
  }
}
