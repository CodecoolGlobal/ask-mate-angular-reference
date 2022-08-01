import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Answer} from "../entity/answer";

const ANSWER_LOCALSTORAGE_KEY = 'answers';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private $answers: BehaviorSubject<Answer[]> = new BehaviorSubject<Answer[]>([]);
  public answers: Observable<Answer[]> = this.$answers.asObservable();

  constructor(private http: HttpClient) {

    if (this.answersExistInLocalStorage()) {
      this.loadAnswersFromLocalstorage();
    } else {
      this.loadAnswersFromJson();
    }
  }

  private loadAnswersFromJson() {
    console.log('Loading answers');
    this.http.get<Answer[]>('/assets/answer.json', {responseType: 'json'}).subscribe((result: Answer[]) => {
      console.log('Loaded answers', result);
      const allAnswers = this.$answers.getValue().concat(result);
      this.$answers.next(allAnswers);
    });
  }


  private answersExistInLocalStorage(): boolean {
    return !!localStorage.getItem(ANSWER_LOCALSTORAGE_KEY);
  }


  private loadAnswersFromLocalstorage() {
    this.$answers.next(this.getAnswerArrayFromLocalstorage());
  }

  private getAnswerArrayFromLocalstorage() {
    const answers = localStorage.getItem(ANSWER_LOCALSTORAGE_KEY) || '';
    return JSON.parse(answers) as Answer[];
  }

  private persistCurrentAnswers() {
    localStorage.setItem(ANSWER_LOCALSTORAGE_KEY, JSON.stringify(this.$answers.getValue()));
  }

  private getNextId(): number {
    let currentHighestId = -1;
    for (let answer of this.$answers.getValue()) {
      if (answer.id > currentHighestId) {
        currentHighestId = answer.id;
      }
    }
    return currentHighestId + 1;
  }

  getAnswers(questionId: number): Observable<Answer[]> {
    return this.answers
      .pipe(map(values => values.filter(a => a.questionId === questionId)));
  }

  addAnswer(questionId: number, message: string) {
    const result: Answer = {
      id: this.getNextId(),
      message: message,
      questionId: questionId,
      submissionTime: Date.now(),
      voteNumber: 0
    };
    this.$answers.next(this.$answers.getValue().concat(result));
    this.persistCurrentAnswers();
  }

  changeLikeAmount(answerID: number | undefined, amount: number) {

    let answers = this.$answers.getValue();
    for (let answer of answers) {
      if (answer.id === answerID) {
        answer.voteNumber += amount;
      }
    }
    this.$answers.next(answers);
    this.persistCurrentAnswers();
  }
}
