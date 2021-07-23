
const Annotations = require('../models/annotationSchema')

module.exports = {

    async update(req,res) {
        const {id} = req.params
        const {notes} = req.body

        annotation = await Annotations.findOne({_id : id})
            if(notes) {
                annotation.notes = notes

                await annotation.save()    
            }

            return res.json(annotation)
            
    }
}