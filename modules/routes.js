import db from "../Database/index.js";
function ModuleRoutes(app) {
  app.delete("/api/modules/:mid", (req, res) => {
    const { cid, mid } = req.params;
    db.modules = db.modules.filter((m) => m._id !== mid);
    res.sendStatus(204);
  });

  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      _id: new Date().getTime().toString(),
      course: cid,
    };
    db.modules.push(newModule);
    res.send(newModule);
  });

  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = db.modules
      .filter((m) => m.course === cid);
    res.send(modules);
}); 

  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const moduleIndex = db.modules.findIndex((m) => m._id === mid);
    db.modules[moduleIndex] = {
      ...db.modules[moduleIndex],
      ...req.body,
    };
    res.sendStatus(200);
  });




}
export default ModuleRoutes;