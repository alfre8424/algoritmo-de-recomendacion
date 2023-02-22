export default class SurveyModel {
  public commerceId: string;
  public rating: number;
  public question: string;

  constructor(commerceId: string, rating: number, question: string) {
    this.commerceId = commerceId;
    this.rating = rating;
    this.question = question;
  }

  public toJson(): any {
    return {
      'commerceId': this.commerceId,
      'rating': this.rating,
      'question': this.question
    };
  }
}
