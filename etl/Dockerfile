FROM python:bullseye

WORKDIR /etl

COPY . .

RUN echo "Installing python"
RUN pip3 install -r requirements.txt
RUN python3 -m spacy download en_core_web_sm

RUN echo "Executing ETL"
WORKDIR /etl/procedures/
RUN python3 ./etl_gonzalozambrano.py
RUN python3 ./etl_casanova.py

WORKDIR /etl
RUN apt-get update && apt-get install cron -y

