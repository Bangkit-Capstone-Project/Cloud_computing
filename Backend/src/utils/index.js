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
  createdAt:created_at
});

module.exports = { mapClassificationsDBtoModel };