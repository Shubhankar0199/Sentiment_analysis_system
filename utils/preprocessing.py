import re
import nltk

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Download required resources (only runs the first time)
nltk.download("stopwords", quiet=True)
nltk.download("wordnet", quiet=True)

# Initialize lemmatizer
lemmatizer = WordNetLemmatizer()

# Stopwords
stop_words = set(stopwords.words("english"))

# Keep important negation words
stop_words.discard("not")
stop_words.discard("no")
stop_words.discard("nor")


def clean_text(text):
    text = str(text).lower()

    # Remove URLs
    text = re.sub(r"http\S+|www\S+", "", text)

    # Remove mentions
    text = re.sub(r"@\w+", "", text)

    # Remove hashtags (#happy -> happy)
    text = re.sub(r"#", "", text)

    # Normalize repeated letters
    text = re.sub(r"(.)\1{2,}", r"\1\1", text)

    # Remove numbers
    text = re.sub(r"\d+", "", text)

    # Remove punctuation
    text = re.sub(r"[^a-zA-Z\s]", "", text)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()

    return text


def remove_stopwords(text):
    words = text.split()
    words = [word for word in words if word not in stop_words]
    return " ".join(words)


def lemmatize_text(text):
    words = text.split()
    words = [lemmatizer.lemmatize(word, pos="v") for word in words]
    return " ".join(words)


def preprocess_text(text):
    text = clean_text(text)
    text = remove_stopwords(text)
    text = lemmatize_text(text)
    return text