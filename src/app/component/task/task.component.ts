import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from 'src/app/service/api-service.service';
import {PoemServiceService} from "../../service/poem-service.service";
import {TaskServiceService} from "../../service/task-service.service";
import {Author} from "../../models/Author";
import {Poem} from "../../models/Poem";
import {Task} from "../../models/Task";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-create-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  authorId: number = 0;
  poemId: number = 0;
  tasks: Task[];
  authors: Author[];
  poems: Poem[];
  userId: number;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private apiPoem: PoemServiceService,
              private apiTask: TaskServiceService,
              private userService: UserService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log(params)
      this.poemId = parseInt(params['taskId']);
    });
    // console.log(this.route.params)
    this.route.queryParams.subscribe(params => {
      // console.log(params)
      this.authorId = parseInt(params['id']);
    });
    this.getAuthorById();
    this.getPoemById();

    this.userService.getCurrentUser()
      .subscribe(data => {
        this.userId = data.id;
        this.getTaskToPoem();
      });
  }

  getTaskToPoem(){
    return this.apiTask.getTasksByPoem(this.poemId, this.userId).subscribe(data => {
      this.tasks = Array(data);
      this.changeDetectorRef.detectChanges();
    });
  }

  getPoemById(){
    this.apiPoem.getPoemsById(this.poemId).subscribe(data => {
      this.poems = Array(data);
    })
  }

  getAuthorById(){
    this.api.getAuthorById(this.authorId).subscribe(data => {
      this.authors = Array(data);
    });
  }

  goToPdfPage(taskId: number) {
    this.router.navigate(['/tasks/' + taskId + '/pdf']);
  }
}
