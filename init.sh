# exit on error
set -e

echo "Killing previous containers"
docker-compose down

echo "Preparing services for deployment on development server"
CURR_DIR=$(pwd)

cd $CURR_DIR/api

# building backend image
docker build -t clan_del_dragon_api .

cd $CURR_DIR/client

# building frontend image
docker build -t clan_del_dragon_client .

cd $CURR_DIR
echo "Starting images"
docker-compose up -d

# docker exec -d clan_del_dragon_client npm start

docker exec -it clan_del_dragon_api npm install
docker exec -it clan_del_dragon_client npm install

# creando bases de datos desde la fuente usando source
echo "12345678" | docker exec -i clan_del_dragon_mysql mysql -u root -p -e "source /scripts/respaldo_casanova.sql"

echo "12345678" | docker exec -i clan_del_dragon_mysql mysql -u root -p -e "source /scripts/respaldo_gonzalozambrano.sql"

echo "12345678" | docker exec -i clan_del_dragon_mysql mysql -u root -p -e "source /scripts/respaldo_peralta.sql"

(docker exec -it clan_del_dragon_api npm run start:dev) & (docker exec -it clan_del_dragon_client npm start) ; fg ; wait
