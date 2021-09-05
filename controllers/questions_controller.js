const Question = require('../models/question')

module.exports = function(io){
    return {
        all : async function(req,res){
            const questions = await Question.find({deleted:false})
            res.json({
                success: 0,
                data: questions
            })
        },
        top: async function(req,res){
            const questions = await Question.find({deleted:false}).sort({created_at:-1}).limit(100)
            res.json({
                success: 0,
                data: questions
            })
        },
        create: async function(req,res){
            const {title, body}  = req.body
            if (title && body){
                const question = new Question({
                    title: title,
                    body: body
                })
                await question.save()
                io.sockets.in('new_questions').emit('new_questions',question)
                res.json({
                    success: 0,
                    data: question
                })
            }else{
                res.json({
                    success: -1,
                    error: 'Invalid Title or Content'
                })
            }
        }
    }

    
    
}

