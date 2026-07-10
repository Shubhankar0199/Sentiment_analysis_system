import os
import joblib
import numpy as np

from utils.preprocessing import preprocess_text

# Project root directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load trained model
model = joblib.load(
    os.path.join(BASE_DIR, "model", "sentiment_model.pkl")
)

# Load TF-IDF vectorizer
vectorizer = joblib.load(
    os.path.join(BASE_DIR, "model", "tfidf_vectorizer.pkl")
)


def predict_sentiment(text):
    """
    Predict sentiment of a user input.

    Returns:
        prediction : Positive / Negative
        confidence : float (0-1)
    """

    # Preprocess the text
    processed_text = preprocess_text(text)

    # Convert into TF-IDF vector
    vector = vectorizer.transform([processed_text])

    # Predict sentiment
    prediction = model.predict(vector)[0]

    # Confidence score
    if hasattr(model, "predict_proba"):
        confidence = np.max(model.predict_proba(vector))
    else:
        confidence = 1.0

    # Convert numeric label to text
    if prediction == 1:
        sentiment = "Positive"
    else:
        sentiment = "Negative"

    return {
        "prediction": sentiment,
        "confidence": round(float(confidence), 4)
    }