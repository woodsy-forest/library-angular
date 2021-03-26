import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BookRoutingModule } from './book-routing.module';
import { SpinnerModule } from '../spinner/spinner.module';
import { FlexLayoutModule } from '@angular/flex-layout';

//Conponents
import { BookComponent } from './book.component';


//Services
import { BookService } from './book.service';


@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookRoutingModule,
    SpinnerModule,
    FlexLayoutModule
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
