const data = { cardapio_semanal: {} };

function showNextDayMenu(currentDay, nextDay) {
    const currentDayForm = document.getElementById(currentDay);
    const nextDayForm = document.getElementById(nextDay);

    if (currentDayForm && nextDayForm) {
        currentDayForm.style.display = 'none';
        nextDayForm.style.display = 'block';
    }
}

function addOptionField(containerId) {
    const container = document.getElementById(containerId);
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = containerId;
    newInput.className = 'option-field';
    container.insertBefore(newInput, container.lastChild);
}

function submit() {

    axios.post('/api/create.php', `data=${JSON.stringify(data)}`)
        .then((response) => {
            alert("Cadastrado com sucesso")
        })
        .catch((response) => {
            alert("Erro")
        });
}

function saveDatas(id) {
    const form = document.getElementById(id);
    const week = id.substring(id.indexOf("_") + 1, id.length);

    const d = {
        "prato_principal": "",
        "ovolactovegetariana": "",
        "acompanhamentos": [],
        "guarnicao": [],
        "sobremesa": [],
        "suco": []
    };

    for (const div of form.getElementsByClassName('option-container')) {
        for (const input of div.getElementsByTagName('input')) {
            const nameField = input.name.substring(0, input.name.indexOf("_")).replace('-', '_');
            if (["prato_principal", "ovolactovegetariana"].includes(nameField))
                d[nameField] = input.value;
            else
                d[nameField].push(input.value);
        }
    }

    data.cardapio_semanal[week] = d;

    if (week === "sexta-feira")
        submit();
}

const days = [
    "Segunda-Feira",
    "Terca-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira"
]

function createDayForm(i = 0) {
    if (i === days.length)
        return;
    else
        createDayForm(i + 1)


    const day = days[i];
    const form = document.createElement('form');
    form.action = 'process_form.php';
    form.method = 'post';
    form.id = 'form_' + day.toLowerCase();
    form.className = 'day-menu';

    const h3 = document.createElement('h3');
    h3.textContent = 'Cardápio de ' + day + ':';
    form.appendChild(h3);

    const fields = [
        'Prato Principal', 'Ovolactovegetariana', 'Acompanhamentos',
        'Guarnicao', 'Sobremesa', 'Suco'
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.for = field.toLowerCase().replace(' ', '-') + '_' + day.toLowerCase();
        label.textContent = field + ':';
        form.appendChild(label);

        const optionContainer = document.createElement('div');
        optionContainer.className = 'option-container';
        optionContainer.id = field.toLowerCase().replace(' ', '-') + '_' + day.toLowerCase() + '_container';

        const input = document.createElement('input');
        input.type = 'text';
        input.name = field.toLowerCase().replace(' ', '-') + '_' + day.toLowerCase();
        input.className = 'option-field';

        optionContainer.appendChild(input);

        const addButtonContainer = document.createElement('div');
        addButtonContainer.className = 'add-option-button-container';
        addButtonContainer.id = field.toLowerCase() + '_' + day.toLowerCase() + '_container_add_button';

        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.className = 'add-option-button';
        addButton.textContent = '+';
        addButton.onclick = function () {
            addOptionField(field.toLowerCase().replace(' ', '-') + '_' + day.toLowerCase() + '_container');
        };

        addButtonContainer.appendChild(addButton);
        optionContainer.appendChild(addButtonContainer);

        form.appendChild(optionContainer);
    });

    const br = document.createElement('br');
    form.appendChild(br);

    const submitButton = document.createElement('input');
    submitButton.type = 'button';

    if (form.id !== "form_sexta-feira") {
        submitButton.value = 'Próximo';
        submitButton.setAttribute('onclick', "saveDatas('" + form.id + "'); showNextDayMenu('" + form.id + "','form_" + days[i + 1].toLowerCase() + "')");
    } else {
        submitButton.value = 'Enviar';
        submitButton.setAttribute('onclick', "saveDatas('" + form.id + "')");
    }

    form.appendChild(submitButton);

    document.getElementById('forms').appendChild(form);
}