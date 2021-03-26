import { Component, OnInit, Inject } from '@angular/core';
import { BookService } from './book.service';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { BookDTO } from '../../DTOs/BookDTO';
import { WordDTO } from '../../DTOs/WordDTO';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { Observable } from "rxjs";


@Component({
    selector: 'book',
    templateUrl: './book.component.html'
  })
export class BookComponent  implements OnInit { 

  public ShowLoading = false;
  public ShowLoadingWord = false;
  public ShowNoWordMessage = false;
  public bookDTOs: BookDTO[] = [];
  public wordDTOs: WordDTO[] = [];
  public searchTis = new FormControl();
  public observableTis: Observable<any>;
  public SelectedBookId: string = '';
  public SelectedBookTitle: string = '';


  constructor (
    private bookService: BookService) {

  }

  ngOnInit(): void {

    this.searchTis.setValue("");


    //with lettable operators
    this.observableTis = this.searchTis.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter((val: string) => ((val.length >= 3) && (this.SelectedBookId.length>0))),
      switchMap((search: string) => this.SearchWords(this.SelectedBookId, search)),
    );
        
    //subscribe the observable to the Tis[]
    this.observableTis.subscribe(
      (response: WordDTO[]) => {
      
        this.wordDTOs = response;
        this.ShowLoadingWord = false;

        if (this.wordDTOs.length == 0) {
          this.ShowNoWordMessage = true;
        }
        else {
          this.ShowNoWordMessage = false;
        }
      
      },
      (err: HttpErrorResponse) => {

        console.log(err);
        alert("ERROR - STATUS: " + err.status + " - MESSAGE: " + err.error);
        this.ShowLoading = false;
      
        this.ShowLoadingWord = false;
        this.ShowNoWordMessage = false;


      }); 
    


    this.ShowLoading = true;

    this.bookService.GetBooks()
    .subscribe(
      (response: BookDTO[]) => {

        if (environment.debug_mode) {
          console.log("GetBooks, response: " + JSON.stringify(response));
        }

        this.bookDTOs = response;
     
        this.ShowLoading = false;

      }
      ,
      (err: HttpErrorResponse) => {

        console.log(err);
        alert("ERROR - STATUS: " + err.status + " - MESSAGE: " + err.error);
        this.ShowLoading = false;

      });



  }

  InputTis_valuechange(event: any): void {

      this.ShowLoadingWord = false;
      this.ShowNoWordMessage = false;

      if (environment.debug_mode) {
        console.log("InputTis_valuechange: " + event.target.value)
      }

      if (this.SelectedBookId.length == 0) {
        alert("Please select a book.");
      }
      
  }

  SearchWords(id: string , query: string): any {

      this.ShowLoadingWord = true;

      return this.bookService.SearchWords(id, query);
   
  }

  SelBook(bookDTO: BookDTO): void {

    this.SelectedBookId = bookDTO.id;
    this.SelectedBookTitle = bookDTO.title;
    this.searchTis.setValue("");

    this.ShowLoadingWord = true;

    this.bookService.GetBookById(bookDTO.id)
    .subscribe(
      (response: WordDTO[]) => {

        if (environment.debug_mode) {
          console.log("GetBookById, response: " + JSON.stringify(response));
        }

        this.wordDTOs = response;
     
        this.ShowLoadingWord = false;

      }
      ,
      (err: HttpErrorResponse) => {

        console.log(err);
        alert("ERROR - STATUS: " + err.status + " - MESSAGE: " + err.error);
        this.ShowLoadingWord = false;

      });


  }


}
