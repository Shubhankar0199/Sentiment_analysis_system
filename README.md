Sentiment Analysis System

A Machine Learning-based Sentiment Analysis web application built using Python, Flask, and Scikit-learn. This project predicts whether a given text expresses a Positive, Negative, or Neutral sentiment through an interactive web interface.

⸻

📌 Features

* Predicts sentiment from user-entered text.
* Clean and responsive web interface.
* Pre-trained Machine Learning model for fast predictions.
* Real-time sentiment analysis.
* Confidence score visualization.
* Easy to run locally using Flask.

⸻

🛠️ Tech Stack

Frontend

* HTML5
* CSS3
* JavaScript

Backend

* Python
* Flask

Machine Learning

* Scikit-learn
* Pandas
* NumPy
* Joblib/Pickle (Model Serialization)

⸻

📂 Project Structure

Sentiment_Analysis_System/
│
├── app.py                  # Flask application
├── requirements.txt        # Project dependencies
├── README.md               # Project documentation
│
├── model/                  # Trained ML model files
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
├── templates/
│   └── index.html
│
├── utils/                  # Helper functions
│
└── .gitignore

⸻

🚀 Installation

1. Clone the repository

git clone https://github.com/Shubhankar0199/Sentiment_analysis_system.git

2. Navigate to the project folder

cd Sentiment_analysis_system

3. Create a virtual environment

Windows

python -m venv venv
venv\Scripts\activate

macOS/Linux

python3 -m venv venv
source venv/bin/activate

4. Install dependencies

pip install -r requirements.txt

5. Run the Flask application

python app.py

or

python3 app.py

Open your browser and visit:

http://127.0.0.1:5000

⸻

📊 How It Works

1. User enters a text or review.
2. The text is preprocessed.
3. The trained Machine Learning model predicts the sentiment.
4. The application displays:
    * Predicted Sentiment
    * Confidence Score

⸻

💡 Example

Input

The product quality is amazing and I loved using it.

Output

Sentiment: Positive 😊

⸻

📦 Dependencies

* Flask
* NumPy
* Pandas
* Scikit-learn
* Joblib

Install all dependencies using:

pip install -r requirements.txt

⸻

📸 Screenshots

Add screenshots of your application here.

Example:

screenshots/
│
├── home.png
├── prediction.png

⸻

👨‍💻 Author

Shubhankar Singh

GitHub: https://github.com/Shubhankar0199

⸻

⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

⸻

📄 License

This project is intended for educational and learning purposes.
