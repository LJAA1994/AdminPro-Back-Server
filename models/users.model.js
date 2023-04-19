const {Schema, model} = require('mongoose');

const UserSchema = Schema(
    {
        name:{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true,
        },
        image:{
            type:String,
            
        },
        role:{
            type:String,
            require:true,
            default:'USER_ROLE'
        },
        google:{
            type:Boolean,
            default:false,
        },
    }
)
//Modificar o alterar el objeto que devuelve el modelo
UserSchema.method('toJSON' , function() {
 const {__v,_id,password,...object}= this.toObject();
//  Modificamos el objeto y no mandamos el password
 object.uid = _id;
 console.log(object);
 return object;
})

module.exports = model('User',UserSchema);