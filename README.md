# Vision RPS
> [Live Preview!](https://vision-rps.devdt.xyz/)

A Rock-Paper-Scissors game using Machine Learning and Mediapipe’s hand tracking.
- Designed and implemented a Rock-Paper-Scissors game using Machine Learning using Mediapipe’s hand tracking.
- Collected a dataset of size 1329 using OpenCV and preprocessed it to our requirements. 
- Trained a classification model with a validation accuracy of 99.32% using TensorFlow and implemented it on website using TensorFlow.js.
---
## **Contents**

1. [ Running the project locally ](#run_project_locally)
2. [ How to collect data ](#collect_data)
2. [ How to train a new model ](#train_model)
2. [ How to convert model to tensorflow.js format](#convert_model)
3. [ Results ](#results)

[//]: # (5. [ Future Works ]&#40;#future_works&#41;)

---
<a name="run_project"></a>
## Running the project locally

### Clone the git repository
```shell
git clone https://github.com/dev-DTECH/vision-rps.git
cd ./vision-rps
```
### Run a HTTP Server
```shell
python -m http.server 8080
```
> The project should be live at https://localhost:8080
---

<a name="collect_data"></a>
## How to collect data
### Install the dependencies
```shell
pip install -r requirements.txt
```
### Run the collect data manual script
```shell
python collect_data_manual.py
```
> Press the keys from 0 to 9 as labels while showing your hand in the camera.
> It will generate a dataset and store it into data.csv
---
<a name="train_model"></a>
## How to train a new model
> Open the train.ipynb with Jupyter notebook and execute all the cells accordingly
---
<a name="convert_model"></a>
## Convert keras model to TensorFlow.js
### Install TensorFlow.js
```shell
pip install tensorflowjs
```
### Run the converter script
```shell
tensorflowjs_converter \                                         
    --input_format=keras \
    /models/v1.h5 \
    /models/v1_tfjs_model

```
---
<a name="results"></a>
## Results
> Accuracy = 0.9932279909706546
### Confusion Matrix
![alt text](https://github.com/dev-DTECH/vision-rps/raw/main/output.png)
