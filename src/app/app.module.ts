import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FatherComponent } from './father/father.component';
import { SonComponent } from './son/son.component';
import { FormsModule } from '@angular/forms';
import { HermanoComponent } from './hermano/hermano.component';
import { SiblingsStyleDirective } from './siblings-style.directive';
import { MyCustomPipePipe } from './my-custom-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FatherComponent,
    SonComponent,
    HermanoComponent,
    SiblingsStyleDirective,
    MyCustomPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
