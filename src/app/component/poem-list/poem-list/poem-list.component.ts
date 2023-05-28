import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api-service.service';
import { Poem } from 'src/app/models/Poem';
import { Router } from '@angular/router';
import {Author} from "../../../models/Author";
import {PoemServiceService} from "../../../service/poem-service.service";

@Component({
  selector: 'app-poem-list',
  templateUrl: './poem-list.component.html',
  styleUrls: ['./poem-list.component.css']
})
export class PoemListComponent implements OnInit {
  authorId: number;
  poemId: number;
  poems: Poem[];
  authors: Author[];

  constructor(private route: ActivatedRoute,
              private api: PoemServiceService,
              private apiAuthor: ApiService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.poemId = parseInt(params['poemId']);
    });
    this.route.queryParams.subscribe(qpar => {
      this.authorId = parseInt(qpar['id']);
    });
    this.viewAuthors();
    this.getPoemById(this.poemId);
  }

  viewAuthors(){
    this.apiAuthor.getAuthorById(this.authorId).subscribe((data) => {
      this.authors = Array(data);
    });
  }

  getPoemById(id: number){
    this.api.getPoemsById(id).subscribe((data) => {
      this.poems = Array(data);
    })
  }

  goToTaskPage(poemId: number) {
    this.router.navigate(['/tasks/' + poemId], {
      queryParams: {id: this.authorId}
    });
  }
  goToTeacherTaskPage(poemId: number) {
    this.router.navigate(['/tasks/' + poemId + '/teacher'], {
      queryParams: {id: this.authorId}
    });
  }
}
