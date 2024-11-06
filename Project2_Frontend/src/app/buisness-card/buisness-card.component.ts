import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BuisnessEntity } from '../models/buisness-entity';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buisness-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './buisness-card.component.html',
  styleUrl: './buisness-card.component.css',
})
export class BuisnessCardComponent {
  //want business entity from report detail/create report pages
  @Input() buis_entity: BuisnessEntity = new BuisnessEntity();
  buis_entity_form: BuisnessEntity = new BuisnessEntity();

  //output when business should update in the BE and when it should be deleted in the BE
  @Output() updateEvent = new EventEmitter<BuisnessEntity>();
  @Output() deleteEvent = new EventEmitter<void>();

  ngOnInit() {
    this.buis_entity_form = structuredClone(this.buis_entity);
  }

  //need to refresh data after parent sends data
  ngOnChanges(changes: SimpleChanges) {
    this.buis_entity = changes['buis_entity'].currentValue;
    this.buis_entity_form = structuredClone(this.buis_entity);
  }
 
  //emit function for update event
  updateEntity() {
    this.updateEvent.emit(this.buis_entity_form);
  }

  //emit function for delete event
  deleteEntity() {
    this.deleteEvent.emit();
  }

  //reset the business form
  resetForm() {
    this.buis_entity_form = structuredClone(this.buis_entity);
  }
}
