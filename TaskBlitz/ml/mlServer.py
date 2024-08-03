from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('task_completion_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = [data['feature1'], data['feature2'], data['feature3']]
    prediction = model.predict([features])[0]
    return jsonify({'completion_time': prediction})

if __name__ == '__main__':
    app.run(debug=True)
