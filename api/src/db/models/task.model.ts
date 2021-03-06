import mongoose from "mongoose";
let TaskSchema = new mongoose.Schema({
    title:{type:String, required:true, minlength:1, trim:true},
     _listId:{type: mongoose.Types.ObjectId, required:true}
});


let Task =  mongoose.model("Task", TaskSchema);
export default Task;