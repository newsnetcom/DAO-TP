// Sample past trade data (Win-Loss Patterns & Frequency of Occurrence)
const tradeData = {
    "2W-3L": 9, "3W-2L": 8, "1W-3L": 8, "1W-4L": 5,
    "3W-1L": 4, "2W-2L": 4, "1W-1L": 4, "0W-4L": 3,
    "1W-0L": 3, "4W-1L": 3, "2W-1L": 3, "2W-0L": 2,
    "1W-2L": 2, "0W-1L": 2, "4W-0L": 1, "0W-5L": 1,
    "0W-3L": 1, "5W-0L": 0
};

let probabilityChart; // Global variable for Chart.js instance

// Function to analyze past data and predict next trade outcome
function predictNextTrade() {
    const wins = parseInt(document.getElementById("wins").value);
    const losses = parseInt(document.getElementById("losses").value);
    const key = wins + "W-" + losses + "L";

    if (!tradeData[key]) {
        document.getElementById("result").innerText = "No historical data available for this pattern.";
        return;
    }

    const totalWeeks = Object.values(tradeData).reduce((sum, freq) => sum + freq, 0);
    const patternWeeks = tradeData[key];

    // Calculate separate probabilities based on historical trends
    const winWeeks = Object.entries(tradeData)
        .filter(([pattern]) => pattern.startsWith((wins + 1) + "W"))
        .reduce((sum, [, freq]) => sum + freq, 0);

    const lossWeeks = Object.entries(tradeData)
        .filter(([pattern]) => pattern.startsWith(wins + "W") && pattern.endsWith((losses + 1) + "L"))
        .reduce((sum, [, freq]) => sum + freq, 0);

    const winProbability = ((winWeeks / totalWeeks) * 100).toFixed(2);
    const lossProbability = ((lossWeeks / totalWeeks) * 100).toFixed(2);

    // Weighted random decision based on probabilities
    const randomPick = Math.random() * 100;
    const predictedOutcome = randomPick < winProbability ? "Win" : "Loss";

    document.getElementById("result").innerText = `Predicted Outcome: ${predictedOutcome}
        (Win Probability: ${winProbability}%, Loss Probability: ${lossProbability}%)`;

    // Update probability chart
    updateChart(winProbability, lossProbability);
}

// Function to update or create the probability chart
function updateChart(winProb, lossProb) {
    const ctx = document.getElementById("probabilityChart").getContext("2d");

    if (probabilityChart) {
        probabilityChart.destroy(); // Destroy previous chart instance
    }

    probabilityChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Win Probability", "Loss Probability"],
            datasets: [{
                data: [winProb, lossProb],
                backgroundColor: ["#28a745", "#dc3545"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}