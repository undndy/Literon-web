import { Component, OnInit } from '@angular/core';
import { Author } from "../../models/Author";
import { Poem } from "../../models/Poem";
import {ActivatedRoute, Router} from "@angular/router";
import { ApiService } from "../../service/api-service.service";
import { PoemServiceService } from "../../service/poem-service.service";
import { TaskServiceService } from "../../service/task-service.service";
import { Task } from "../../models/Task";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {parse} from "@angular/compiler/src/render3/view/style_parser";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-task-teacher',
  templateUrl: './task-teacher.component.html',
  styleUrls: ['./task-teacher.component.css']
})
export class TaskTeacherComponent implements OnInit {
  authorId: number = 0;
  poemId: number = 0;
  task: Task[];
  authors: Author[];
  poems: Poem[];
  form: FormGroup;
  questionTypes: string[] = ['Варианты', 'Текст', 'Тип 3']; // Замените на актуальные типы
  userId: number;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private apiPoem: PoemServiceService,
    private apiTask: TaskServiceService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      questions: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.poemId = parseInt(params['taskId']);
    });
    this.route.queryParams.subscribe(params => {
      this.authorId = parseInt(params['id']);
    });
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.userId = data.id;
      })
    this.getAuthorById();
    this.getPoemById();
    this.getTaskToPoem();

    this.addQuestion();
  }

  getTaskToPoem() {
    this.apiTask.getTasksByPoem(this.poemId, this.userId).subscribe(data => {
      this.task = Array(data);
    });
  }

  getPoemById() {
    this.apiPoem.getPoemsById(this.poemId).subscribe(data => {
      this.poems = Array(data);
    });
  }

  getAuthorById() {
    this.api.getAuthorById(this.authorId).subscribe(data => {
      this.authors = Array(data);
    });
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  createQuestion(): FormGroup {
    return this.formBuilder.group({
      type: [''],
      text: [''],
      optionText: [''],
      question1: [''],
      question2: [''],
      question3: ['']
    });
  }

  addQuestion(): void {
    const question = this.createQuestion();
    this.questions.push(question);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  onQuestionTypeChange(question: FormGroup): void {
    const questionType = question.get('type')?.value;

    if (questionType === 'Варианты') {
      question.get('question1')?.setValidators(Validators.required);
      question.get('question2')?.setValidators(Validators.required);
      question.get('question3')?.setValidators(Validators.required);
    } else {
      question.get('question1')?.clearValidators();
      question.get('question2')?.clearValidators();
      question.get('question3')?.clearValidators();
    }

    question.get('question1')?.updateValueAndValidity();
    question.get('question2')?.updateValueAndValidity();
    question.get('question3')?.updateValueAndValidity();
  }

  submit(): void {
    if (this.form.valid) {
      // Получение данных из формы
      const formData = this.form.value;
      // console.log(formData)
      // Отправка данных на бэкэнд
      this.apiTask.createTasks(formData.questions, this.poemId, this.userId).subscribe(
        response => {
          // console.log(response)
          // Обработка успешного ответа от бэкэнда
          console.log('Задачи успешно созданы');
          // Дополнительные действия после успешного создания задач

          this.router.navigate(['/poem/' + this.poemId], {
            queryParams: {id: this.authorId}
          });
        },
        error => {
          // Обработка ошибки
          console.error('Ошибка при создании задач', error);
        }
      );
    } else {
      // Отображение сообщений об ошибках
    }
  }
}
