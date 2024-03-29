import AppSimpleDialog from "core/shared_components/component.dialog";
import React, { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react"
import Carousel from '@itseasy21/react-elastic-carousel';
import AppNavbar from "core/shared_components/component.navbar";
import { AppSearch } from "./components/component.search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "presentation/logic/redux_config";
import { ProductCard } from "core/shared_components/component.product_card";
import { Puff, useLoading } from "@agney/react-loading";
import { Button } from "@mui/material";
import ProductsController from "presentation/logic/products/controller";

export function Home(): ReactElement {

  const [showAlert, setShowAlert] = React.useState(false);
  const { searchedProducts, query } = useSelector((state: RootState) => state.products);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const limit = 10;
  const [offset, setOffset] = useState(0);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff width="50" />,
  })

  const loadMore = () => {
    setOffset(offset + limit);
  }

  const productsController = new ProductsController();


  useEffect(() => {
    setLoading(true);
    dispatch(productsController.load({ limit, offset, query: (query && query.length > 0) ? query : "5-0Koketa" }, (_) => {
      setLoading(false);
    }));
  }, []);

  const carousel = useRef<any>(null);

  const goto = (target: number) => {
    carousel.current.goTo(target);
  }

  const images = [
    'assets/images/1.webp',
    'assets/images/2.webp',
    'assets/images/4.webp',
    'assets/images/5.webp',
  ];

  return (
    <div className="flex flex-col overflow-x-hidden h-min-screen bg-gray-200">
      <div>
        <Carousel
          onChange={
            (_, index) => {
              if (index === images.length - 1) {
                console.log("eneter");
                setTimeout(() => {
                  goto(0);
                }, 3000);
              }
            }
          }
          enableAutoPlay={true}
          showArrows={false}
          isRTL={false}
          autoPlaySpeed={3000}
          ref={(ref: any) => (carousel.current = ref)}
          children={
            images.map((image, index) => {
              return <div
                key={index}
                style={{
                  backgroundImage: `url('${image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "90vh",
                  width: "100%",
                }}
              >
              </div>
            })
          }
        />
      </div>

      <div
        className="flex flex-col right-0 items-end top-0"
        style={{ display: 'box', position: 'absolute' }}
      >
        <div id="nav" className="max-w-[90%] r-0 my-2">
          <AppNavbar />
        </div>
      </div>
      <div id="body" className="w-screen">
        <h1 className="margin-auto my-4 text-center text-2xl font-bold">
          Clan del Dragón
        </h1>
        <div
          className="m-2 flex flex-col items-center p-4 lg:flex-row lg:justify-between lg:items-stretch"
        >
          <div className="w-full h-full">
            <AppSearch
              onSearch={() => setShowAlert(true)}
            />
          </div>
          <div className="lg:w-[1rem]"></div>
        </div>
      </div>
      <AppSimpleDialog
        isOpen={showAlert}
        title="Resultado de la búsqueda"
        content={
          <div className="flex flex-row justify-center flex-wrap gap-[10px]">
            {searchedProducts?.map((product, index) => {
              return <ProductCard
                key={index}
                product={product}
              />
            })}
            <div className="w-[200px] h-[200px] flex justify-center items-center">
              {
                loading ?
                  <section key='s' {...containerProps}>
                    {indicatorEl}
                  </section> : <Button
                    sx={{ fontSize: '12px' }}
                    variant="contained"
                    onClick={loadMore}
                  >
                    Cargar más
                  </Button>
              }
            </div>,
          </div>
        }
        onClose={() => setShowAlert(false)}
      />
    </div >
  );
}
