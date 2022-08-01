# AskMateAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.4.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Task Description
Your next big task is to implement a crowdsourced Q&A site, similar to Stack Overflow.

The initial version of the site must be able to handle questions and answers. There is no need for additional functionality, such as user management or comments for questions and answers. Questions and answers will not be persisted in some sort of back-end, but only locally.

## Tasks
### List Questions
Implement the /list page that displays all questions.
1. There is a list component available under /list.
2. The data is loaded and displayed from question.json.
3. The questions are sorted by most recent.

### Display a question
Create the /question/<question_id> page that displays a question and the answers for it.
1. There is a question component available under /question/<question_id>.
2. There are links to the question pages from the list page.
3. Answers are loaded from answer.json and relevant answers are presented.
4. The page displays the question title and message.
5. The page displays all answers to a question.

### Ask a question
Implement a form that allows the user to add a question.
1. There is an /add-question page with a form.
2. The page is linked from the list page.
3. The newly created question will be stored in the browser.
4. After submitting, the detail page of the newly created question is opened.

### Post an answer
Implement posting a new answer.
1. The page URL is /question/<question_id>/new-answer.
2. The question detail page links to the page.
3. There is a form for creating a new answer, which is stored in the browser.
4. Posting an answer redirects to the detail page of the answered question.

### Sort questions
Implement sorting for the question list.
1. The question list can be sorted by title, submission time, message, number of views, and number of votes.
2. The question list can be put in ascending and descending order.
3. The sorting is done client side

### Vote on questions
Implement voting on questions.
1. Vote numbers are displayed next to questions on the question list page.
2. There are "vote up/down" links next to questions on the question list page.
3. Voting up increases, voting down decreases the vote_number of the question by one.
4. Voting does not change the current page and updates the vote_number immediately on the client.

### Vote on answers
Implement voting on answers.
1. Vote numbers are displayed next to answers on the question detail page.
2. There are "vote up/down" links next to answers.
3. Voting up increases, voting down decreases the vote_number of the answer by one.
4. Voting does not change the current page and updates the vote_number immediately on the client.

## General requirements
Loading, storing and updating of data should not be done in Angular Components, but in Services.

## Hints
For using different components on different paths, use Angular’s routing module.
Create forms using Angular’s template driven forms.
