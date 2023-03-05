export class Commerce {
  id: string;
  name: string;
  email: string;
  webpage: string;
  location: string;
  image_url: string;
  popularity: number;

  constructor(commerce: Commerce) {
    this.id = commerce.id;
    this.name = commerce.name;
    this.email = commerce.email;
    this.webpage = commerce.webpage;
    this.location = commerce.location;
    this.image_url = commerce.image_url;
    this.popularity = commerce.popularity;
  }

  static fromJson(json: any): Commerce {
    return new Commerce({
      id: json['id'],
      name: json['name'],
      email: json['email'],
      webpage: json['webpage'],
      location: json['location'],
      image_url: json['image_url'],
      popularity: json['popularity'],
    });
  }
}
