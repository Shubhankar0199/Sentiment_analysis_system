from flask import Flask, render_template, request, jsonify
from utils.predictor import predict_sentiment

app = Flask(__name__)


# ==========================
# Home Route
# ==========================
@app.route("/")
def home():
    return render_template("index.html")


# ==========================
# Prediction Route
# ==========================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from frontend
        data = request.get_json()

        # Check if data exists
        if data is None:
            return jsonify({
                "prediction": "Error",
                "confidence": 0,
                "message": "No data received."
            }), 400

        # Get user text
        text = data.get("text", "").strip()

        # Empty input
        if text == "":
            return jsonify({
                "prediction": "Neutral",
                "confidence": 0,
                "message": "Please enter some text."
            })

        # Predict using ML model
        result = predict_sentiment(text)

        return jsonify({
            "prediction": result["prediction"],
            "confidence": result["confidence"]
        })

    except Exception as e:
        return jsonify({
            "prediction": "Error",
            "confidence": 0,
            "message": str(e)
        }), 500


# ==========================
# Run Flask App
# ==========================
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5002,
        debug=True
    )