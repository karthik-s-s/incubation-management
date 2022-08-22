const mongoose  =  require('mongoose')

const User = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    role:{type:String},
    forms:{type:Object},
    formsubmited:{type:Boolean},
    status:{type:String},
    isBooked:{type:Boolean},
},{collection:'user-data'})
// console.log(User);
// We need to convert our Schema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):

// so you can use any name that you want for modelName but it should be meaning full
const model = mongoose.model('UserData',User)


module.exports = model
