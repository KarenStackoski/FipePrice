document.addEventListener('DOMContentLoaded', function() {
            const typeSelect = document.getElementById('type');
            const modelSelect = document.getElementById('model');
            const resultsDiv = document.getElementById('results');

            typeSelect.addEventListener('change', function() {
                const vehicleType = this.value;
                fetch(`https://fipe.parallelum.com.br/api/v2/${vehicleType}/brands`)
                    .then(response => response.json())
                    .then(data => {
                        modelSelect.innerHTML = '<option value="">Selecione uma marca</option>';
                        data.forEach(brand => {
                            const option = document.createElement('option');
                            option.value = brand.id;
                            option.textContent = brand.name;
                            modelSelect.appendChild(option);
                        });
                    })
                    .catch(error => console.error('Erro ao buscar marcas:', error));
            });

            modelSelect.addEventListener('change', function() {
                const vehicleType = typeSelect.value;
                const brandId = this.value;
                if (brandId) {
                    fetch(`https://fipe.parallelum.com.br/api/v2/${vehicleType}/brands/${brandId}/models`)
                        .then(response => response.json())
                        .then(data => {
                            resultsDiv.innerHTML = '<h3>Modelos disponíveis:</h3>';
                            const list = document.createElement('ul');
                            data.models.forEach(model => {
                                const listItem = document.createElement('li');
                                listItem.textContent = model.name;
                                list.appendChild(listItem);
                            });
                            resultsDiv.appendChild(list);
                        })
                        .catch(error => console.error('Erro ao buscar modelos:', error));
                } else {
                    resultsDiv.innerHTML = '';
                }
            });

            document.getElementById('searchForm').addEventListener('submit', function(event) {
                event.preventDefault();
                const vehicleType = typeSelect.value;
                const brandId = modelSelect.value;
                if (vehicleType && brandId) {
                    fetch(`https://fipe.parallelum.com.br/api/v2/${vehicleType}/brands/${brandId}/models`)
                        .then(response => response.json())
                        .then(data => {
                            resultsDiv.innerHTML = '<h3>Modelos disponíveis:</h3>';
                            const list = document.createElement('ul');
                            data.models.forEach(model => {
                                const listItem = document.createElement('li');
                                listItem.textContent = model.name;
                                list.appendChild(listItem);
                            });
                            resultsDiv.appendChild(list);
                        })
                        .catch(error => console.error('Erro ao buscar modelos:', error));
                }
            });
        });
