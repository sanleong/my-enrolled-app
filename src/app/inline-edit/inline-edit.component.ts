import { Component, Input, Optional, Host } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'inline-edit',
  styleUrls: ['inline-edit.component.scss'],
  template: `
    <form (ngSubmit)="onSubmit()">
      <div class="mat-subheading-2">Add a comment</div>

      <mat-form-field>
        <input matInput maxLength="80" name="name" [(ngModel)]="name">
        <mat-hint align="end">{{name?.length || 0}}/140</mat-hint>
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">CANCEL</button>
        <button mat-button type="submit" color="primary">SAVE</button>
      </div>
    </form>
  `
})
export class InlineEditComponent {

  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.name = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  name = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.name = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.name);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }
}
