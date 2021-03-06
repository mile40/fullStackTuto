import mongoose from "mongoose";
let ListSchema = new mongoose.Schema({
    title:{type:String, required:true, minlength:1, trim:true},
});


let List = mongoose.model("List", ListSchema);
export default List;