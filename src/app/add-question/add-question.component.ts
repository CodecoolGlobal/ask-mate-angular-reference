import {Component, OnInit} from '@angular/core';
import {AddQuestionDto} from "../entity/add-question-dto";
import {QuestionService} from "../services/question.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  model = new AddQuestionDto(undefined, undefined);

  constructor(private questionService: QuestionService, private router: Router) {
  }

  ngOnInit(): void {
  }


  onSubmit() {
    console.log('Submit form');
    if (!this.model.title || !this.model.message) {
      console.log('Title or message missing', this.model);
      return;
    }
    let question = this.questionService.addQuestion(this.model);
    this.router.navigate(['/question', question.id]);

  }

}
