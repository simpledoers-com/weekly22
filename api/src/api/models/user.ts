import bcrypt from 'bcrypt';
import {Schema, Document, model, Model} from 'mongoose';
import validator from 'validator';

interface IUserDocument extends Document {
  password: string,
  email: string,
  name: string,
  created: Date,
}

export interface IUser extends IUserDocument {
  comparePassword(password: string): Promise<boolean> ;
}

const userSchema = new Schema<IUser>({
  password: {type: String, required: true},
  email: {type: String, required: true, trim: true, 
          validate: [validator.isEmail, 'do not match email regex']},
  name: {type: String, required: true},
  created: {type:Date, default: Date.now},
}, {strict: true}).index({email:1}, 
            {unique: true, 
             collation: {locale: 'en_US', strength: 1}, sparse: true}); 

userSchema.pre<IUserDocument>('save', function(next):void  {
  if(this.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      if(err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});

userSchema.set('toJSON', {
  transform: function(doc:any, ret:any, options:any){
    ret.created = ret.created.getTime();
    delete ret.__v;
    delete ret._id;
    delete ret.password;
    
  }
});

userSchema.methods.comparePassword = function(candidatePassword: string): Promise<boolean>{
  const {password} = this;
  return new Promise(function(resolve, reject){ 
    bcrypt.compare(candidatePassword, password, function(err, isMatch){
      if(err) return reject(err);
      return resolve(isMatch);
    });
  });
};

export interface IUserModel  extends Model<IUser>{
  
}

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;

