import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import {Button} from '@mui/material';
import {AddShoppingCartOutlined} from '@mui/icons-material';
import {useEffect, useRef, useState} from 'react';
import ProductsController, {LoadProductParams} from 'presentation/logic/products/controller';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from 'presentation/logic/redux_config';
import {Audio, Circles, Puff, Rings, SpinningCircles, TailSpin, useLoading} from '@agney/react-loading';

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

	const productsController = new ProductsController();
	useEffect(() => {
		offRef.current = offset;
	}, []);

	useEffect(() => {
		setLoading(true);
		dispatch(productsController.load({limit, offset}, (_) => {
			setLoading(false);
		}));
	}, [offRef.current]);

	return (
		<div className="w-[100%] h-[40vh] overflow-y-scroll flex flex-row flex-wrap p-4">
			{
				[(products ?? []).map((product, index) => {
					return <div
						className="w-[200px] flex flex-col p-4 m-2 shadow-md rounded-md bg-blue-50"
						key={index}
					>
						<div className="mx-auto">
							<Avatar>
								<ImageIcon />
							</Avatar>
						</div>
						<div className="mx-auto">
							<h1 className="font-bold text-center">
								{product.name}
							</h1>
						</div>
						<div className="flex flex-col text-sm">
							<span className="text-gray-500">
								Popularidad: {product.popularity}
							</span>
							<span className="text-gray-500">
								Cantidad: {product.unit}
							</span>
						</div>
						<div
							className="flex flex-row justify-center items-center my-2"
							style={{bottom: 0}}
						>
							<Button
								sx={{fontSize: '12px'}}
								variant="outlined"
								onClick={() => {
									alert("Aun no implementado :'(")
								}}
							>
								Agregar &nbsp;&nbsp;
								<AddShoppingCartOutlined sx={{fontSize: '16px'}} />
							</Button>
						</div>
					</div>;
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
