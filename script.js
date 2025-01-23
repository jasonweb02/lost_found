const ctx = document.getElementById('profitChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Initially empty, will be filled with real-time data
        datasets: [{
            label: 'EUR/USD Price',
            data: [], // Initially empty, will be updated with real-time data
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
    const url = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=${interval}&apikey=demo`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const timeSeries = data["Time Series FX (5min)"]; // This is specific to the 5min interval API response
        
        const labels = [];
        const priceData = [];
        
        for (const time in timeSeries) {
            labels.push(time);
            priceData.push(timeSeries[time]["4. close"]); // Closing price for EUR/USD
        }
        
        // Update the chart data
        chart.data.labels = labels;
        chart.data.datasets[0].data = priceData;
        chart.update();
    } catch (error) {
        console.error('Error fetching Forex data:', error);
    }
}

// Function to handle different chart filters (Daily, Monthly, Yearly)
function updateChart(range) {
    let interval = '5min'; // Default 5 minutes interval

    if (range === 'daily') {
        interval = '15min'; // Adjust interval for daily view
    } else if (range === 'monthly') {
        interval = '1h'; // Adjust interval for monthly view
    } else if (range === 'yearly') {
        interval = '1d'; // Adjust interval for yearly view
    }

    fetchForexData(interval); // Update the chart with the selected interval
}

// Initial chart load (5-minute interval by default)
fetchForexData('5min');
