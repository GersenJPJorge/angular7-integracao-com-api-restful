import { 
  Directive, 
  HostListener, 
  Input, 
  ElementRef 
} from '@angular/core';
import { 
  NG_VALUE_ACCESSOR, ControlValueAccessor 
} from '@angular/forms';

@Directive({
  selector: '[mascara]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,               // tem acesso ao campo de texto            
    useExisting: MascaraDirective, 
    multi: true 
  }]
})
export class MascaraDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  @Input('mascara') mascara: string;

  constructor(private el: ElementRef) { }    // elementref é o campo de texto

  writeValue(value: any) {        // quando a página carrega e tiver campos com edição de dados é o primeiro método a ser carregado
    if (value) {
      this.el.nativeElement.value = this.aplicarMascara(value);  // el.nativeElement.value é o campo de input-text
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event']) 
  onKeyup($event: any) {                                         // sempre que eu pressionar uma tecle e solte, valide.
    let valor: string = $event.target.value.replace(/\D/g, '');

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    let pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');   // separação através de expressões regulares, pegando só o que necessita
    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    $event.target.value = this.aplicarMascara(valor);
  }

  @HostListener('blur', ['$event'])                           // se o campo estiver mal formatado, ele limpa o campo
  onBlur($event: any) {
    if ($event.target.value.length === this.mascara.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }

  aplicarMascara(valor: string): string {
    valor = valor.replace(/\D/g, '');
    let pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    let valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;
    
    valor = '';
    for (let i = 0; i < this.mascara.length; i++) {
      if (isNaN(parseInt(this.mascara.charAt(i)))) {
        valor += this.mascara.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }
    
    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    return valor;
  }

}




