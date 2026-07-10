console.log("script.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM Loaded");

    // ==========================
    // Get Elements
    // ==========================

    const textarea = document.getElementById("sentence");
    const analyzeBtn = document.getElementById("analyze");
    const verdict = document.getElementById("verdict");
    const scoreLine = document.getElementById("score-line");
    const needle = document.getElementById("needle-group");

    // ==========================
    // Rotate Needle
    // ==========================

   function rotateNeedle(prediction) {

        let angle = 0;

        if (prediction === "Positive") {
            angle = 70;
        }
        else if (prediction === "Negative") {
            angle = -70;
        }
        else {
            angle = 0;
        }

        // Rotate SVG needle
        needle.setAttribute(
            "transform",
            `rotate(${angle} 180 172)`
        );
    }

    // ==========================
    // Analyze Function
    // ==========================

    async function analyzeSentiment() {

        const text = textarea.value.trim();

        if (text === "") {
            alert("Please enter a sentence.");
            return;
        }

        try {

            analyzeBtn.disabled = true;
            analyzeBtn.innerHTML = "Analyzing...";

            const response = await fetch("/predict", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text
                })

            });

            if (!response.ok) {
                throw new Error("Server Error");
            }

            const data = await response.json();

            console.log(data);

            // ==========================
            // Update Prediction
            // ==========================

            verdict.innerHTML = data.prediction;

            verdict.className = "verdict-word";

            if (data.prediction === "Positive") {

                verdict.classList.add("positive");

            }
            else if (data.prediction === "Negative") {

                verdict.classList.add("negative");

            }
            else {

                verdict.classList.add("neutral");

            }

            // ==========================
            // Update Confidence
            // ==========================

            scoreLine.innerHTML =
                `Confidence : <b>${(data.confidence * 100).toFixed(2)}%</b>`;

            // ==========================
            // Rotate Needle
            // ==========================

            rotateNeedle(data.prediction);

        }

        catch (error) {

            console.error(error);

            alert("Something went wrong while contacting the server.");

        }

        finally {

            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = "Analyze";

        }

    }

    // ==========================
    // Button Click
    // ==========================

    analyzeBtn.addEventListener("click", analyzeSentiment);

    // ==========================
    // Enter Key
    // ==========================

    textarea.addEventListener("keydown", function (e) {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            analyzeSentiment();

        }

    });

});
