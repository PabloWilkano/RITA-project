// dashboard.ts
// Example TypeScript code for handling the form submission and chart creation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inventoryForm') as HTMLFormElement;
    const chartData = [10, 5]; // Sample data, replace with actual data

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const item = (document.getElementById('item') as HTMLInputElement).value;
        const quantity = (document.getElementById('quantity') as HTMLInputElement).value;

        // Add code to send item and quantity to your server for inventory update

        // Update the table with the new data (sample code)
        const table = document.querySelector('table tbody');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item}</td><td>${quantity}</td>`;
        table.appendChild(row);

        // Update the chart (sample code)
        chartData.push(parseInt(quantity, 10));
        const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Item 1', 'Item 2', 'New Item'], // Update with actual labels
                datasets: [{
                    label: 'Quantity',
                    data: chartData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
});