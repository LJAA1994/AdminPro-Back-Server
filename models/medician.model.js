const {Schema, model} = require('mongoose');

const MedicianSchema = Schema(
    {
        name:{
            type:String,
            require:true,
        },
        image:{
            type:String,
        },
        user:{
            type:Schema.Types.ObjectId,
            ref:'User',
            require:true
        },
        hospital:{
            type:Schema.Types.ObjectId,
            ref:'Hospital',
            require:true
        },
    },{collection:'_medicians'}//Indica el nombre con el que se guarda en la BBDD
)
//Modificar o alterar el objeto que devuelve el modelo
MedicianSchema.method('toJSON' , function() {
 const {__v,_id,...object}= this.toObject();
//  Modificamos el objeto y no mandamos el password
 object.id = _id;
 console.log(object);
 return object;
})

module.exports = model('Medician',MedicianSchema);