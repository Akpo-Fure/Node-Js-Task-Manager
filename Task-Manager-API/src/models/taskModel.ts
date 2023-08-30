import mongoose, { Schema, Document } from "mongoose";
import joi from "joi";

enum TaskStatus {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed',
}

interface ITask extends Document {
    Name: string;
    Description: string;
    Status: TaskStatus;
}

const TaskValidationSchema = joi.object({
    Name: joi.string().required(),
    Description: joi.string().required(),
    Status: joi.string().valid(...Object.values(TaskStatus)).required()
});

const TaskSchema: Schema = new Schema({
    Name: { type: String, required: true },
    Description: { type: String, required: true },
    Status: { type: String, enum: Object.values(TaskStatus), required: true }
}, { timestamps: true }
);


TaskSchema.pre("validate", async function (next) {
    try {
        const { Name, Description, Status } = this;
        const validatedTask = await TaskValidationSchema.validateAsync(
            {
                Name,
                Description,
                Status,
            },
            {
                abortEarly: false,
            }
        );
        this.set(validatedTask);
        next();
    } catch (error: any) {
        next(error);
    }
});



const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;