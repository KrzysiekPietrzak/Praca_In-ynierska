const mongoose = require('mongoose')

const Offert = new mongoose.Schema({
    title: {type:String, required: true},
    body: {type:String, required: true},
    city: {type:String, required: true},
    type: {type:String, required: true},
    person: {type:String, required: true},
    date: {type:Date, required:true},
    liked:{type:Array}
},{
    collection:'offert'}
    )


const model = mongoose.model('OffertData',Offert)

module.exports = model