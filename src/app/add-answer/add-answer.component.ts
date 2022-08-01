import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../services/question.service";
import {AnswerService} from "../services/answer.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss']
})
export class AddAnswerComponent implements OnInit {
  private subscription?: Subscription;
  private questionId?: number;
  answerText?: string;

  constructor(private route: ActivatedRoute, private router: Router, private questionService: QuestionService, private answerService: AnswerService) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.questionId = +params['questionId']; // (+) converts string 'id' to a number
    });
  }

  onSubmit() {
    if (this.questionId === undefined || this.answerText === undefined) {
      console.log('Question ID or answer text are undefined when answering a question',
        this.questionId, this.answerText);
      return;
    }
    this.answerService.addAnswer(this.questionId, this.answerText);
    this.router.navigate(['/question', this.questionId]);

  }
}
