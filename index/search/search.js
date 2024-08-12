document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const model = document.getElementById('model').value;

    const apiUrl = `https://sua-api.com/api/modelos?nome=${encodeURIComponent(model)}`;

    // Faz a requisição GET à API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição');
            }
            return response.json();
        })
        .then(data => {
            // Processa os dados retornados da API
            displayResults(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});

// Função para exibir os resultados
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpa resultados anteriores

    if (data.length === 0) {
        resultsDiv.textContent = 'Nenhum modelo encontrado.';
        return;
    }

    // Cria uma lista com os resultados
    const ul = document.createElement('ul');

    data.forEach(modelo => {
        const li = document.createElement('li');
        li.textContent = `Modelo: ${modelo.nome}, Preço: ${modelo.preco}`;
        ul.appendChild(li);
    });

    resultsDiv.appendChild(ul);
}
