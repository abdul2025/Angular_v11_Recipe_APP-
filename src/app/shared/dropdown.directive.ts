import { Directive,
    HostListener,
    ElementRef, Renderer2, HostBinding,
} from '@angular/core';

@Directive({ selector: '[appDropdown]' })



export class DropdownDirective {
  private isOpen = false;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }
  
  @HostListener('document:click', ['$event'])
  // @HostListener('click')


  onClick(event) {
    const dropdown = this.elementRef.nativeElement.nextElementSibling;
    // this.renderer.listen(dropdown, 'click', ()=>{
    //   console.log('safkjlk')
    // })

    const eventStatus = this.elementRef.nativeElement.contains(event.target);

    if (!this.isOpen && eventStatus) {
      this.renderer.addClass(dropdown, 'show');
    } else {
      this.renderer.removeClass(dropdown, 'show');
    }
    this.isOpen = !this.isOpen;
  }

  
}


    

