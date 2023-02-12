from flask import Flask
app = Flask(__name__)

# definiendo rutas
@app.route('/test')
def test():
    return 'Hola Mundo'

if __name__ == '__main__':
    app.run(debug=True, port=8300)
