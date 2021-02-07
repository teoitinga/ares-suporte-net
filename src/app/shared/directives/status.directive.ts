import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStatus]'
})
export class StatusDirective  implements OnInit {

 
  constructor(private _elemento: ElementRef) { }

  public ngOnInit() {
    this.mudarFundo();
    }
    
    private mudarFundo(cor: string = 'yellow') {
      this._elemento.nativeElement.style.backgroundColor = 'red';
    }
}
