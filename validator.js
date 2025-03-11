import Joi from "joi";

const authSchema = Joi.object({
  mail: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .strip(),
});

const userSchema = Joi.object({
  pseudonym: Joi.string().min(3).max(100).required(),
  mail: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .strip(),
  description: Joi.string(),
});
// le .strip permet de ne pas faire apparaitre le mot de passe quand on utilise le schéma

const mouvementSchema = Joi.object({
  nom: Joi.string().min(1).max(50).required(),
  contenu: Joi.string().min(1).max(50).required(),
  date_debut: Joi.date().iso().required(),
  date_fin: Joi.date().allow(null).iso().greater(Joi.ref("date_debut")),
  image_url: Joi.string().allow(null).dataUri(),
});

const artistSchema = Joi.object({
  nom: Joi.string().min(1).max(50).required(),
  contenu: Joi.string().min(1).max(50).required(),
  date_debut: Joi.date().iso().required(),
  date_fin: Joi.date().allow(null).iso().greater(Joi.ref("date_debut")),
  image_url: Joi.string().allow(null).dataUri(),
});

const oeuvresSchema = Joi.object({
  nom: Joi.string().min(1).max(50).required(),
  contenu: Joi.string().min(1).max(50).required(),
  date_debut: Joi.date().iso().required(),
  date_fin: Joi.date().allow(null).iso().greater(Joi.ref("date_debut")),
  image_url: Joi.string().allow(null).dataUri(),
  idArtist: Joi.string().guid({ version: "uuidv4" }).required(),
  stock: Joi.number().integer().positive().required(),
});

export { authSchema, userSchema, mouvementSchema, artistSchema, oeuvresSchema };
