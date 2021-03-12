from flask import (
    Flask,
    json,
    jsonify,
    make_response,
    render_template,
    request,
    redirect,
)
import pymongo
from flask.json import dumps
from bson import json_util
from datetime import datetime

client = pymongo.MongoClient("mongodb://localhost:27017/")
database = client["todo_app"]
collection = database["tasks"]
collection_finish = database["tasks_finalizated"]

app = Flask(__name__)

# TODO: debo pasar toda la lógica de base de datos a la carpeta "db"


def parse_json(data):
    return json.loads(json_util.dumps(data))


def list_tasks():
    list_objects = collection.find()
    list_tasks = list(list_objects)

    return render_template("index.html", list_tasks=parse_json(list_tasks))


@app.route("/", methods=["GET"])
def index():
    return list_tasks()


@app.route("/redirect_to_finished_tasks", methods=["GET"])
def redirect_to_finished_tasks():
    list_objects = collection_finish.find()
    list_tasks = list(list_objects)

    return render_template(
        "tasks_finalizated.html", list_tasks_finalizated=parse_json(list_tasks)
    )


# EL ATRIBUTO FORCE=TRUE HACE QUE SE IGNOREN LOS HEADERS Y SE RECIBA IGUAL LA INFO
@app.route("/save_task", methods=["POST"])
def save():
    data = request.get_json(silent=True, force=True)
    collection.insert_one(data)

    return list_tasks()


@app.route("/delete_task", methods=["DELETE"])
def delete():
    task_to_delete = request.get_json(silent=True, force=True)
    task = task_to_delete["task"]
    query = {"task": task}

    collection.delete_one(query)

    return list_tasks()


@app.route("/finish_task", methods=["POST"])
def finish():
    task_to_finish = request.get_json(silent=True, force=True)
    task = task_to_finish["task"]
    query = {"task": task}
    collection.delete_one(query)

    del task_to_finish["_id"]
    task_to_finish["datetime"] = datetime.now()

    collection_finish.insert_one(task_to_finish)
    return list_tasks()


@app.route("/list_tasks", methods=["GET"])
def show_task():
    return list_tasks()


if __name__ == "__main__":
    app.run(port=5000, debug=True)
