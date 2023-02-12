# exit on error
set -e

echo "Killing previous containers"
docker-compose down

echo "Preparing services for deployment on development server"
CURR_DIR=$(pwd)

cd $CURR_DIR/api

# building backend image
docker build -t api_clan_del_dragon .

cd $CURR_DIR/client

# building frontend image
docker build -t client_clan_del_dragon .

# building ETL image
cd $CURR_DIR/etl
docker build -t etl_clan_del_dragon .

cd $CURR_DIR
echo "Starting images"
docker-compose up -d

# docker exec -d clan_del_dragon_client npm start

docker exec -it api_clan_del_dragon npm install
docker exec -it client_clan_del_dragon npm install

# creando bases de datos desde la fuente usando source
echo "12345678" | docker exec -i mysql_clan_del_dragon mysql -u root -p -e "source /scripts/respaldo_casanova.sql"

echo "12345678" | docker exec -i mysql_clan_del_dragon mysql -u root -p -e "source /scripts/respaldo_gonzalozambrano.sql"

echo "12345678" | docker exec -i mysql_clan_del_dragon mysql -u root -p -e "source /scripts/respaldo_peralta.sql"

# inicializando los ETL
docker exec etl_clan_del_dragon service cron start
docker exec etl_clan_del_dragon bash init_etl.sh
echo "Corriendo cron job"
docker exec etl_clan_del_dragon python3 worker.py

echo "Montando contenedores..."
(docker exec -it api_clan_del_dragon npm run start:dev) & (docker exec -it client_clan_del_dragon npm start) ; fg

