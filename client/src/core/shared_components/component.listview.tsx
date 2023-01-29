import {Button} from '@mui/material';
import {useEffect, useRef, useState} from 'react';
import ProductsController from 'presentation/logic/products/controller';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from 'presentation/logic/redux_config';
import {Puff, useLoading} from '@agney/react-loading';
import {ProductCard} from './component.product_card';

export default function ListView() {

	const dispatch: AppDispatch = useDispatch();
	const {products} = useSelector((state: RootState) => state.products);
	const [loading, setLoading] = useState(false);

	const limit = 10;
	const [offset, setOffset] = useState(0);
	const offRef = useRef<number | null>(null);

	const {containerProps, indicatorEl} = useLoading({
		loading: true,
		indicator: <Puff width="50" />,
	})

	const loadMore = () => {
		offRef.current = offset + limit;
		setOffset(offset + limit);
	}
	offRef.current = offset;

	const productsController = new ProductsController();

	useEffect(() => {
		setLoading(true);
		if (offRef.current !== null) {
			dispatch(productsController.load({limit, offset}, (_) => {
				setLoading(false);
			}));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [offRef.current]);

	return (
		<div className="w-[100%] h-[40vh] overflow-y-scroll flex flex-row flex-wrap p-4">
			{
				[(products ?? []).map((product, index) => {
					return <ProductCard
						key={index}
						product={product}
					/>;
				}),
				<div className="w-[200px] h-[200px] flex justify-center items-center">
					{
						loading ?
							<section key='s' {...containerProps}>
								{indicatorEl}
							</section> : <Button
								sx={{fontSize: '12px'}}
								variant="contained"
								onClick={loadMore}
							>
								Cargar más
							</Button>
					}
				</div>,
				]
			}
		</div>
	);
}
