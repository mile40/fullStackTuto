import express, { Request, response, Response } from "express"
import bodyParser from "body-parser";
//mongoose load
import{List, Task} from "./db/models/index";
import mongoose from "./db/mongoose"


const app = express();
app.use(bodyParser.json());
const db = mongoose;

// route handlers

//liste route

// GET /lists
// purpose: get all lists
app.get("/lists", (req:Request, res:Response)=>{
    // retourne toutes les listes dans la database
    List.find({}).then((lists)=>{
        res.send(lists);
    })
})
/**
 * POST /list
 * but: créer une liste
 */
app.post("/lists", (req:Request, res:Response)=>{
    // on veut créer une nouvelle liste et l'ajouter aux listes existantes
    // ça passera en JSON
    let title = req.body.title;
    let newList = new List({title});
    newList.save().then((listDoc)=>{
        res.send(listDoc);
    })
})
/**
 * PATH /lists/:id
 * but: update une liste spécifique
 * patch est un équivalent de put 
 */
app.patch("/lists/:id", (req:Request, res:Response)=>{
    // on veut update une liste spécifique  
    List.findOneAndUpdate({_id: req.params.id,}, {$set: req.body}).then(()=>{
        res.status(200).send();
    })
})

/**
 * DELETE /list/:id
 * but: supprimer une liste spécifique
 */
app.delete("/lists/:id",(req:Request, res:Response)=>{
    List.findOneAndRemove({_id:req.params.id}).then((removedListDocument)=>{
        res.status(200).send(removedListDocument)
    })
})
/**
 * GET /lists/:listId/tasks
 * but: retourner toutes les taches apparetnant à cette liste
 */
app.get("/lists/:listId/tasks", (req:Request, res:Response)=>{
    Task.find({
        _listId: req.params.listId
    }).then((tasks)=>{
        res.status(200).send(tasks);
    })
})

/**
 * POST /lists/:listId/tasks
 * but: craer une tache appartenant à une liste spécifique
 */
app.post("/lists/:listId/tasks", (req:Request, res:Response)=>{
    let newTask = new Task({
        title:req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc)=>{
        res.status(200).send(newTaskDoc);
    })
})

/**
 *  PATCH /lists/:listId/tasks/:taskId
 * but: modifier une tache particulière appartenant à une liste en particulier
 */
app.patch("/lists/:listId/tasks/:taskId", (req:Request, res:Response)=>{
    Task.findOneAndUpdate({
        _id:req.params.taskId,
        _listId:req.params.listId
    }, {$set: req.body}).then(()=>{
        res.status(200).send();
    })
})

/**
 * DELETE /lists/:listId/tasks/:taskId
 * but: delete une tache
 */
app.delete("/lists/:listId/tasks/:taskId", (req:Request, res:Response)=>{
    Task.findOneAndDelete({
        _id:req.params.taskId,
        _listId:req.params.listId
    }).then((deletedTaskDoc)=>{
        res.status(200).send(deletedTaskDoc);
    })
})

/**
 * GET /lists/:listId/tasks/:taskId
 * but: retourner une tache appartenant  une liste précise
 */
app.get("/lists/:listId/tasks/:taskId", (req:Request, res:Response)=>{
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((taskDoc)=>{
        res.status(200).send(taskDoc);
    })
})
app.listen(3000, ()=>{
    console.log("server listening on port 3000");
})
