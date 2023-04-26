const {Schema, model} = require('mongoose');

const HospitalSchema = Schema(
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
    },{collection:'hospitals_'}//Indica el nombre con el que se guarda en la BBDD
)
//Modificar o alterar el objeto que devuelve el modelo
HospitalSchema.method('toJSON' , function() {
 const {__v,_id,...object}= this.toObject();
//  Modificamos el objeto y no mandamos el password
 object.id = _id;
 console.log(object);
 return object;
})

module.exports = model('Hospital',HospitalSchema);