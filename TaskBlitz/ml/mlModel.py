import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import joblib

# Load and preprocess data
data = pd.read_csv('task_data.csv')
X = data[['feature1', 'feature2', 'feature3']]
y = data['completion_time']

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LinearRegression()
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'task_completion_model.pkl')
