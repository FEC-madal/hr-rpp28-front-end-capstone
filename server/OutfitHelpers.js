const outfit = [];

const getAllOutfits = (callback) => {
  callback(null, outfit);
};

const saveOutfit = (newItem, callback) => {
  outfit.unshift(newItem);
  callback(null, outfit);
};

const deleteOutfit = (id, callback) => {
  let idx;

  for(let i = 0; i < outfit.length; i++) {
    if (outfit[i].styles.product_id === id) {
      idx = i;
    }
  }

  outfit.splice(idx, 1);
  callback(null, outfit);
};


module.exports.getAllOutfits = getAllOutfits;
module.exports.saveOutfit = saveOutfit;
module.exports.deleteOutfit = deleteOutfit;