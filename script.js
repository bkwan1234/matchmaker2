// Constants for validation and scoring
const VALID_RESPONSES = ["yes", "no"];
const MAX_SCORE = 100;
const QUESTION_COUNT = 5;

// Function to validate input
function validate(input) {
    return VALID_RESPONSES.includes(input.toLowerCase());
}

// Function to calculate score
function calculateScore(answers) {
    let score = 0;
    // Example scoring logic: 20 points for each 'yes'
    answers.forEach(answer => {
        if (answer.toLowerCase() === "yes") {
            score += 20;
        }
    });
    return score;
}

// Function to handle form submission
document.getElementById('quiz-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let answers = [];
    let error = false;
    let errorMessage = '';

    // Collect answers and validate each input
    for (let i = 1; i <= QUESTION_COUNT; i++) {
        let input = document.getElementById('q' + i).value;
        if (!validate(input)) {
            error = true;
            errorMessage = `Invalid answer for question ${i}. Please answer with 'yes' or 'no'.`;
            break;
        }
        answers.push(input);
    }

    if (error) {
        document.getElementById('result').innerHTML = `<p id="error">${errorMessage}</p>`;
    } else {
        let score = calculateScore(answers);
        let percentage = (score / MAX_SCORE) * 100;

        // Display individual and overall scores
        let resultHTML = `<p>Your total compatibility score is: ${percentage}%</p>`;
        answers.forEach((answer, index) => {
            resultHTML += `<p>Question ${index + 1} score: ${answer.toLowerCase() === "yes" ? '20' : '0'} points</p>`;
        });

        // Add a closing remark based on threshold
        if (percentage >= 80) {
            resultHTML += `<p>Remark: Great match!</p>`;
        } else if (percentage >= 50) {
            resultHTML += `<p>Remark: Decent compatibility!</p>`;
        } else {
            resultHTML += `<p>Remark: Not very compatible!</p>`;
        }

        document.getElementById('result').innerHTML = resultHTML;
    }
});
