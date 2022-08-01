import {Injectable} from '@angular/core';
import {BehaviorSubject, concatMap, filter, Observable} from "rxjs";
import {Question} from "../entity/question";
import {HttpClient} from "@angular/common/http";
import {AddQuestionDto} from "../entity/add-question-dto";

const QUESTION_LOCALSTORAGE_KEY = 'questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private $questions: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
  public questions: Observable<Question[]> = this.$questions.asObservable();

  constructor(private http: HttpClient) {
    if (this.questionsExistInLocalStorage()) {
      this.loadQuestionsFromLocalstorage();
    } else {
      this.loadQuestionsFromJson();
    }
  }

  private loadQuestionsFromJson() {
    console.log('Loading questions');
    this.http.get<Question[]>('/assets/question.json', {responseType: 'json'}).subscribe((result: Question[]) => {
      console.log('Loaded questions', result);
      localStorage.setItem(QUESTION_LOCALSTORAGE_KEY, JSON.stringify(result));
      this.loadQuestionsFromLocalstorage();
    });
  }

  private questionsExistInLocalStorage(): boolean {
    return !!localStorage.getItem(QUESTION_LOCALSTORAGE_KEY);
  }


  private loadQuestionsFromLocalstorage() {
    this.$questions.next(this.getQuestionArrayFromLocalstorage());
  }

  private getQuestionArrayFromLocalstorage() {
    const questions = localStorage.getItem(QUESTION_LOCALSTORAGE_KEY) || '';
    return  JSON.parse(questions) as Question[];
  }

  private persistCurrentQuestions() {
    localStorage.setItem(QUESTION_LOCALSTORAGE_KEY, JSON.stringify(this.$questions.getValue()));
  }

  getQuestion(questionId: number): Observable<Question> {
    return this.questions
      .pipe(concatMap(values => values))
      .pipe(filter(q => q.id === questionId));
  }

  addQuestion(questionDto: AddQuestionDto): Question {
    const result: Question = {
      id: this.getNextId(),
      title: questionDto.title || '',
      message: questionDto.message || '',
      submissionTime: Date.now(),
      viewNumber: 0,
      voteNumber: 0
    }
    this.$questions.next(this.$questions.getValue().concat(result));
    this.persistCurrentQuestions();
    return result;
  }

  private getNextId(): number {
    let currentHighestId = -1;
    for (let question of this.$questions.getValue()) {
      if (question.id > currentHighestId) {
        currentHighestId = question.id;
      }
    }
    return currentHighestId + 1;
  }

  addView(questionId: number) {
    let questions = this.$questions.getValue();
    for (let question of questions) {
      if (question.id === questionId) {
        question.viewNumber++;
      }
    }
    this.$questions.next(questions);
    this.persistCurrentQuestions();
  }

  changeLikeAmount(questionId: number | undefined, amount: number) {
    let questions = this.$questions.getValue();
    for (let question of questions) {
      if (question.id === questionId) {
        question.voteNumber += amount;
      }
    }
    this.$questions.next(questions);
    this.persistCurrentQuestions();
  }
}
