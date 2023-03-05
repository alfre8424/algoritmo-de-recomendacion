import AppError from "../../../core/error";
import mysqlConnection, { MySQLConn } from "../../../core/mysql_connection";
import { Commerce } from "../../models/model.commerce";
import { queryCommcer } from "./usecases/query";

export default class CommerceRepository {
  mysqlConnector: MySQLConn;

  constructor() {
    this.mysqlConnector = mysqlConnection;
  }

  async queryCommerces(): Promise<AppError | Commerce[]> {
    return await queryCommcer();
  }
}
