
// Sample past trade data (Weekly Patterns & Frequency of Occurrence)
const tradeData = {
    "2W-3L": 9, "3W-2L": 8, "1W-3L": 8, "1W-4L": 5,
    "3W-1L": 4, "2W-2L": 4, "1W-1L": 4, "0W-4L": 3,
    "1W-0L": 3, "4W-1L": 3, "2W-1L": 3, "2W-0L": 2,
    "1W-2L": 2, "0W-1L": 2, "4W-0L": 1, "0W-5L": 1,
    "0W-3L": 1, "5W-0L": 0
};

// Function to analyze past data based on entered daily trades
function predictNextTrade() {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    let winCount = 0, lossCount = 0, tradedDays = 0;

    days.forEach(day => {
        const value = document.getElementById(day).value.trim().toUpperCase();
        if (value === "W") winCount++;
        else if (value === "L") lossCount++;
        if (value) tradedDays++;
    });

    if (tradedDays === 0) {
        document.getElementById("result").innerText = "Please enter at least one day's result.";
        return;
    }

    const key = winCount + "W-" + lossCount + "L";
    const totalWeeks = Object.values(tradeData).reduce((sum, freq) => sum + freq, 0);

    // Calculate probabilities based on historical data
    const winWeeks = Object.entries(tradeData)
        .filter(([pattern]) => pattern.startsWith((winCount + 1) + "W"))
        .reduce((sum, [, freq]) => sum + freq, 0);

    const lossWeeks = Object.entries(tradeData)
        .filter(([pattern]) => pattern.startsWith(winCount + "W") && pattern.endsWith((lossCount + 1) + "L"))
        .reduce((sum, [, freq]) => sum + freq, 0);

    const breakevenWeeks = Object.entries(tradeData)
        .filter(([pattern]) => pattern.startsWith(winCount + "W") && pattern.endsWith(lossCount + "L"))
        .reduce((sum, [, freq]) => sum + freq, 0);

    const winProbability = ((winWeeks / totalWeeks) * 100).toFixed(2);
    const lossProbability = ((lossWeeks / totalWeeks) * 100).toFixed(2);
    const breakevenProbability = ((breakevenWeeks / totalWeeks) * 100).toFixed(2);

    // Weighted random decision based on probabilities
    const randomPick = Math.random() * 100;
    let predictedOutcome = "Breakeven";
    if (randomPick < winProbability) predictedOutcome = "Win";
    else if (randomPick < winProbability + lossProbability) predictedOutcome = "Loss";

    // Display results
    document.getElementById("result").innerText = `Predicted Outcome: ${predictedOutcome}
    (Win: ${winProbability}%, Loss: ${lossProbability}%, Breakeven: ${breakevenProbability}%)`;
}
