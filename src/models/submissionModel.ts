import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

const SubmissionSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    github_link: { type: String, required: true },
    stopwatch_time: { type: String, required: true }
});

export const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);
