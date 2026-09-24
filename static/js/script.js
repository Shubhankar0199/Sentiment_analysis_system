// ==========================================
// SENTIMENT ANALYSIS FRONTEND
// ==========================================


// Your Render backend URL
const API_URL =
    "https://sentiment-analysis-system-ixoa.onrender.com";


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const textInput =
    document.getElementById("textInput");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const loading =
    document.getElementById("loading");

const result =
    document.getElementById("result");

const prediction =
    document.getElementById("prediction");

const confidence =
    document.getElementById("confidence");

const confidenceFill =
    document.getElementById("confidenceFill");

const error =
    document.getElementById("error");

const charCount =
    document.getElementById("charCount");


// ==========================================
// CHARACTER COUNTER
// ==========================================

textInput.addEventListener("input", function () {

    const length = textInput.value.length;

    charCount.textContent =
        `${length} / 500`;

});


// ==========================================
// BUTTON CLICK
// ==========================================

analyzeBtn.addEventListener(
    "click",
    analyzeSentiment
);


// ==========================================
// ANALYZE SENTIMENT
// ==========================================

async function analyzeSentiment() {

    const text =
        textInput.value.trim();


    // -----------------------------
    // Check empty input
    // -----------------------------

    if (!text) {

        showError(
            "Please enter some text before analyzing."
        );

        return;
    }


    // -----------------------------
    // Reset previous results
    // -----------------------------

    hideError();

    result.classList.add("hidden");

    confidenceFill.style.width = "0%";


    // -----------------------------
    // Show loading
    // -----------------------------

    loading.classList.remove("hidden");

    analyzeBtn.disabled = true;


    try {

        // ==========================================
        // SEND REQUEST TO RENDER BACKEND
        // ==========================================

        const response = await fetch(
            `${API_URL}/predict`,
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text
                })

            }
        );


        // ==========================================
        // GET JSON RESPONSE
        // ==========================================

        const data =
            await response.json();


        // ==========================================
        // CHECK SERVER ERROR
        // ==========================================

        if (!response.ok) {

            throw new Error(
                data.error ||
                "Server returned an error."
            );

        }


        // ==========================================
        // GET PREDICTION
        // ==========================================

        const predictionText =
            data.prediction;


        // ==========================================
        // GET CONFIDENCE
        // ==========================================

        let confidenceValue =
            Number(data.confidence);


        // If backend returns 0.95
        // convert it to 95

        if (confidenceValue <= 1) {

            confidenceValue =
                confidenceValue * 100;

        }


        // Make sure confidence stays
        // between 0 and 100

        confidenceValue =
            Math.max(
                0,
                Math.min(
                    100,
                    confidenceValue
                )
            );


        // ==========================================
        // DISPLAY RESULT
        // ==========================================

        prediction.textContent =
            predictionText;


        confidence.textContent =
            `${confidenceValue.toFixed(2)}%`;


        // ==========================================
        // UPDATE CONFIDENCE BAR
        // ==========================================

        setTimeout(function () {

            confidenceFill.style.width =
                `${confidenceValue}%`;

        }, 100);


        // ==========================================
        // SHOW RESULT CARD
        // ==========================================

        result.classList.remove("hidden");


    } catch (err) {

        console.error(
            "Sentiment API Error:",
            err
        );


        showError(
            "Unable to connect to the sentiment analysis server. Please try again."
        );

    } finally {

        // ==========================================
        // STOP LOADING
        // ==========================================

        loading.classList.add("hidden");

        analyzeBtn.disabled = false;

    }

}


// ==========================================
// SHOW ERROR
// ==========================================

function showError(message) {

    error.textContent =
        message;

    error.classList.remove("hidden");

}


// ==========================================
// HIDE ERROR
// ==========================================

function hideError() {

    error.classList.add("hidden");

}
