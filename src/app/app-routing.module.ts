import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./list/list.component";
import {QuestionComponent} from "./question/question.component";
import {AddQuestionComponent} from "./add-question/add-question.component";
import {AddAnswerComponent} from "./add-answer/add-answer.component";

const routes: Routes = [
  {path: 'list', pathMatch: 'full', component: ListComponent},
  {path: 'question/:questionId', pathMatch: 'full', component: QuestionComponent},
  {path: 'add-question', pathMatch: 'full', component: AddQuestionComponent},
  {path: 'question/:questionId/new-answer', pathMatch: 'full', component: AddAnswerComponent},
  {path: '', pathMatch: 'prefix', redirectTo: 'list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
