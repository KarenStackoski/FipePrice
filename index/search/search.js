document.addEventListener('DOMContentLoaded', function() {
    const typeSelect = document.getElementById('type');
    const brandSelect = document.getElementById('brand');
    const modelSelect = document.getElementById('model');
    const resultsDiv = document.getElementById('results');

    // Função para carregar marcas baseado no tipo de veículo selecionado
    typeSelect.addEventListener('change', function() {
        const vehicleType = this.value;
        fetch(`https://fipe.parallelum.com.br/api/v2/${vehicleType}/brands`)
            .then(response => response.json())
            .then(data => {
                brandSelect.innerHTML = '<option value="">Selecione uma marca</option>'; // Reseta o select de marcas
                data.forEach(brand => {
                    const option = document.createElement('option');
                    option.value = brand.id;
                    option.textContent = brand.name;
                    brandSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao buscar marcas:', error));
    });

    // Função para carregar modelos baseado na marca selecionada
    brandSelect.addEventListener('change', function() {
        const vehicleType = typeSelect.value;
        const brandId = this.value;
        if (brandId) {
            fetch(`https://fipe.parallelum.com.br/api/v2/${vehicleType}/brands/${brandId}/models`)
                .then(response => response.json())
                .then(data => {
                    modelSelect.innerHTML = '<option value="">Selecione um modelo</option>'; // Reseta o select de modelos
                    data.models.forEach(model => {
                        const option = document.createElement('option');
                        option.value = model.id;
                        option.textContent = model.name;
                        modelSelect.appendChild(option);
                    });
                })
                .catch(error => console.error('Erro ao buscar modelos:', error));
        } else {
            modelSelect.innerHTML = '<option value="">Selecione um modelo</option>';
        }
    });

    // Função para lidar com a submissão do formulário
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const vehicleType = typeSelect.value;
        const brandId = brandSelect.value;
        const modelId = modelSelect.value;
        if (vehicleType && brandId && modelId) {
            fetch(`https://fipe.parallelum.com.br/api/v2/${vehicleType}/brands/${brandId}/models`)
                .then(response => response.json())
                .then(data => {
                    resultsDiv.innerHTML = '<h3>Modelos disponíveis:</h3>';
                    const list = document.createElement('ul');
         
