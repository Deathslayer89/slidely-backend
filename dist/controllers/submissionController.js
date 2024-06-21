"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubmission = exports.ping = exports.searchSubmission = exports.deleteSubmission = exports.readForm = exports.submitForm = void 0;
const submissionModel_1 = require("../models/submissionModel");
const submitForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('in submission');
    try {
        const newSubmission = new submissionModel_1.Submission(req.body);
        yield newSubmission.save();
        res.status(201).json({ message: 'Submission saved successfully!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error saving submission', error });
    }
});
exports.submitForm = submitForm;
const readForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('in read');
    try {
        const index = parseInt(req.query.index);
        const submissions = yield submissionModel_1.Submission.find();
        if (index >= 0 && index < submissions.length) {
            res.json(submissions[index]);
        }
        else {
            res.status(404).json({ message: 'Submission not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving submission', error });
    }
});
exports.readForm = readForm;
const deleteSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('in delete');
    try {
        const email = req.params.email;
        const deletedSubmission = yield submissionModel_1.Submission.findOneAndDelete({ email: email });
        if (!deletedSubmission) {
            res.status(404).json({ error: 'Submission not found' });
        }
        else {
            res.json({ success: true });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteSubmission = deleteSubmission;
const searchSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const submission = yield submissionModel_1.Submission.findOne({ email: email });
        if (!submission) {
            res.status(404).json({ error: 'Submission not found' });
        }
        else {
            res.json(submission);
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.searchSubmission = searchSubmission;
const ping = (req, res) => {
    res.json(true);
};
exports.ping = ping;
const updateSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const updatedData = req.body;
    console.log('in update');
    try {
        const updatedSubmission = yield submissionModel_1.Submission.findOneAndUpdate({ email: email }, updatedData, { new: true });
        console.log(updatedSubmission);
        if (!updatedSubmission) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        res.status(200).json(true);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateSubmission = updateSubmission;
