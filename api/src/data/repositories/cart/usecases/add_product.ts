import { v4 as uuidv4 } from 'uuid';
import AppError from '../../../../core/error';
import mysqlConnection from "../../../../core/mysql_connection"


/**
 * @param products - The Ids of all the products to be added
 */
export const addToCartUsecase = async (userId: string | null, products: string[]): Promise<AppError | boolean> => {
  const connector = mysqlConnection;

  const cartId = uuidv4();

  const currentDate = new Date();
  let structuredMySQLTimestamp = `${currentDate.getFullYear()}`;
  structuredMySQLTimestamp += `-${currentDate.getMonth() + 1}`;
  structuredMySQLTimestamp += `-${currentDate.getDate()}`;
  structuredMySQLTimestamp += ` ${currentDate.getHours().toString().padStart(2, '0')}`;
  structuredMySQLTimestamp += `:${currentDate.getMinutes().toString().padStart(2, '0')}`;
  structuredMySQLTimestamp += `:${currentDate.getSeconds().toString().padStart(2, '0')}`;

  console.log("Using timestamp", structuredMySQLTimestamp);

  try {
    // creating the cart
    await connector.connection.execute(
      'insert into cart values(?, ?, null, ?, ?, true)',
      [cartId, userId, structuredMySQLTimestamp, structuredMySQLTimestamp]
    );

    // adding the products
    let productsToAdd = ""

    for (let i = 0; i < products.length; ++i) {
      let productUuuid = uuidv4();
      productsToAdd += `("${productUuuid}",`; // Id
      productsToAdd += `"${cartId}",`; // cartid
      productsToAdd += `"${products[i]}",`; // productId
      productsToAdd += `0.00,`; // TODO: complete it (price)
      productsToAdd += `1,`; // TODO: complete it (quantity)
      productsToAdd += `true,`; // enabled
      productsToAdd += `"${structuredMySQLTimestamp}",`; // createdAt
      productsToAdd += `"${structuredMySQLTimestamp}"`; // updatedAt
      productsToAdd += `),`;
    }

    // removing the last comma
    productsToAdd = productsToAdd.slice(0, productsToAdd.length - 1);

    // inserting all the records
    await connector.connection.execute(
      "insert into cart_product values "+productsToAdd,
    );
  } catch (e) {
    console.error(e);
  }

  return true;
}
