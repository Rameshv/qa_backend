const mongoose = require('mongoose')

const QuestionSchema = mongoose.Schema({
    title: String,
    body: String,
    answers_count: {type:Number,default:0},
    created_at:{type:Date, default: Date.now},
    deleted:{type:Boolean,default:false},
    viewed: Number
})

module.exports = mongoose.model('Question',QuestionSchema)
