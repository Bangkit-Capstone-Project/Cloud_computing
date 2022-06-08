const mapClassificationsDBtoModel = ({
  image_url,
  accuracy,
  vegetable_name,
  description,
  created_at
}) => ({
  imageUrl: image_url,
  accuracy,
  vegetableName: vegetable_name,
  description,
  createdAt: created_at
});

const mapPredictionsDBtoModel = ({
  image_url,
  accuracy,
  plant_name,
  diseases_name,
  description,
  history_id,
  created_at
}) => ({
  imageUrl: image_url,
  accuracy,
  plantName: plant_name,
  diseasesName: diseases_name,
  description,
  historyId: history_id,
  createdAt: created_at
});

const mapDiseaseDBtoModel = ({
  id,
  name,
  description,
  image_url,
}) => ({
  id,
  name,
  description,
  imageUrl: image_url,
});

const mapPlantDBtoModel = ({
  id,
  name,
  description,
  image_url,
}) => ({
  id,
  name,
  description,
  imageUrl: image_url,
});

const mapVegetableDBtoModel = ({
  id,
  name,
  description,
  image_url,
}) => ({
  id,
  name,
  description,
  imageUrl: image_url,
});

const mapPredictHistoryDBtoModel = ({
  id,
  user_id,
  plant_id,
  disease_id,
  plant_name,
  disease_name,
  accuracy,
  image_url,
  created_at
}) => ({
  id,
  userId: user_id,
  plantId: plant_id,
  diseaseId: disease_id,
  plantName: plant_name,
  diseasesName: disease_name,
  accuracy,
  imageUrl: image_url,
  createdAt: created_at
});


module.exports = {
  mapClassificationsDBtoModel,
  mapDiseaseDBtoModel,
  mapPlantDBtoModel,
  mapVegetableDBtoModel,
  mapPredictionsDBtoModel,
  mapPredictHistoryDBtoModel
};