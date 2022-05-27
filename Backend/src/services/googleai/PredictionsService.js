const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { mapPredictionsDBtoModel } = require('../../utils');
const fetch = require('node-fetch');

class PredictionsService{
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this._pool = new Pool({
        connectionString: process.env.PGURI,
        ssl: {
          rejectUnauthorized: false,
        },
      });
    } else {
      this._pool = new Pool();
    }
  }

  async getRicePrediction({imgUrl, endpoint}){
  const labels = ['Blight', 'BrownSpot', 'Healthy', 'LeafSmut', 'Tungro']
   const url = "https://storage.googleapis.com/tanamin-saved-image/padi.jpg";
    let predictionResult = await fetch(
      "https://us-central1-tanamin.cloudfunctions.net/function-1",
      {
        method: "POST",
        body: '{"imgUrl": "' + imgUrl + '", "endpoint": "' + endpoint + '"}',
        headers: {'Content-Type': 'application/json'}
      }
    ).then(res => res.text());
    const predictions = JSON.parse(predictionResult)[0];
    let max = predictions[0];
    let maxIndex = 0;
    for(let i=0;i<predictions.length;i++){
      if(predictions[i]>max){
          max=predictions[i];
          maxIndex=i;
        }
    }

    // json parse is used because imgarray is a string
    // from other api request
    // const instances = [JSON.parse(imgArray)];
    // const instances = {
    //   instances: instance
    // };

    // const predictionResponse = await fetch(
    //   `https://us-central1-aiplatform.googleapis.com/v1/${this.endpoint}`,
    //   {
    //     method: "POST",
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(instances),
    //   }
    // ).then(res => res.text());
    
    // console.log(predictionResponse);
    // const request = {
    //   endpoint,
    //   instances,
    // }
    
    // const [response] = await predictionServiceClient.predict(request);


    // const predictionResult = predictionResponse.predictions;
    const created_at = new Date().toISOString();
    const result = {
      image_url: `https://storage.googleapis.com/tanaminapp-images/ssss`,
      accuracy: max,
      plant_name: "Rice",
      diseases_name: labels[maxIndex],
      description: "ini description dummy",
      created_at: created_at
    };

    return mapPredictionsDBtoModel(result);
  }

  async getCassavaPrediction(file, meta){
    const created_at = new Date().toISOString();
    const result = {
      image_url: `https://storage.googleapis.com/tanaminapp-images/ssss`,
      accuracy: 0.8,
      plant_name: "Cassava",
      diseases_name: "Nama penyakit",
      description: "ini description dummy",
      created_at: created_at
    };

    return mapPredictionsDBtoModel(result);
  }
}

module.exports = PredictionsService;