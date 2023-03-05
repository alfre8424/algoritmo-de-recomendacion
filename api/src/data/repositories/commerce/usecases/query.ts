import AppError from '../../../../core/error';
import mysqlConnection from "../../../../core/mysql_connection"
import { Commerce } from '../../../models/model.commerce';


/**
 * @param products - The Ids of all the products to be added
 */
export const queryCommcer = async (): Promise<AppError | Commerce[]> => {
  const connector = mysqlConnection;


  let commerces: Commerce[] = [];
  try {
    // creating the cart
    let [rows] = await connector.connection.execute(
      'select * from commerce',
    );

    const dboutput: any[] = JSON.parse(JSON.stringify(rows));

    for (let i = 0; i < dboutput.length; i++) {
      // parsing the data from the database
      commerces.push(dboutput[i]);
    }

    return commerces;
  } catch (e) {
    console.error(e);
  }
  finally {
    return commerces;
  }
}
