import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BuisnessEntity } from '../models/buisness-entity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buisness-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buisness-card.component.html',
  styleUrl: './buisness-card.component.css'
})
export class BuisnessCardComponent {
  @Input() buis_entity: BuisnessEntity = new BuisnessEntity(0,0,'','','','','','');

  @Output() updateEvent = new EventEmitter<BuisnessEntity>();
  @Output() deleteEvent = new EventEmitter<void>();

  updateEntity(){
    this.updateEvent.emit(this.buis_entity);
  }

  deleteEntity(){
    this.deleteEvent.emit();
  }
}