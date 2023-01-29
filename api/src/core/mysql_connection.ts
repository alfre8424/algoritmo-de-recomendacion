import mysql from 'mysql2/promise';

class MySQLConnection {
  public connection: mysql.Pool;
  public transaction: mysql.Connection|null;

  constructor() {
	this.connection = mysql.createPool({
	  host: process.env.DB_HOST,
	  user: process.env.DB_USERNAME,
	  database: process.env.DB_NAME,
	  password: process.env.DB_PASSWORD,
	  waitForConnections: true,
	  connectionLimit: 10,
	  queueLimit: 0
	});

    this.transaction = null;
  }

  async stablishConnection() {
    // TODO: implement it
    this.transaction = await (mysql.createConnection(
      ""
    ));
  }
}

const mysqlConnection = new MySQLConnection();

export type MySQLConn = MySQLConnection;
export default mysqlConnection;
