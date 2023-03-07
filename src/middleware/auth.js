const jwt = require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")
const blogModel = require("../models/blogModel")

//-------------------------------------------  Authentication  ----------------------------------------------------


const authentication = async (req,res,next) => {
   try {

    // requirements 
        if(!req.headers["x-api-key"])
         return res.status(400).send({status:false, message:"token must be present inside the header"})


// authentication 
    jwt.verify(req.headers["x-api-key"], "blogging-site", function (err, decodedToken){
if(err){
    return res.status(401).send({status:false, message:err.message})
    }
    else{
        req.identity=decodedToken.id
        next()
    }
})}

catch(err){
   return res.status(500)}}


//------------------------------------------  Authorisation -----------------------------------------------------------------------------


const authorisation = async (req,res,next) => {
     try{
        // requirements
 if(!req.params.blogId){
    return res.status(400).send({status:false, message:"blogId should be present in path parameters"})
 }

 // validation of ObjectId
  if(!isValidObjectId(req.params.blogId)){
 return res.status(400).send({status: false, messageg:"please use valid ObjectId!!"})}
 
  let findBlogById= await blogModel.findById({_id:req.params.blogId})

  if(!findBlogById){
    return res.status(404).send({status:false, message:"No blog is present with this blogId"})
  }
  // if(findBlogById.isDeleted===true
  //   // ||findBlogById.isPublished===false
  //   ){ return res.status(404).send({status:false, message:"this blog is already deleted or not published."})
  // }

  // authorization 
  if(req.identity==findBlogById.authorId)
     next()

else{return res.sendStatus(403)}}

 catch(err){ return res.sendStatus(500)}}


module.exports.authentication = authentication
module.exports.authorisation = authorisation