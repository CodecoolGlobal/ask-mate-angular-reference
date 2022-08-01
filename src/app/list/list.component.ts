import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../services/question.service";
import {Question} from "../entity/question";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'submissionTime', 'viewNumber', 'voteNumber'];
  dataSource: Question[] = [];

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.questions.subscribe(questions => {
      console.log('List component received questions', questions);
      this.dataSource = questions;
    });
  }

}
