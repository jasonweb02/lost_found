const ctx = document.getElementById('profitChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Initially empty
        datasets: [{
            label: 'EUR/USD Price',
            data: [],
            borderColor: 'rgba(0, 204, 0, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(0, 204, 0, 1)',
            fill: true,
            backgroundColor: 'rgba(0, 204, 0, 0.2)',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
            },
            x: {
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
            },
        }
    }
});

// Function to fetch Forex data
async function fetchForexData(interval = '5min') {
    const apiKey = 'your_api_key_here'; // Replace with your API key
    const url = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=${interval}&apikey=${apiKey}`;
    const loadingIndicator = document.getElementById('loadingIndicator');

    try {
        loadingIndicator.style.display = 'block'; // Show loading indicator
        const response = await fetch(url);
        const data = await response.json();

        if (data["Error Message"] || !data["Time Series FX (5min)"]) {
            throw new Error('Invalid API response.');
        }

        const timeSeries = data["Time Series FX (5min)"];
        const labels = [];
        const priceData = [];

        for (const time in timeSeries) {
            labels.push(new Date(time).toLocaleString()); // Convert to readable format
            priceData.push(parseFloat(timeSeries[time]["4. close"])); // Closing price
        }

        // Update the chart
        chart.data.labels = labels.reverse();
        chart.data.datasets[0].data = priceData.reverse();
        chart.update();
    } catch (error) {
        console.error('Error fetching Forex data:', error);
        alert('Failed to fetch Forex data. Please try again later.');
    } finally {
        loadingIndicator.style.display = 'none'; // Hide loading indicator
    }
}

// Function to update the chart based on selected range
function updateChart(range) {
    const intervalMapping = {
        daily: '15min',
        monthly: '1h',
        yearly: '1d'
    };

    fetchForexData(intervalMapping[range] || '5min');
}

// Initial data fetch
fetchForexData();
