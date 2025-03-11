class ArtisteController {
  creatArtiste(req, res) {
    res.send("post artiste ajouté");
  }
  readArtiste(req, res) {
    res.send("messgae Artiste");
  }
  updateArtiste(req, res) {
    res.send("artiste mis a jour");
  }
  deleteArtiste(req, res) {
    res.send("artiste supprimé");
  }
}

export default ArtisteController;
