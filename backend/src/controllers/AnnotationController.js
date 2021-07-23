const Annotations = require('../models/annotationSchema')

module.exports = {

   async read(req, res) {
      const noteList = await Annotations.find()

      return res.json(noteList)
    
   },

   async create(req, res) {

        const {title,notes,priority} = req.body

        if(!title || !notes) {
            return res.status(400).json({error:"Preencha todos os campos!!"})
         }
        const noteCreate = await Annotations.create({
           title,
           notes,
           priority 
        })
        return res.json(noteCreate)
         
   },

   async delete(req,res) {
       const {id} = req.params

       const notesDelete = await Annotations.findOneAndDelete({_id : id})

       if(notesDelete) {
         return  res.json(notesDelete)
       }else{

         return res.status(401).json({error:"Não existe registro para deleter!!"})

       }
   }




}