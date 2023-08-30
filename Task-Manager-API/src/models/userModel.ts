import mongoose, { Schema, Document } from "mongoose";
import joi from "joi";
import bcrypt from "bcrypt";


interface iUser extends Document {
    Name: string;
    Email: string;
    Password: string;
    PhoneNumber: string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
    Tasks: Array<{ type: mongoose.Schema.Types.ObjectId; ref: "Task" }>;
}

const UserValidationSchema = joi.object({
    Name: joi.string().required(),
    Email: joi.string().email().required(),
    Password: joi.string().required().min(6),
    PhoneNumber: joi.string().required().min(6).pattern(/^\d{11}$/),
});


const UserSchema: Schema = new Schema({
    Name: { type: String, required: true },
    Email: { type: String, unique: true, required: true },
    Password: { type: String, required: true, minlength: 6 },
    PhoneNumber: { type: String, required: true, minlength: 11 },
    Tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
}, { timestamps: true }
);


UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.Password);
};

UserSchema.pre<iUser>("save", async function (next) {
    if (!this.isModified("Password")) {
        next();
    }
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS!));
        this.Password = await bcrypt.hash(this.Password, salt);
    } catch (error: any) {
        next(error);
    }
});

UserSchema.pre("validate", async function (next) {
    try {
        const { Name, Email, Password, PhoneNumber } = this;
        const validatedUser = await UserValidationSchema.validateAsync(
            {
                Name,
                Email,
                Password,
                PhoneNumber,
            },
            {
                abortEarly: false,
            }
        );
        this.set(validatedUser);
        next();
    } catch (error: any) {
        next(error);
    }
});



const User = mongoose.model<iUser>("User", UserSchema);

export default User;