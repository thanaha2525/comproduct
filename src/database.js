import  mongoose  from "mongoose";

mongoose.connect("mongodb+srv://dbtest:P@ssw0rd@cluster0.nie3c.mongodb.net/adz?retryWrites=true&w=majority", 
{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
})
    .then(db => console.log('Db is connected'))
    .catch(error => console.log(error))