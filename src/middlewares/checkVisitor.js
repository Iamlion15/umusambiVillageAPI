import visitorModel from "../models/visitorModel"

const checkVisitor=async(req,res,next)=>{
    const user=await visitorModel.findOne({nID:req.body.nID})
    if(user==null)
    {
        next()
    }
    else
    {
        res.status(204).json({"code":100})
    }
}

export default checkVisitor;