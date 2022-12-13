import pandas as pd
from neuralprophet import NeuralProphet
from matplotlib import pyplot as plt
from matplotlib.figure import Figure
import pickle
import os
import sys
import base64
from io import BytesIO
import shutil


destPath = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

# print(destPath + "/download-data/" + sys.argv[1] + "/dateSeries-sens.csv")

df = pd.read_csv(destPath + "/download-data/" + sys.argv[1] + "/dateSeries-sens.csv")

df.head()

df.Date.unique()

df['Date'] = pd.to_datetime(df['Date'])
df.head()

# plt.plot(df['Date'], df['tempAvg'])
# plt.show()

data = df[['Date', 'tempAvg']]
data.dropna(inplace=True)
data.columns = ['ds', 'y']
data.head()

m = NeuralProphet()

model = m.fit(data,freq='D')

future = m.make_future_dataframe(data, periods=8000)
forecast = m.predict(future)
forecast.head()

plt1 = m.plot(forecast)

plt2 = m.plot_components(forecast)

with open('saved_model.pkl', 'wb') as f:
    pickle.dump(m, f)

del m

with open('saved_model.pkl', "rb") as f:
    m = pickle.load(f)
future = m.make_future_dataframe(data, periods=900)
forecast = m.predict(future)
forecast.head()

plt3 = m.plot(forecast)

newpath = "public/pythonModels/neauralprophet/" +sys.argv[1]
if not os.path.exists(newpath):
    os.makedirs(newpath)


plt1.savefig("public/pythonModels/neauralprophet/" + sys.argv[1] + "/img1.png")
plt2.savefig("public/pythonModels/neauralprophet/" + sys.argv[1] + "/img2.png")
plt3.savefig("public/pythonModels/neauralprophet/" + sys.argv[1] + "/img3.png")

for i in range(1,4):
    with open("public/pythonModels/neauralprophet/" + sys.argv[1] + "/img" + str(i) + ".png", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        print(encoded_string)

shutil.rmtree("public/pythonModels/neauralprophet/" + sys.argv[1])