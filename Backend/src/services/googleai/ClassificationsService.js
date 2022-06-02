const { Pool } = require('pg');
const { mapClassificationsDBtoModel } = require('../../utils');
const fetch = require('node-fetch');

class ClassificationsService{
  constructor(vegetablesService) {
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
    this._vegetablesService = vegetablesService;
  }

  async getVegetableClassification({imgUrl, endpoint}, credentialsId){
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
    
    // let max = 100;
    const vegetable = await this._vegetablesService.getVegetableById("vegetable-xJAeeyilWzeg_5aU");
    const created_at = new Date().toISOString();
    const result = {
      image_url: imgUrl,
      accuracy: max,
      vegetable_name: vegetable.name,
      description: vegetable.description,
      created_at: created_at
    };
    return mapClassificationsDBtoModel(result);
  }
}

module.exports = ClassificationsService;