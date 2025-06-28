let words = [];
let currentWord = [];
let gameOn = false
fetch('german_nouns_4000.txt')
  .then(response => response.text())
  .then(text => {
    words = text.split('\n').filter(line => line.trim() !== '');
  })
  .catch(err => console.error('Error loading words:', err));

function startGame() {
  if (words.length === 0) {
    document.getElementById("wordDisplay").innerText = "Error loading word.";
    return;
  }
  gameOn = true;
  loadNewWord();
  document.getElementById("startButton").style.display = "none";
  document.getElementById("startLabel").style.display = "none";
  streak = 0;
  document.getElementById("streak").innerText = "Streak: 0";
}

function loadNewWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomIndex];
  currentWord = randomWord.split(' ');
  document.getElementById("wordDisplay").innerText = currentWord[1];

  // Reset radio selection for next round
  document.querySelectorAll('input[name="article"]').forEach(button => button.checked = false); 
}

function checkAnswer() {
  const selected = document.querySelector('input[name="article"]:checked');
  if (gameOn === false) {
    return;
  }

  const userInput = selected.value;
  const correctArticle = currentWord[0];

  if (correctArticle.toLowerCase().includes(userInput.toLowerCase())) {
    streak++;
    document.getElementById("streak").innerText = `Streak: ${streak}`;
    loadNewWord();
  } else {
    document.getElementById("wordDisplay").innerText =
      `Incorrect! The correct article was: ${currentWord[0]}`;
    gameOn = false;
    streak = 0;
    document.getElementById("tryAgain").style.display = "block";
    document.getElementById("tryAgain").onclick= function() {
      document.getElementById("tryAgain").style.display = "none";
      loadNewWord();
      document.getElementById("streak").innerText = `Streak: ${streak}`;
      gameOn = true;
    };
  }
}