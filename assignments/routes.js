import Database from "../Database/index.js";

function AssignmentRoutes(app) {
    // GET: Retrieve all assignments for a course
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = Database.assignments.filter((assignment) => assignment.course === cid);
        res.send(assignments);
    });

    // POST: Create a new assignment for a course
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            _id: new Date().getTime().toString(),
            course: cid,
        };
        Database.assignments.push(newAssignment);
        res.status(201).send(newAssignment);
    });

    // DELETE: Delete an assignment
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        Database.assignments = Database.assignments.filter((assignment) => assignment._id !== aid);
        res.sendStatus(204);   
    });

    // PUT: Update an assignment
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = Database.assignments.findIndex((assignment) => assignment._id === aid);
        
        if (assignmentIndex === -1) {
            return res.sendStatus(404); // Not found
        }

        Database.assignments[assignmentIndex] = {
            ...Database.assignments[assignmentIndex],
            ...req.body,
        };
        res.sendStatus(200);
    });

    app.get("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignment = Database.assignments.find((assignment) => assignment._id === aid);
    
        if (assignment) {
            res.send(assignment);
        } else {
            res.sendStatus(404); // Not found
        }
    });
}

export default AssignmentRoutes;
