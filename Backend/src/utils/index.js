const mapClassificationsDBtoModel = ({
  image_url,
  accuracy,
  name,
  description,
  created_at
}) => ({
  imageUrl: image_url,
  accuracy,
  plantName: name,
  description,
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

module.exports = {
  mapClassificationsDBtoModel,
  mapDiseaseDBtoModel,
  mapPlantDBtoModel,
  mapVegetableDBtoModel
};