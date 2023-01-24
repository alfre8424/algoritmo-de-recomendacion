import {AddShoppingCartOutlined} from "@mui/icons-material";
import {Avatar, Button} from "@mui/material";
import ProductEntity from "domain/entities/entity.product";
import ImageIcon from '@mui/icons-material/Image';
import type {ReactElement} from "react"

interface ProductCardProps {
	key: string;
	product: ProductEntity;
}

export function ProductCard({
	key, product,
}: ProductCardProps): ReactElement {
	return <div
		className="w-[200px] flex flex-col p-4 m-2 shadow-md rounded-md bg-blue-50"
		key={key}
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
}
