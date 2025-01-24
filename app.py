from flask import Flask, jsonify, render_template
import speedtest

app = Flask(__name__)

# Function to get download and upload speeds
def get_speed():
    try:
        st = speedtest.Speedtest()
        st.get_best_server()  # Get the best server based on latency
        download_speed = st.download() / 1_000_000  # Convert to Mbps
        upload_speed = st.upload() / 1_000_000  # Convert to Mbps
        return round(download_speed, 2), round(upload_speed, 2)
    except Exception as e:
        # Raise an error to be caught in the route
        raise Exception(f"Speedtest failed: {e}")

# Route to serve the main HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Route to fetch speed data
@app.route('/speed')
def speed():
    try:
        download_speed, upload_speed = get_speed()
        return jsonify({'download': download_speed, 'upload': upload_speed})
    except Exception as e:
        # Log the error in the console and return it in the response
        print(f"Error in /speed route: {e}")
        return jsonify({'error': f"Failed to fetch speed data: {e}"})

if __name__ == '__main__':
    app.run(debug=True)
