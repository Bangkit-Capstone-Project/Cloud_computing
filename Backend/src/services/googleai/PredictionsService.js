const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { mapPredictionsDBtoModel } = require('../../utils');
const fetch = require('node-fetch');

class PredictionsService{
  constructor(diseasesService, historysService) {
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
    this._diseasesService = diseasesService;
    this._historysService = historysService;
  }

  async getRicePrediction({imgUrl, endpoint}, credentialsId){
    const labels = [
      'disease-E-uDF5xRJ0M-wxGR',
      'disease-APmrq1QkwnedtJRt',
      'disease-5IxgTua0P3ejwHru',
      'disease-MFExj2F2Ph2GOWjf',
      'disease-JgHRcz8HrGCacKc_'
    ];

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
   
    const disease = await this._diseasesService.getDiseaseById(labels[maxIndex]);
    const history = await this._historysService.addPredictionHistorys("plant-NFvOh8LtxCxyVbhO",
      disease.id,
      credentialsId,
      max,
      imgUrl);

    const created_at = new Date().toISOString();
    const result = {
      image_url: imgUrl,
      accuracy: max,
      plant_name: "Rice",
      diseases_name: disease.name,
      description: disease.description,
      history_id: history,
      created_at: created_at
    };
    return mapPredictionsDBtoModel(result);
  }

  async getCassavaPrediction({imgUrl, endpoint}, credentialsId){
    const labels = [
      'disease-3fInBMJ7IOL3k0Gh',
      'disease-obI2baHYEMgQRL8o',
      'disease-X9aS15TvpITfrVzq',
      'disease-wPIHSPX886haLugJ',
    ];

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
   
    const disease = await this._diseasesService.getDiseaseById(labels[maxIndex]);
    const history = await this._historysService.addPredictionHistorys("plant-WtPxk_2PBso6LGvf",
      disease.id,
      credentialsId,
      max,
      imgUrl);

    const created_at = new Date().toISOString();
    const result = {
      image_url: imgUrl,
      accuracy: max,
      plant_name: "Rice",
      diseases_name: disease.name,
      description: disease.description,
      history_id: history,
      created_at: created_at
    };
    return mapPredictionsDBtoModel(result);
  }
}

module.exports = PredictionsService;