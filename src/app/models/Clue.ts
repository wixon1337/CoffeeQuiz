import { Category } from './Category';

export class Clue {
    public id: number;
    public question: string;
    public answer: string;
    public airdate: string;
    public category: Category;
    public value: number;

    constructor(
        id: number,
        question: string,
        answer: string,
        airdate: string,
        category: Category,
        value: number) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.airdate = airdate;
        this.category = category;
        this.value = value;
    }
}
