document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("sorting-hat-btn");
    const modal = document.getElementById("quiz-modal");
    const questionText = document.getElementById("quiz-text");
    const questionTitle = document.getElementById("quiz-question");

    const optionsContainer = document.querySelector(".quiz-options");
    const cards = document.querySelectorAll(".house-card");

    //DE VRAGEN
    const questions = [
        {
            text: "Er breekt een trol los in de kerkers! Wat doe je?",
            answers: {
                gryffindor: "Ik ren erheen om hem te verslaan!",
                slytherin: "Ik sluit de deur zodat ik veilig ben.",
                ravenclaw: "Ik zoek snel zijn zwakke plek op in een boek.",
                hufflepuff: "Ik zorg dat alle eerstejaars veilig zijn."
            }
        },
        {
            text: "Welk toverdrankje zou je het liefst brouwen?",
            answers: {
                gryffindor: "Een drankje dat je onoverwinnelijk maakt.",
                slytherin: "Felix Fortunatis (Geluksdrank) voor succes.",
                ravenclaw: "Een drankje om gedachten te lezen.",
                hufflepuff: "Een genezend drankje voor zieke planten."
            }
        },
        {
            text: "Als je nog maar één spreuk mocht gebruiken, welke zou het zijn?",
            answers: {
                gryffindor: "Expelliarmus (Ontwapenen)",
                slytherin: "Avada Kedavra (Voor mijn vijanden...)",
                ravenclaw: "Accio (Zodat ik nooit hoef te zoeken)",
                hufflepuff: "Lumos (Om licht in de duisternis te brengen)"
            }
        },
        {
            text: "Hoe wil je herinnerd worden?",
            answers: {
                gryffindor: "Als een grote held.",
                slytherin: "Als de machtigste tovenaar ooit.",
                ravenclaw: "Als de slimste uitvinder.",
                hufflepuff: "Als een goede en trouwe vriend."
            }
        }
    ];

    let currentQuestionIndex = 0;
    let scores = { gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 };

    // Start Quiz
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            modal.style.display = "flex";
            startBtn.innerText = "De hoed denkt na...";
            currentQuestionIndex = 0;
            scores = { gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 };
            loadQuestion();
        });
    }

    function loadQuestion() {
        const q = questions[currentQuestionIndex];
        questionTitle.innerText = `Vraag ${currentQuestionIndex + 1} van ${questions.length}`;
        questionText.innerText = q.text;
        optionsContainer.innerHTML = "";

        for (const [house, answerText] of Object.entries(q.answers)) {
            const btn = document.createElement("button");
            btn.classList.add("quiz-btn");
            btn.innerText = answerText;
            btn.setAttribute("data-house", house);

            btn.addEventListener("click", () => {
                scores[house]++;
                nextQuestion();
            });

            optionsContainer.appendChild(btn);
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            modal.style.display = "none";
            finishQuiz();
        }
    }

    function finishQuiz() {
        let winner = "gryffindor";
        let highestScore = 0;

        for (const [house, score] of Object.entries(scores)) {
            if (score > highestScore) {
                highestScore = score;
                winner = house;
            } else if (score === highestScore) {
                if (Math.random() > 0.5) winner = house;
            }
        }

        document.querySelector(".houses-grid").scrollIntoView({ behavior: "smooth", block: "center" });

        // Animatie
        let shuffleCount = 0;
        const maxShuffles = 15;
        const interval = setInterval(() => {
            cards.forEach(c => c.style.opacity = "0.3");
            const randomCard = cards[Math.floor(Math.random() * cards.length)];
            randomCard.style.opacity = "1";

            shuffleCount++;

            if (shuffleCount >= maxShuffles) {
                clearInterval(interval);
                revealWinner(winner);
            }
        }, 150);
    }

    function revealWinner(houseName) {
        cards.forEach(card => {
            card.style.opacity = "";
            card.classList.remove("house-selected", "house-dimmed");

            if (card.classList.contains(houseName)) {
                card.classList.add("house-selected");
                const niceName = houseName.charAt(0).toUpperCase() + houseName.slice(1);
                startBtn.innerText = `Je hoort bij ${niceName}!`;
            } else {
                card.classList.add("house-dimmed");
            }
        });
    }
});