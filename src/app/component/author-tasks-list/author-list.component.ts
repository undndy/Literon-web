import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api-service.service';
import { Author } from 'src/app/models/Author';
import {ActivatedRoute, Router} from "@angular/router";
import {Poem} from "../../models/Poem";
import {PoemServiceService} from "../../service/poem-service.service";
import {User} from "../../models/User";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors: Author[];
  authorsByClick: Author[];
  poems: Poem[];
  poemName: Poem;
  user: User;
  constructor(private api: ApiService,
              private apiPoem: PoemServiceService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.viewAuthors();

  }

  goToAuthor(index: number){
    this.viewAuthorsByClick(index)
  }

  viewAuthorsByClick(index: number){
    this.api.getAuthorById(parseInt(String(index + 1))).subscribe(data => {
      this.authorsByClick = data;
    });
    this.router.navigate(['/biograph/'+index]);
  }

  viewAuthors(){
    this.api.getAuthors().subscribe(data => {
      this.authors = data;
    });
  }
}
