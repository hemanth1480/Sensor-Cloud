import pandas as pd
from neuralprophet import NeuralProphet
from matplotlib import pyplot as plt

df = pd.read_csv('file.csv')
df.tail()

df.Date.unique()

df ['Date'] = pd.to_datetime(df ['Date'])
df.tail()

plt.plot(df ['Date'], df ['TempAvgF'])
plt.show()

new_column = df[['Date', 'TempAvgF']] 
new_column.dropna(inplace=True)
new_column.columns = ['ds', 'y'] 
new_column.tail()

n = NeuralProphet()
model = n.fit(new_column, freq='D')

future = n.make_future_dataframe(new_column, periods=2000)
forecast = n.predict(future)
forecast.tail()

plot = n.plot(forecast)