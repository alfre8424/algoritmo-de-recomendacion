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

docker exec -d clan_del_dragon_client npm start
