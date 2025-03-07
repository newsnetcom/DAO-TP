// Sample past trade data
const tradeData = {
    "2W-3L": 9, "3W-2L": 8, "1W-3L": 8, "1W-4L": 5,
    "3W-1L": 4, "2W-2L": 4, "1W-1L": 4, "0W-4L": 3,
    "1W-0L": 3, "4W-1L": 3, "2W-1L": 3, "2W-0L": 2,
    "1W-2L": 2, "0W-1L": 2, "4W-0L": 1, "0W-5L": 1,
    "0W-3L": 1, "5W-0L": 0
};

function calculateProbability() {
    const wins = document.getElementById("wins").value;
    const losses = document.getElementById("losses").value;
    const key = wins + "W-" + losses + "L";
    
    if (tradeData[key] !== undefined) {
        const probability = ((tradeData[key] / 50) * 100).toFixed(2); // Example calculation
        document.getElementById("result").innerText = `Probability: ${probability}%`;
    } else {
        document.getElementById("result").innerText = "Data not available for this pattern.";
    }
}