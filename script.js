// Create a speed gauge using Chart.js
const ctx = document.getElementById('speedGauge').getContext('2d');
const speedGauge = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [0, 120],
            backgroundColor: ['#34d399', '#1e293b'],
            borderWidth: 0
        }]
    },
    options: {
        rotation: Math.PI, // Start from top
        circumference: Math.PI, // Half circle
        cutout: '75%', // Inner circle
        plugins: {
            tooltip: { enabled: false }
        }
    }
});

// Function to fetch and display speed test data
function fetchSpeedData() {
    document.getElementById('checkSpeedBtn').disabled = true; // Disable button while loading
    fetch('/api/speed')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                // Update text values
                document.getElementById('downloadSpeed').innerText = `${data.download} mbps`;
                document.getElementById('uploadSpeed').innerText = `${data.upload} mbps`;
                document.getElementById('pingValue').innerText = `${data.ping} ms`;
                document.getElementById('speedValue').innerText = `${data.download}`;

                // Update the gauge
                speedGauge.data.datasets[0].data = [data.download, 120 - data.download];
                speedGauge.update();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch speed data.');
        })
        .finally(() => {
            document.getElementById('checkSpeedBtn').disabled = false; // Enable button
        });
}

// Attach event listener to the button
document.getElementById('checkSpeedBtn').addEventListener('click', fetchSpeedData);
