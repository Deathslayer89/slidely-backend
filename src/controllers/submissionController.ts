import { Request, Response } from 'express';
import { Submission } from '../models/submissionModel';

export const submitForm = async (req: Request, res: Response) => {
    console.log('in submission')
    try {
        const newSubmission = new Submission(req.body);
        await newSubmission.save();
        res.status(201).json({ message: 'Submission saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving submission', error });
    }
};

export const readForm = async (req: Request, res: Response) => {
    console.log('in read')
    try {
        const index = parseInt(req.query.index as string);
        const submissions = await Submission.find();
        if (index >= 0 && index < submissions.length) {
            res.json(submissions[index]);
        } else {
            res.status(404).json({ message: 'Submission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving submission', error });
    }
}

export const deleteSubmission = async (req: Request, res: Response) => {
    console.log('in delete');
    try {
        const email = req.params.email;
        const deletedSubmission = await Submission.findOneAndDelete({ email: email });
        if (!deletedSubmission) {
            res.status(404).json({ error: 'Submission not found' });
        } else {
            res.json({ success: true });
        }
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

export const searchSubmission = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.query.email as string;
        const submission = await Submission.findOne({ email: email });
        if (!submission) {
            res.status(404).json({ error: 'Submission not found' });
        } else {
            res.json(submission);
        }
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

export const ping = (req: Request, res: Response): void => {
    res.json(true);
};

export const updateSubmission = async (req: Request, res: Response) => {
    const email = req.params.email;
    const updatedData = req.body;
    console.log('in update')
    try {
        const updatedSubmission = await Submission.findOneAndUpdate(
            { email: email },
            updatedData,
            { new: true }
        );
        console.log(updatedSubmission);
        if (!updatedSubmission) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        res.status(200).json(true);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};