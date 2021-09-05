const Question = require('../models/question')
const Answer = require('../models/answer')
const mongoose = require('mongoose')


module.exports = function(io) {
    return {
        all: async function(req,res){
            if (mongoose.isValidObjectId(req.params.id)){
                const answers = await Answer.find({question:mongoose.Types.ObjectId(req.params.id)})
                res.json({
                    success: 0,
                    data: answers
                })
            }else{
                res.json({
                    success: -1
                })
            }
           
        },
        
        top: async function(req,res){
            if (mongoose.isValidObjectId(req.params.id)){
                const answers = await Answer.find({question:mongoose.Types.ObjectId(req.params.id)}).sort({created_at:-1}).limit(100)
                res.json({
                    success: 0,
                    data: answers
                })
            }else{
                res.json({
                    success: -1
                })
            }
        },
        
        create: async function(req,res){
            if (!mongoose.isValidObjectId(req.params.id)){
                return res.json({
                    success: -1
                })
            }
            const question = await Question.findById(req.params.id)
            const answer = new Answer({
                question: question._id,
                content: req.body.content,
            })
            await answer.save()
            question.answers_count += 1
            await question.save()
            // io.sockets.in(question._id.toString()).emit(answer)
            io.sockets.in('new_answers').emit('new_answers',answer)
            res.json({
                success:0,
                data: answer
            })
        }
    }
}
