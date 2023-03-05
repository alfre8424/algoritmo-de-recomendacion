# exit on error
set -e

# reading a variable to force reconstructing the images 
FORCE_REBUILD=$1
# (if the variable is not set, then it will be set to 0)
FORCE_REBUILD=${FORCE_REBUILD:-0}

echo "Killing previous containers"
docker-compose down

echo "Preparing services for deployment on development server"
CURR_DIR=$(pwd)

cd $CURR_DIR/api

# building backend image consideting [FORCE_REBUILD] variable and if the contianer 
# does not exist yet
if [ "$(docker images -aq -f name=api_clan_del_dragon)" ] && [ $FORCE_REBUILD -eq 0 ]; then
    echo "Container client_clan_del_dragon already exists"
else
    echo "Container client_clan_del_dragon doesn't exist, building it"
    docker build -t api_clan_del_dragon .
fi

cd $CURR_DIR/client

# checking if a container with the name 'client_clan_del_dragon' exists, if it doesn't 
# then it will be built
if [ "$(docker ps -aq -f name=client_clan_del_dragon)" ]; then
    echo "Container client_clan_del_dragon already exists"
else
    echo "Container client_clan_del_dragon doesn't exist, building it"
    # building frontend image
    docker build -t client_clan_del_dragon .
fi
# building ETL image
cd $CURR_DIR/etl

if [ "$(docker ps -aq -f name=etl_clan_del_dragon)" ]; then
    echo "Container etl_clan_del_dragon already exists"
else
    echo "Container etl_clan_del_dragon doesn't exist, building it"
    docker build -t etl_clan_del_dragon .
fi
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

