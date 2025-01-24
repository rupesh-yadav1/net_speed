// Create speedometers
const downloadCtx = document.getElementById('downloadMeter').getContext('2d');
const uploadCtx = document.getElementById('uploadMeter').getContext('2d');

const downloadGauge = new Chart(downloadCtx, {
    type: 'gauge',
    data: {
        datasets: [{
            data: [0], // Initial value
            value: 0,
            minValue: 0,
            maxValue: 1000, // Max speed (adjust as needed)
            backgroundColor: ['#00ff00', '#ffff00', '#ff0000'], // Green to red gradient
        }]
    },
    options: {
        responsive: true,
        needle: { color: 'black' },
        valueLabel: { formatter: Math.round },
    }
});

const uploadGauge = new Chart(uploadCtx, {
    type: 'gauge',
    data: {
        datasets: [{
            data: [0], // Initial value
            value: 0,
            minValue: 0,
            maxValue: 1000, // Max speed (adjust as needed)
            backgroundColor: ['#00ff00', '#ffff00', '#ff0000'], // Green to red gradient
        }]
    },
    options: {
        responsive: true,
        needle: { color: 'black' },
        valueLabel: { formatter: Math.round },
    }
});

// Function to fetch speed and update the speedometers
function getSpeed() {
    fetch('/speed')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Error: ' + data.error);
                return;
            }

            const downloadSpeed = data.download || 0;
            const uploadSpeed = data.upload || 0;

            // Update the gauges
            downloadGauge.data.datasets[0].value = downloadSpeed;
            uploadGauge.data.datasets[0].value = uploadSpeed;

            downloadGauge.update();
            uploadGauge.update();
        })
        .catch(error => {
            console.error('Error fetching speed data:', error);
            alert('Error fetching speed data. Please try again.');
        });
}
