from flask import Flask, render_template, request, redirect, jsonify
import json
import random
import string
import os

app = Flask(__name__)
DATA_FILE = "data.json"
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump({}, f)

def load_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

def generate_code():
    while True:
        code = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
        data = load_data()
        if code not in data:
            return code
@app.route("/")
def home():
    return render_template("index.html")
@app.route("/shorten", methods=["POST"])
def shorten():
    url = request.form["url"]
    if url == "" or not (url.startswith("http://") or url.startswith("https://")):
        return render_template(
            "index.html",
            error="Please enter a valid URL starting with http:// or https://"
        )
    code = generate_code()
    data = load_data()
    data[code] = {
        "url": url,
        "clicks": 0
    }
    save_data(data)
    short_url = request.host_url + "s/" + code
    return render_template(
        "index.html",
        short_url=short_url
    )
@app.route("/s/<code>")
def redirect_url(code):
    data = load_data()
    if code not in data:
        return render_template("error.html")
    data[code]["clicks"] += 1
    save_data(data)
    return redirect(data[code]["url"])
@app.route("/dashboard")
def dashboard():
    data = load_data()
    return render_template(
        "dashboard.html",
        links=data
    )
@app.route("/api/links")
def api():
    return jsonify(load_data())
if __name__ == "__main__":
    app.run(debug=True)
