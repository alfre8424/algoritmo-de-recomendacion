
# Lineamientos generales  
1. Crear un data warehouse para la extracción de datos.  
2. El motor de recomendación debe contemplar la recomendación de marca y local.  
3. Al dar click en recomendar debe aparecer un popup para mostrar los parámetros de recomendación y ser cambiados si se da la necesidad.  
4. Habrá dos perfiles: cliente e invitado.  
5. La canasta se calculará dependiendo de qué tan frecuente sea el producto en canastas adquiridas, considerando la valoración de dicha canasta y parámetros definidos por el usuario.  
6. Habrá varias recomendaciones (cada una con un tipo distinto de enfoque).  
7. Se considerará la distancia.  
8. El perfil de cliente servirá para decodificar patrones.  


# Comandos
- Iniciar sistema: ```bash init.sh```  
- Iniciar Frontend: Se realiza automaticamente, sin embargo, para hacerlo manual es: 
```docker exec -it client_clan_del_dragon npm start```  
- Iniciar API administrativa: ```docker exec -it api_clan_del_dragon npm run start:dev```  
- Iniciar API modelo: ```docker exec -it etl_clan_del_dragon python3 server.py```
