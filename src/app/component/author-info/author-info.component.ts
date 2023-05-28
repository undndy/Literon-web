import { Component, OnInit } from '@angular/core';
import {Author} from "../../models/Author";
import {ApiService} from "../../service/api-service.service";
import {Poem} from "../../models/Poem";
import {ActivatedRoute, Router} from "@angular/router";
import {PoemServiceService} from "../../service/poem-service.service";
import {ChronographServiceService} from "../../service/chronograph-service.service";
import {Chronograph} from "../../models/Chronograph";

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.css']
})
export class AuthorInfoComponent implements OnInit {

  authors: Author[];
  poemsByAuthor: Poem[];
  authorId: number;

  chronos: Chronograph[];

  constructor(private api: ApiService,
              private apiPoem: PoemServiceService,
              private apiChrono: ChronographServiceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.authorId = parseInt(params['id'])+1;
    });
    // console.log(this.route.params)
    this.viewAuthors();
    this.getChronosByAuthor();

  }

  viewAuthors(){
    this.api.getAuthorById(this.authorId).subscribe((data) => {
      this.authors = Array(data);
    });
    this.getPoemsByAuthor();
  }

  getPoemsByAuthor(){
      this.apiPoem.getPoemsByAuthor(this.authorId).subscribe((data) => {
        this.poemsByAuthor = data;
      });
  }

  getChronosByAuthor(){
    this.apiChrono.getChrono(this.authorId).subscribe((data) => {
      this.chronos = data
    })
  }

  goToPoemPage(index: number){
    this.router.navigate(['/poem/' + index],{
      queryParams: { id: this.authorId }
    });
  }

}
