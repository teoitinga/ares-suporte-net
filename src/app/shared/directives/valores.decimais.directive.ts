import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MascaraDirective } from '../diretives/mascara.directive';

@Directive({
  selector: '[decimal]',
  providers: [{
    provide: NG_VALUE_ACCESSOR, 
    useExisting: MascaraDirective, 
    multi: true 
  }]
})
export class ValoresDecimaisDirective implements ControlValueAccessor{

  onTouched: any;
  onChange: any;

  constructor(private el: ElementRef) { }

  writeValue(value: any) {

  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event']) 
  onKeyup($event: any) {
    let valor = $event.target.value.replace(/\D/g, '');
    console.log('Teste')
    console.log(valor)
  }

  @HostListener('blur', ['$event']) 
  onBlur($event: any) {

  }

}
