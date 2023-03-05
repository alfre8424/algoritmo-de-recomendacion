import { Button, Rating, Typography } from "@mui/material";
import { ProductCard } from "core/shared_components/component.product_card";
import { mergeClasses } from "core/utils/util.classess";
import RecommenderDatasource from "data/datasources/datasource.recommender";
import SurveyDatasource from "data/datasources/datasource.survey";
import SurveyModel from "data/models/model.survey";
import ProductEntity from "domain/entities/entity.product";
import RecommendationEntity from "domain/entities/entity.recommendation";
import { RootState } from "presentation/logic/redux_config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface IRecommendCompoentProps {
  onDone: () => void;
}

export const RecommendComponent = ({ onDone }: IRecommendCompoentProps) => {

  // loading to show the process of prediction
  const [preLoading, setPreLoading] = useState<boolean>(false);
  const [basketResponse, setBasketResponse] = useState<RecommendationEntity | null>(null);
  const [surveyRatings, setSurveyRatings] = useState<SurveyModel[] | null>(null);
  const { cartProducts } = useSelector((state: RootState) => state.cart);

  const parsedBasketProducts = cartProducts.map((product) => {
    return product.product.id;
  });

  useEffect(() => {
    setPreLoading(true);
    const recommendationDS = new RecommenderDatasource();
    recommendationDS.recommend(parsedBasketProducts).then((response) => {
      if (response.isRight()) {
        setBasketResponse(response.getRight());
      }
      setPreLoading(false);
    });
  }, []);

  useEffect(() => {
    // updating the questions as well
    setSurveyRatings([
      new SurveyModel(
        basketResponse?.commerce.id ?? "",
        surveyRatings ? surveyRatings[0].rating : 0,
        `¿Qué tan buena fue la atención brindada en ${basketResponse?.commerce.name}?`,
      ),
      new SurveyModel(
        basketResponse?.commerce.id ?? "",
        surveyRatings ? surveyRatings[1].rating : 0,
        `¿Qué tanta variedad de productos hay en ${basketResponse?.commerce.name}?`,
      ),
      new SurveyModel(
        basketResponse?.commerce.id ?? "",
        surveyRatings ? surveyRatings[2].rating : 0,
        `¿Qué tan probable es que recomiende comprar en ${basketResponse?.commerce.name}?`,
      ),
    ]);
  }, [basketResponse]);

  const saveSurvey = () => {
    onDone();
  }

  const onRatingChanged = (survey: SurveyModel) => {
    const surveyDS = new SurveyDatasource();
    surveyDS.save(survey);
  }

  if (!surveyRatings || !basketResponse) return (<span>Cargando...</span>);

  return (
    <div>
      <h1 className="font-bold text-center text-xl">¡Te recomendamos {basketResponse?.commerce.name}!</h1>
      <br />

      <div
        className={
          mergeClasses(
            "flex flex-row flex-wrap gap-2 justify-center"
          )
        }
      >
        {
          basketResponse?.basket?.map((product: ProductEntity, index: number) => {
            return <ProductCard
              showAddBtn={false}
              key={index}
              product={product}
            />;
          })
        }
      </div>
      <br />
      <span className="text-gray-500">
        ¡En {basketResponse?.commerce.name} puedes encontrar&nbsp;
        {
          basketResponse?.basket.length !== cartProducts.length ?
            `${basketResponse?.basket.length} de los ${cartProducts.length} productos de tu canasta!`
            : "todos los productos de tu canasta "
        }
        por un precio de solo ${basketResponse?.basketPrice.toFixed(2).replace('.', ',')}!
        {
          basketResponse?.commerce.webpage && `Puedes visitar su página web en ${basketResponse?.commerce.webpage}.`
        }
      </span>

      <br />
      <br />
      <h2
        className="text-lg font-semibold"
      >
        Encuesta de calidad
      </h2>
      <br /><br />
      <Typography component="legend">{surveyRatings![0].question}</Typography>
      <Rating
        name="survey1"
        value={surveyRatings![0].rating}
        onChange={(_, newValue) => {
          const newSurvey = new SurveyModel(
            surveyRatings![0].commerceId,
            newValue ?? 0,
            surveyRatings![0].question
          );
          setSurveyRatings([
            newSurvey,
            ...surveyRatings!.slice(1)
          ]);
          // updating on DB
          onRatingChanged(newSurvey);
        }}
      />
      <br />
      <Typography component="legend">{surveyRatings![1].question}</Typography>
      <Rating
        name="suervey2"
        value={surveyRatings![1].rating}
        onChange={(_, newValue) => {
          const newSurvey = new SurveyModel(
            surveyRatings![1].commerceId,
            newValue ?? 0,
            surveyRatings![1].question
          );
          setSurveyRatings([
            surveyRatings![0],
            newSurvey,
            surveyRatings![2]
          ]);
          // updating on DB
          onRatingChanged(newSurvey);
        }}
      />
      <Typography component="legend">{surveyRatings![2].question}</Typography>
      <Rating
        name="suervey2"
        value={surveyRatings![2].rating}
        onChange={(_, newValue) => {
          const newSurvey = new SurveyModel(
            surveyRatings![2].commerceId,
            newValue ?? 0,
            surveyRatings![2].question
          );
          setSurveyRatings([
            ...surveyRatings!.slice(0, 2),
            newSurvey
          ]);
          // updating on DB
          onRatingChanged(newSurvey);
        }}
      />
      <br />
      <div className="flex flex-row justify-center items-center">
        <Button
          variant="outlined"
          onClick={() => {
            saveSurvey();
          }}
        >
          Aceptar
        </Button>
      </div>
    </div>
  );
}
