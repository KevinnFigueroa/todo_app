from flask import Flask, render_template, request, jsonify, make_response
import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
database = client["todo_app"]
collection = database["tasks"]

app = Flask(__name__)

# TODO: debo pasar toda la lógica de base de datos a la carpeta "db"


@app.route("/")
def index():
    return render_template("index.html")


# EL ATRIBUTO FORCE=TRUE HACE QUE SE IGNOREN LOS HEADERS Y SE RECIBA IGUAL LA INFO
@app.route("/save_task", methods=["POST"])
def save():
    # proyect = request.args.get("proyect")
    # title = request.args.get("title")
    # task = request.args.get("task")
    # max_date = request.args.get("maxDate")
    # max_time = request.args.get("maxTime")
    # print(proyect)
    # print(title)
    data = request.get_json(silent=True, force=True)

    print(data)
    collection.insert_one(data)
    data = {"ok": True}
    return jsonify(data)


# debo usar el motor de ninja para hacer un for y mostrar las tareas que estan en la bd

# debo siempre retornar los datos que estan en la bd para que se actualice la pantalla
if __name__ == "__main__":
    app.run(port=5000, debug=True)
