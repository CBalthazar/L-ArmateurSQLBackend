class MouvementController {
  creatMouvement(req, res) {
    res.send("post mouvement ajouté");
  }
  readMouvement(req, res) {
    res.send("messgae mouvement");
  }
  updateMouvement(req, res) {
    res.send("mouvement mis a jour");
  }
  deleteMouvement(req, res) {
    res.send("mouvement supprimé");
  }
}

export default MouvementController;
