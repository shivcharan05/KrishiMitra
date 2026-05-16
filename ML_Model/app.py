from flask import Flask, request, jsonify
from flask_cors import CORS

from utils.crop_predict import predict_crop
from utils.yield_predict import predict_yield

app = Flask(__name__)
CORS(app)

@app.route("/predict-crop", methods=["POST"])
def crop():

    data = request.json

    values = [
        data.get("nitrogen", data.get("N", 0)),
        data.get("phosphorus", data.get("P", 0)),
        data.get("potassium", data.get("K", 0)),
        data.get("temperature", 0),
        data.get("humidity", 0),
        data.get("ph", 0),
        data.get("rainfall", 0)
    ]

    result = predict_crop(values)
    crop_name = str(result).title()

    return jsonify({
        "recommended_crop": crop_name
    })

@app.route("/predict-yield", methods=["POST"])
def yield_prediction():

    data = request.json

    values = [
        data.get("rainfall", 0),
        data.get("temperature", 0)
    ]

    try:
        result = predict_yield(values)
        return jsonify({
            "predicted_yield": str(result)
        })
    except Exception as e:
        return jsonify({
            "predicted_yield": "Yield prediction not available"
        })

import google.generativeai as genai
import os

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message", "")
    
    api_key = os.environ.get("GEMINI_API_KEY", "")
    
    if not api_key:
        return jsonify({"reply": "I am not yet configured with an API key. Please set GEMINI_API_KEY in your environment variables to enable my AI brain!"})
        
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')
        prompt = f"You are KrishiMitra, an expert AI farming assistant in India. Answer the farmer's question kindly, accurately, and concisely. Keep formatting simple. Question: {message}"
        
        response = model.generate_content(prompt)
        return jsonify({"reply": response.text})
    except Exception as e:
        return jsonify({"reply": f"Sorry, I encountered an error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True, port=5002)