import Categorie from "../models/Categorie";

export const getCategorieById = async (categorieId) => {
  const categorie = await Categorie.findById(categorieId);
  return categorie;
};
