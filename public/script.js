document.addEventListener('DOMContentLoaded', async () => {
    const exampleSelect = document.getElementById('exampleSelect');
    const runButton = document.getElementById('runButton');
    const outputDiv = document.getElementById('output');

    // Fetch the list of examples and populate the dropdown
    try {
        const response = await fetch('/examples');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const examples = await response.json();
        examples.forEach(example => {
            const option = document.createElement('option');
            option.value = example;
            option.textContent = example;
            exampleSelect.appendChild(option);
        });
    } catch (error) {
        outputDiv.textContent = `Error fetching examples: ${error}`;
        outputDiv.style.color = 'red';
    }

    // Add event listener to the run button
    runButton.addEventListener('click', async () => {
        const selectedExample = exampleSelect.value;
        if (!selectedExample) {
            outputDiv.textContent = 'Please select an example to run.';
            outputDiv.style.color = 'orange';
            return;
        }

        outputDiv.textContent = 'Running example...';
        outputDiv.style.color = 'black';

        try {
            const response = await fetch('/run-example', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ example: selectedExample })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            outputDiv.textContent = `Output:\n${JSON.stringify(result, null, 2)}`;
            outputDiv.style.color = 'green';

        } catch (error) {
            outputDiv.textContent = `Error running example: ${error}`;
            outputDiv.style.color = 'red';
        }
    });
});