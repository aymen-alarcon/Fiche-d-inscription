let selectedRow = null;

document.addEventListener("DOMContentLoaded", () => {
    disableButtons(true);
});

function jdid() {
    let inputs = document.querySelectorAll('.input');
    document.getElementById('branche').value = "choose a branche";
    document.querySelectorAll('input[name="sexe"]').forEach(radio => radio.checked = false);

    inputs.forEach(input => input.value = '');
    inputs[0].focus();
    disableButtons(true);
    countBranches();
}

function vider() {
    document.getElementById("table").getElementsByTagName('tbody')[0].innerHTML = "";
    disableButtons(true);
    countBranches();
}

function addEntry() {
    if (verif()) return;
    let table = document.getElementById("table").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();

    newRow.onclick = function () { addnew(this); };

    let num = document.getElementById('num').value;
    let name = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    let branche = document.getElementById('branche').value;
    let sexe = document.querySelector('input[name="sexe"]:checked');

    if (!num || !name || !prenom || branche === "choose a branche" || !sexe) {
        alert("Please fill all the fields!");
        return;
    }

    newRow.insertCell(0).innerText = num;
    newRow.insertCell(1).innerText = name;
    newRow.insertCell(2).innerText = prenom;
    newRow.insertCell(3).innerText = sexe.value;
    newRow.insertCell(4).innerText = branche;

    jdid();
    countBranches();
}

function addnew(row) {
    if (selectedRow) selectedRow.classList.remove("selected");

    selectedRow = row;
    row.classList.add("selected");

    document.getElementById("num").value = row.cells[0].innerText;
    document.getElementById("nom").value = row.cells[1].innerText;
    document.getElementById("prenom").value = row.cells[2].innerText;
    document.getElementById("branche").value = row.cells[4].innerText;

    let sexe = row.cells[3].innerText;
    document.querySelector(`input[name="sexe"][value="${sexe}"]`).checked = true;

    disableButtons(false);
    countBranches();
}

function update() {
    if (!selectedRow) {
        alert("Veuillez sélectionner une ligne pour la modifier");
        return;
    }

    selectedRow.cells[0].innerText = document.getElementById("num").value;
    selectedRow.cells[1].innerText = document.getElementById("nom").value;
    selectedRow.cells[2].innerText = document.getElementById("prenom").value;
    selectedRow.cells[4].innerText = document.getElementById("branche").value;
    let sexe = document.querySelector('input[name="sexe"]:checked');
    if (sexe) selectedRow.cells[3].innerText = sexe.value;
    
    selectedRow.classList.remove("selected");
    selectedRow = null;
    
    jdid();
    countBranches();
}

function deleteEntry() {
    if (!selectedRow) {
        alert("Veuillez sélectionner une ligne pour la supprimer");
        return;
    }

    selectedRow.remove();
    selectedRow = null;
    jdid();
    countBranches();
}

function disableButtons(disabled) {
    document.getElementById("modifier").disabled = disabled;
    document.getElementById("supprimer").disabled = disabled;
    document.getElementById("ajouter").disabled = !disabled;
}

function suivant() {
    let rows = document.querySelector("#table tbody").rows;
    
    if (!rows.length) return;

    if (!selectedRow) {
        addnew(rows[0]);
    } else {
        for (let i = 0; i < rows.length - 1; i++) {
            if (rows[i] === selectedRow) {
                addnew(rows[i + 1]);
                break;
            }
        }
    }
}

function precedent() {
    let rows = document.querySelector("#table tbody").rows;

    if(!rows.length) return;

    if (!selectedRow) {
        addnew(rows[0]);
    }else{
        for (let i = rows.length - 1; i > 0; i--) {
            if (rows[i] === selectedRow) {
                addnew(rows[i - 1]);
                break;
            }
        }
    }
}

function premier() {
    let rows = document.querySelector("#table tbody").rows;

    addnew(rows[0]);
}

function dernier() {
    let rows = document.querySelector("#table tbody").rows;

    addnew(rows[rows.length - 1]);
}

function verif() {
    let num = document.getElementById('num').value.trim();
    let rows = document.querySelector("#table tbody").rows;
    for (let row of rows) {
        let cellValue = row.cells[0].textContent.trim();
        if (cellValue === num) {
            alert("This number is already in the table");
            return true;
        }
    }
    return false;
}

function countBranches() {
    let rows = document.querySelector("#table tbody").rows;
    let branchCount = {};

    for (let row of rows) {
        let branch = row.cells[4].textContent.trim();
        if (branchCount[branch]) {
            branchCount[branch]++;
        } else {
            branchCount[branch] = 1;
        }
    }

    let display = document.getElementById("branchCountDisplay");
    if (display) {
        display.innerHTML = "";
        for (let branch in branchCount) {
            display.innerHTML += `<p>${branch}: ${branchCount[branch]}</p>`;
        }
    }
}
