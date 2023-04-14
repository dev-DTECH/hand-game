const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

var model
async function loadModel(){
    model = await tf.loadLayersModel('models/v1_tfjs_model/model.json');
}
loadModel()
const classes=['rock','paper','scissors']
var out=-1
function preprocess(shape,landmarks){
  let image_width=shape[1], image_height =shape[0]
  let processed=[]

  let origin={}
  origin['x']=Math.min(landmarks[0]['x'] * image_width, image_width - 1)
  origin['y']=Math.min(landmarks[0]['y'] * image_height, image_height - 1)
  let max = Number.MIN_VALUE
  for (let i = 0; i < landmarks.length; i++) {
    let landmark_x = Math.min(landmarks[i]['x'] * image_width, image_width - 1) - origin['x']
    let landmark_y = Math.min(landmarks[i]['y'] * image_height, image_height - 1)- origin['y']
    max=Math.max(max,Math.abs(landmark_x))
    max=Math.max(max,Math.abs(landmark_y))
    // console.log(landmark_x,landmark_y)

    processed.push(landmark_x)
    processed.push(landmark_y)

  }
  // console.log(processed)
  for (let i = 0; i < processed.length; i++) {
    processed[i]/=max
  }
  return processed
}
function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  // canvasCtx.scale(-1, 1);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  // canvasCtx.restore()
  let outele = document.querySelector("#output")
    outele.innerHTML='✊'
    out=-1


  if (results.multiHandLandmarks) {
    // console.log(results.image)
    for (const landmarks of results.multiHandLandmarks) {
      let x = preprocess([canvasElement.height,canvasElement.width],landmarks)
      // console.log(x)
      // let x=[]
      // origin=landmarks[0]
      // for (const points of landmarks){
      //   x.push(points['x']-origin['x'])
      //   x.push(points['y']-origin['y'])
      // }
      let pred = model.predict(tf.tensor([x])).arraySync()[0]

      // console.log(pred)
      let tensor = tf.tensor1d(pred).argMax()
      out = tensor.arraySync()
      switch (out){
        case 0:
          outele.innerHTML='✊'
              break
        case 1:
          outele.innerHTML='🖐️'
              break
        case 2:
          outele.innerHTML='✌️'
      }




      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#00FF00', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    }
  }


  canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.1,
  minTrackingConfidence: 0.1
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();

