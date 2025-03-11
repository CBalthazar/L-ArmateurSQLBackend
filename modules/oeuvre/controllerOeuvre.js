class OeuvreController {
  creatOeuvre(req, res) {
    res.send("post Oeuvre ajouté");
  }
  readOeuvre(req, res) {
    res.send("messgae Oeuvre");
  }
  updateOeuvre(req, res) {
    res.send("Oeuvre mis a jour");
  }
  deleteOeuvre(req, res) {
    res.send("Oeuvre supprimé");
  }
}

export default OeuvreController;
