import exp from "constants";
import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe('Submit feedback', () => {
    const createFeedbackSpy = jest.fn();
    const sendMailSpy = jest.fn();

    const submitFeedback = new SubmitFeedbackUseCase(
        { create: createFeedbackSpy },
        { sendMail: sendMailSpy }
    );

    it('shoud be able to submit feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Exemple Comment',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('shoud not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Exemple Comment',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC'
        })).rejects.toThrow();
    });

    it('shoud not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC'
        })).rejects.toThrow();
    });

    it('shoud not be able to submit feedback without screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Exemple Comment',
            screenshot: 'screenshot.jpg'
        })).rejects.toThrow();
    });
    
});