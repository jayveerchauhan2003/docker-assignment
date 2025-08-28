from flask import Flask, request, jsonify

app = Flask(__name__)

@app.get("/health")
def health():
    return jsonify(status="ok")

@app.post("/submit")
def submit():
    data = request.get_json(silent=True) or {}
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    # Example "processing" logic: validate and echo back with a summary
    errors = []
    if not name: errors.append("Missing name")
    if not email: errors.append("Missing email")
    if not message: errors.append("Missing message")

    if errors:
        return jsonify(error="; ".join(errors)), 400

    summary = f"Received message from {name} <{email}>: {message}"
    return jsonify(ok=True, summary=summary, received=data), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
