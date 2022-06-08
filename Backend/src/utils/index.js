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
  plant_name,
  plant_description,
  disease_name,
  disease_description,
  accuracy,
  image_url,
  created_at
}) => ({
  id,
  userId: user_id,
  plantName: plant_name,
  plantDescription: plant_description,
  diseasesName: disease_name,
  diseasesDescription: disease_description,
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