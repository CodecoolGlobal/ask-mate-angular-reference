import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {QuestionService} from "../services/question.service";
import {Question} from "../entity/question";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'submissionTime', 'viewNumber', 'voteNumber'];
  @ViewChild(MatSort) sort: MatSort | null = null;
  dataSource: MatTableDataSource<Question> = new MatTableDataSource();

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.questions.subscribe(questions => {
      console.log('List component received questions', questions);
      this.dataSource.data = questions;
    });
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
