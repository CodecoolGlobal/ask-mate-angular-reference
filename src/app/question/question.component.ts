import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Question} from "../entity/question";
import {QuestionService} from "../services/question.service";
import {AnswerService} from "../services/answer.service";
import {Answer} from "../entity/answer";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {
  public questionId?: number;
  public question?: Observable<Question>;
  public answers?: Observable<Answer[]>;
  private subscription?: Subscription;

  constructor(private route: ActivatedRoute, private questionService: QuestionService, private answerService: AnswerService) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.questionId = +params['questionId']; // (+) converts string 'id' to a number
      console.log('In question component for question', this.questionId);
      this.loadQuestion();
      this.loadAnswers();
      this.questionService.addView(this.questionId);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public likeQuestion() {
    this.questionService.changeLikeAmount(this.questionId, 1);
  }

  public dislikeQuestion() {
    this.questionService.changeLikeAmount(this.questionId, -1);
  }

  public likeAnswer(answerId: number) {
    this.answerService.changeLikeAmount(answerId, 1);
  }

  public dislikeAnswer(answerId: number) {
    this.answerService.changeLikeAmount(answerId, -1);
  }

  private loadQuestion() {
    if (this.questionId === undefined) {
      throw 'Cannot load question with undefined ID';
    }
    this.question = this.questionService.getQuestion(this.questionId);
  }

  private loadAnswers() {
    if (this.questionId === undefined) {
      throw 'Cannot load answers with undefined ID';
    }
    this.answers = this.answerService.getAnswers(this.questionId);
  }
}
