import mongoose from "mongoose"


mongoose.Promise = global.Promise; //indique que c'est asynchrone
mongoose.connect("mongodb://localhost:27017/TaskManager", {useNewUrlParser:true}).then(()=>{
    console.log("connexion à la base de données établie");
}).catch((e)=>{
    console.log("erreur lors de la connexion à la base de données");
    console.log(e);
});

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

export default mongoose