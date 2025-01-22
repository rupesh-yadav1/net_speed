from flask import Flask, render_template, jsonify
import speedtest

app = Flask(__name__)

# Serve the HTML page
@app.route("/")
def home():
    return render_template("index.html")

# API endpoint to perform the speed test
@app.route("/api/speed", methods=["GET"])
def speed_test():
    try:
        # Initialize the speedtest object
        st = speedtest.Speedtest()
        st.get_best_server()  # Find the best server based on ping

        # Perform the speed test
        download_speed = round(st.download() / 1e6, 2)  # Convert bytes to Mbps
        upload_speed = round(st.upload() / 1e6, 2)      # Convert bytes to Mbps
        ping = round(st.results.ping, 2)                # Ping in ms

        # Return the results as JSON
        return jsonify({
            "download": download_speed,
            "upload": upload_speed,
            "ping": ping
        })
    except Exception as e:
        # Handle errors and return a message
        return jsonify({"error": f"Error during speed test: {str(e)}"}), 500

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))  # Use PORT provided by Render
    app.run(host="0.0.0.0", port=port)

