pip install -r requirements.txt
python3 -m spacy download en_core_web_sm

python3 ./procedures/etl_casanova.py
python3 ./procedures/etl_gonzalozambrano.py
