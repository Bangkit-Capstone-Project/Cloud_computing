const { Pool } = require('pg');
const { mapClassificationsDBtoModel } = require('../../utils');
const fetch = require('node-fetch');

class ClassificationsService{
  constructor(vegetablesService) {
    if (process.env.NODE_ENV === 'production') {
      this._pool = new Pool({
        "host":process.env.PGHOST,
        "database":process.env.PGDATABASE,
        "port":"5432",
        "user":process.env.PGUSER,
        "password":process.env.PGPASSWORD
      });
    } else {
      this._pool = new Pool();
    }
    this._vegetablesService = vegetablesService;
  }

  async getVegetableClassification({imgUrl, endpoint}, credentialsId){
    const labels = [
      'vegetable-hIT14f3jyx0SJbgD', //Edamame
      'vegetable-S4bivE_zFBRr6Gpb', //Pare
      'vegetable-I8HtKbRZrku6Gl1E', //Labu Air
      'vegetable-3rAnbnWi65iaCYJL', //Terong Hijau
      'vegetable-RMf-KqBQT4Iwt1po', //Brokoli
      'vegetable-czhGlbiXTzThU_iT', //Kubis
      'vegetable-ufr78NuZcmK1tbHs', //Paprika
      'vegetable-tta8kjmyxxtrxT2e', //Wortel
      'vegetable-FkxmlNt0PbhlHDZK', //Kembang Kol
      'vegetable-nImUva4N0g-B4V97', //Mentimun
      'vegetable-7yMJysSwTQ0CamPx', //Pepaya
      'vegetable-i-8n7Epfvcp9TrVx', //Kentang
      'vegetable-jpeNhe3t2NYm1z5s', //Labu
      'vegetable-1TTh89D6NWhR6k8U', //Lobak
      'vegetable-uW6whzXRU3OHM6bC', //Tomat
      '',
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
    let max = predictions[0].toFixed(8);
    let maxIndex = 0;
    for(let i=0;i<predictions.length;i++){
      if(predictions[i].toFixed(8) > max){
          max=predictions[i].toFixed(8);
          maxIndex=i;
        }
    }

    // let max = 100;
    const vegetable = await this._vegetablesService.getVegetableById(labels[maxIndex]);
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