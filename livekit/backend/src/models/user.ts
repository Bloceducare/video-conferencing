import { mongoose, Validator } from './imports';

const { isEmail } = Validator;

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: [true, 'Please include nickname'],
      unique: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      validate: [isEmail, 'Please add a valid email address'],
      sparse: true,
    },
    image: String,
    role: {
      super: { type: Boolean, default: false },
      admin: { type: Boolean, default: false },
      user: { type: Boolean, default: true },
      student: { type: Boolean, default: false },
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('User', UserSchema);
