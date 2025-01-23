const ctx = document.getElementById('profitChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Profits',
            data: [500, 700, 800, 1200, 1500, 1700],
            borderColor: 'rgba(0, 204, 0, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(0, 204, 0, 1)',
            fill: true,
            backgroundColor: 'rgba(0, 204, 0, 0.2)',
            tension: 0.4
        }, {
            label: 'Losses',
            data: [100, 120, 90, 80, 70, 60],
            borderColor: 'rgba(204, 0, 0, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(204, 0, 0, 1)',
            fill: true,
            backgroundColor: 'rgba(204, 0, 0, 0.2)',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
            },
        }
    }
});

function updateChart(range) {
    if (range === 'daily') {
        chart.data.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        chart.data.datasets[0].data = [100, 200, 300, 400, 500];
        chart.data.datasets[1].data = [10, 20, 30, 40, 50];
    } else if (range === 'monthly') {
        chart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        chart.data.datasets[0].data = [500, 700, 800, 1200, 1500, 1700];
        chart.data.datasets[1].data = [100, 120, 90, 80, 70, 60];
    } else if (range === 'yearly') {
        chart.data.labels = ['2021', '2022', '2023', '2024', '2025'];
        chart.data.datasets[0].data = [12000, 15000, 17000, 20000, 22000];
        chart.data.datasets[1].data = [1200, 1000, 900, 800, 700];
    }
    chart.update();
}
