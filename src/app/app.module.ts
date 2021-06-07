import { VisitaModule } from './visita/visita.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing-module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './authentication/auth-guard ';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './authentication/auth-interceptor';
import { AuthenticationService } from './authentication/authentication.service';

import { MessageService } from './shared/service/responses-messages.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ConfirmDialogComponent } from './chamadas/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogRendaComponent } from './produca/components/confirm-dialog-renda/confirm-dialog-renda.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    ConfirmDialogRendaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AuthenticationModule,
    VisitaModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    
    AppRoutingModule,
],
  exports: [
    RouterModule
],
  providers: [
    AuthenticationService,
    MessageService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
