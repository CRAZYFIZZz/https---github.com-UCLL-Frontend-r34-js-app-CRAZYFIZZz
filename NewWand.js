document.addEventListener("DOMContentLoaded", () => {
    /* DOMContentLoaded bron: "https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event" */

    const newWandBtn = document.getElementById("new-wand-btn");
    const stickForm = document.getElementById("stick-form");
    const wandItems = document.getElementById("wand-items");
    const cancelBtn = document.getElementById("cancel-btn");

    const slytherinWands = [
        { name: "Salazar Slytherin's Wand", core: "Basilisk-hoorn", length: 33.02, owner: "Salazar Slytherin" },
        { name: "Tom Riddle's Wand", core: "Drakenhartsnaar", length: 34.29, owner: "Tom Riddle / Voldemort" },
        { name: "Draco Malfoy's Wand", core: "Eenhoornhaar", length: 25.4, owner: "Draco Malfoy" },
        { name: "Regulus Black's Wand", core: "Eenhoornhaar", length: 31.75, owner: "Regulus Black" },
        { name: "Lucius Malfoy's Wand", core: "Drakenhartsnaar", length: 45.72, owner: "Lucius Malfoy" },
        { name: "Severus Snape's Wand", core: "Fenixveer", length: 33.02, owner: "Severus Snape" },
    ];

    const gryffindorWands = [
        { name: "The Sword of Gryffindor", core: "Griffioenveer", length: 45.72, owner: "Godric Gryffindor" },
        { name: "Harry Potter's Wand", core: "Fenixveer", length: 27.94, owner: "Harry Potter" },
        { name: "Hermione Granger's Wand", core: "Drakenhartsnaar", length: 27.31, owner: "Hermione Granger" },
        { name: "Ron Weasley's Wand", core: "Eenhoornhaar", length: 35.56, owner: "Ron Weasley" },
        { name: "Albus Dumbledore's Wand", core: "Thestralstaarthaar", length: 38.1, owner: "Albus Perkamentus" },
        { name: "Minerva McGonagall's Wand", core: "Drakenhartsnaar", length: 24.13, owner: "Minerva McGonagall" },
    ];

    const ravenclawWands = [
        { name: "Rowena Ravenclaw's Wand", core: "Veer van een Thunderbird", length: 33.02, owner: "Rowena Ravenclaw" },
        { name: "Luna Lovegood's Wand", core: "Eenhoornhaar", length: 34.29, owner: "Luna Lovegood" },
        { name: "Cho Chang's Wand", core: "Fenixveer", length: 39, owner: "Cho Chang" },
        { name: "Evan Rosier's Wand", core: "Eenhoornhaar", length: 36.83, owner: "Evan Rosier" },
        { name: "Gilderoy Lockhart's Wand", core: "Drakenhartsnaar", length: 44.45, owner: "Gilderoy Lockhart" },
    ];

    const hufflepuffWands = [
        { name: "Helga Hufflepuff's Wand", core: "Onbekend", length: 24.76, owner: "Helga Hufflepuff" },
        { name: "Cedric Diggory's Wand", core: "Eenhoornhaar", length: 31.12, owner: "Cedric Diggory" },
    ];

    const loadWandsFromStorage = () => {
        /* LocalStorage bron: "https://www.w3schools.com/jsref/prop_win_localstorage.asp" */
        const savedWands = JSON.parse(localStorage.getItem('wands')) || [];

        wandItems.innerHTML = '';

        const addGroup = (title, cssClass, list) => {
            const header = document.createElement("h3");
            header.textContent = title;
            header.classList.add(cssClass);
            wandItems.appendChild(header);

            list.forEach(wand => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span><strong>${wand.owner}</strong> <br>
                    <small>${wand.name} | ${wand.core} | ${wand.length} cm</small></span>
                `;
                wandItems.appendChild(li);
            });
        };

        addGroup("Gryffindor Toverstokken", "gryffindor-group", gryffindorWands);
        addGroup("Slytherin Toverstokken", "slytherin-group", slytherinWands);
        addGroup("Ravenclaw Toverstokken", "ravenclaw-group", ravenclawWands);
        addGroup("Hufflepuff Toverstokken", "hufflepuff-group", hufflepuffWands);

        if (savedWands.length > 0) {
            const mineHeader = document.createElement("h3");
            mineHeader.textContent = "Toverstokken door mij aangemaakt";
            mineHeader.style.color = "#fff";
            mineHeader.style.marginTop = "40px";
            wandItems.appendChild(mineHeader);

            savedWands.forEach(wand => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span><strong>${wand.owner}</strong> <br>
                    <small>${wand.name || "Naamloos"} | ${wand.core} | ${wand.length} cm</small></span>
                `;

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Verwijderen";
                deleteBtn.addEventListener("click", () => {
                    removeWand(wand.name);
                });

                li.appendChild(deleteBtn);
                wandItems.appendChild(li);
            });
        }
    };

    const removeWand = (wandName) => {
        let wands = JSON.parse(localStorage.getItem('wands')) || [];
        wands = wands.filter(wand => wand.name !== wandName);
        localStorage.setItem('wands', JSON.stringify(wands));
        loadWandsFromStorage();
    };

    loadWandsFromStorage();

    newWandBtn.addEventListener("click", () => {
        stickForm.style.display = "block";
        newWandBtn.style.display = "none";
        stickForm.scrollIntoView({ behavior: "smooth" });
    });

    cancelBtn.addEventListener("click", () => {
        stickForm.reset();
        stickForm.style.display = "none";
        newWandBtn.style.display = "inline-block";
    });

    stickForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const core = document.getElementById("core").value;
        const length = document.getElementById("length").value;
        const owner = document.getElementById("owner").value;

        const newWand = { name, core, length, owner };

        const wands = JSON.parse(localStorage.getItem('wands')) || [];
        wands.push(newWand);
        localStorage.setItem('wands', JSON.stringify(wands));

        stickForm.reset();
        stickForm.style.display = "none";
        newWandBtn.style.display = "inline-block";
        loadWandsFromStorage();
    });
});