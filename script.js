// Sample past trade data (Win-Loss Patterns & Frequency of Occurrence)
const tradeData = {
    "2W-3L": 9, "3W-2L": 8, "1W-3L": 8, "1W-4L": 5,
    "3W-1L": 4, "2W-2L": 4, "1W-1L": 4, "0W-4L": 3,
    "1W-0L": 3, "4W-1L": 3, "2W-1L": 3, "2W-0L": 2,
    "1W-2L": 2, "0W-1L": 2, "4W-0L": 1, "0W-5L": 1,
    "0W-3L": 1, "5W-0L": 0
};

let probabilityChart; // Global variable for Chart.js instance

// Function to calculate win/loss probabilities and update chart
function calculateProbability() {
    const wins = document.getElementById("wins").value;
    const losses = document.getElementById("losses").value;
    const key = wins + "W-" + losses + "L";
    
    if (tradeData[key] !== undefined) {
        const totalOccurrences = Object.values(tradeData).reduce((a, b) => a + b, 0);
        const patternFrequency = tradeData[key];

        // Calculate probabilities
        const winProbability = ((patternFrequency / totalOccurrences) * 100).toFixed(2);
        const lossProbability = (100 - winProbability).toFixed(2);

        document.getElementById("result").innerText = `Win Probability: ${winProbability}% | Loss Probability: ${lossProbability}%`;

        // Update or create chart
        updateChart(winProbability, lossProbability);
    } else {
        document.getElementById("result").innerText = "Data not available for this pattern.";
    }
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