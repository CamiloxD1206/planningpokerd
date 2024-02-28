import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Task', taskSchema);