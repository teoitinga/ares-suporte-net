import { MessageService } from 'src/app/shared/service/responses-messages.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private _snackBar: MatSnackBar
  ){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
   
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '.concat(token))
      });

      return next.handle(cloned)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
            this.messageService.sendError(this._snackBar, `Erro ${error.status}`, error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
            this.messageService.sendError(this._snackBar, `Erro ${error.status}`, error.error);
          }
  
          // If you want to return a new response:
          //return of(new HttpResponse({body: [{name: "Default value..."}]}));
  
          // If you want to return the error on the upper level:
          //return throwError(error);
  
          // or just return nothing:
          return EMPTY;
        })
      );
      /////////fim do return
      ;
    } else {
      return next.handle(req);
    }
  }
}