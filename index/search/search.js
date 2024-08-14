const urlBrands = 'https://parallelum.com.br/fipe/api/v1/carros/marcas/';
const urlModels = '/modelos';

// Requisição para obter as marcas
fetch(urlBrands)
    .then(response => {
        if(!response.ok) {
            throw new Error(`ERRO: retorno ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const option = document.getElementById('model');

        console.log(data);

        for(let createOptions of data) {
            console.log(createOptions);

            let newOption = document.createElement("option");
            newOption.text = createOptions.nome;
            newOption.value = createOptions.codigo;
            option.appendChild(newOption);
        }

        option.addEventListener("change", update);
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });

// Função para atualizar a lista de modelos
function update() {
    const brands = document.getElementById('model');
    const results = document.getElementById('results');
    const items = results.querySelectorAll('li');

    // Remove os itens da lista de resultados
    items.forEach(item => results.removeChild(item));

    var id = brands.options[brands.selectedIndex].value;

    // Requisição para obter os modelos da marca selecionada
    fetch(urlBrands + id + urlModels)
        .then(response => {
            if(!response.ok) {
                throw new Error(`ERRO: retorno ${response.status}`);
            }
            return response.json();
        })
        .then(models => {
            const totalModels = document.getElementById('results');
            console.log(models);

            for(var model of models.modelos) {
                let list = document.createElement("li");
                list.dataset.value = model["codigo"]; // Usando dataset para armazenar o código
                list.innerHTML = model["nome"];
                totalModels.appendChild(list);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}
