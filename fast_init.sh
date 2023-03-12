# exit on error
set -e

echo "Killing previous containers"
docker-compose down
docker-compose up -d

docker exec -it api_clan_del_dragon npm install
docker exec -it client_clan_del_dragon npm install

# inicializando los ETL
docker exec etl_clan_del_dragon service cron start
docker exec etl_clan_del_dragon bash init_etl.sh
echo "Corriendo cron job"
docker exec etl_clan_del_dragon python3 worker.py
