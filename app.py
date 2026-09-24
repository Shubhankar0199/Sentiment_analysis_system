from flask import Flask, request, jsonify
from flask_cors import CORS

from utils.predictor import predict_sentiment


app = Flask(__name__)

# Allow requests from frontend
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "success",
        "message": "Sentiment Analysis API is running"
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    })


@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No JSON data received"
            }), 400

        text = data.get("text", "").strip()

        if not text:
            return jsonify({
                "error": "Please enter some text"
            }), 400

        result = predict_sentiment(text)

        return jsonify({
            "prediction": result["prediction"],
            "confidence": result["confidence"]
        }), 200

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5002,
        debug=True
    )