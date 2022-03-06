import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { addOption, duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */

export function getPublishedQuestions(questions: Question[]): Question[] {
    const newQuestions: Question[] = [];
    questions.map((question: Question) =>
        question.published == true
            ? newQuestions.push(question)
            : question.published == false
    );
    return newQuestions;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */

export function getNonEmptyQuestions(questions: Question[]): Question[] {
    questions = questions.filter(
        (question: Question): boolean =>
            (question.body !== "" || question.expected !== "") &&
            question.options !== []
    );
    return questions;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */

export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const newQuestions: Question[] = [];
    const deepCopy = questions.map(
        (question: Question): Question => ({ ...question })
    );
    deepCopy.map((question: Question) => {
        if (question.id === id) {
            newQuestions.push(question);
        }
    });
    if (newQuestions.length === 1) {
        return newQuestions[0];
    } else {
        return null;
    }
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */

export function removeQuestion(questions: Question[], id: number): Question[] {
    const newQuestions: Question[] = [];
    const deepCopy = questions.map(
        (question: Question): Question => ({ ...question })
    );
    //newQuestions.filter((question: Question) => question.id === id);
    deepCopy.map((question: Question) => {
        if (question.id !== id) {
            newQuestions.push(question);
        }
    });
    return newQuestions;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */

export function getNames(questions: Question[]): string[] {
    const questionNames: string[] = [];
    questions.map((question: Question) => {
        questionNames.push(question.name);
    });
    return questionNames;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */

export function sumPoints(questions: Question[]): number {
    let sum = 0;
    questions.map((question: Question) => {
        sum = sum + question.points;
    });
    return sum;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */

export function sumPublishedPoints(questions: Question[]): number {
    let sum = 0;
    questions.map((question: Question) => {
        if (question.published === true) {
            sum = sum + question.points;
        }
    });
    return sum;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */

export function toCSV(questions: Question[]): string {
    let str = "id,name,options,points,published";
    questions.map((question: Question) => {
        str =
            str +
            "\n" +
            question.id +
            "," +
            question.name +
            "," +
            question.options.length +
            "," +
            question.points.toString() +
            "," +
            question.published;
    });
    return str;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */

export function makeAnswers(questions: Question[]): Answer[] {
    const answers: Answer[] = [];
    questions.map((question: Question) => {
        const newAnswer: Answer = {
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false
        };
        answers.push(newAnswer);
    });
    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */

export function publishAll(questions: Question[]): Question[] {
    const pubQuestions: Question[] = [];
    const deepCopy = questions.map(
        (question: Question): Question => ({ ...question })
    );
    deepCopy.map((question: Question) => {
        question.published = true;
        pubQuestions.push(question);
    });
    return pubQuestions;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */

export function sameType(questions: Question[]): boolean {
    let sameType = true;
    questions.map((question: Question) => {
        const type = questions[0].type;
        if (question.type != type) {
            sameType = false;
        }
    });
    return sameType;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */

export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    const newQuestions: Question[] = [...questions];
    newQuestions.push(makeBlankQuestion(id, name, type));
    return newQuestions;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */

export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    const newQuestions: Question[] = [];
    const deepCopy = questions.map(
        (question: Question): Question => ({ ...question })
    );
    deepCopy.map((question: Question) => {
        if (question.id === targetId) {
            question.name = newName;
            newQuestions.push(question);
        } else {
            newQuestions.push(question);
        }
    });
    return newQuestions;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */

export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const newQuestions: Question[] = [];
    const deepCopy = questions.map(
        (question: Question): Question => ({ ...question })
    );
    deepCopy.map((question: Question) => {
        if (question.id === targetId) {
            question.type = newQuestionType;
            if (newQuestionType != "multiple_choice_question") {
                question.options = [];
            }
            newQuestions.push(question);
        } else {
            newQuestions.push(question);
        }
    });
    return newQuestions;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */

export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    const newQuestions: Question[] = [];
    questions.map((question: Question) => {
        if (question.id === targetId) {
            if (targetOptionIndex === -1) {
                question = addOption(question, newOption);
                newQuestions.splice(newQuestions.length, 0, question);
            } else {
                const tquestion = {
                    ...question,
                    options: [...question.options]
                };
                tquestion.options.splice(targetOptionIndex, 1, newOption);
                newQuestions.splice(newQuestions.length, 0, tquestion);
            }
        } else {
            newQuestions.splice(newQuestions.length, 0, question);
        }
    });
    return newQuestions;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */

export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    const newQuestions: Question[] = [];
    const deepCopy = questions.map(
        (question: Question): Question => ({ ...question })
    );
    deepCopy.map((question: Question) => {
        if (question.id === targetId) {
            const nq = duplicateQuestion(newId, question);
            newQuestions.push(question);
            newQuestions.push(nq);
        } else {
            newQuestions.push(question);
        }
    });
    return newQuestions;
}