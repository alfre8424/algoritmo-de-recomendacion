FROM python:bullseye

WORKDIR /etl

COPY . .

RUN echo "Installing python"
RUN pip install -r requirements.txt

RUN echo "Executing Gonzalo Zambrano's ETL"
WORKDIR /etl/procedures/gonzalozambrano
RUN python3 ./extraction.py

# RUN apt-get update && apt-get install 

