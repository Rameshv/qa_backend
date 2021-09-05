const mongoose = require('mongoose')

const AnswerSchema = mongoose.Schema({
    question: {type:mongoose.Types.ObjectId,ref:'Question'},
    content: String,
    deleted:{type:Boolean,default:false},
    created_at:{type:Date, default: Date.now}
})

module.exports = mongoose.model('Answer',AnswerSchema)
