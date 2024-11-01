import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BuisnessEntity } from '../models/buisness-entity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buisness-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buisness-card.component.html',
  styleUrl: './buisness-card.component.css',
})
export class BuisnessCardComponent {
  @Input() buis_entity: BuisnessEntity = new BuisnessEntity();
  buis_entity_form: BuisnessEntity = new BuisnessEntity();

  @Output() updateEvent = new EventEmitter<BuisnessEntity>();
  @Output() deleteEvent = new EventEmitter<void>();

  ngOnInit() {
    this.buis_entity_form = structuredClone(this.buis_entity);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.buis_entity = changes['buis_entity'].currentValue;
    this.buis_entity_form = structuredClone(this.buis_entity);
  }

  updateEntity() {
    this.updateEvent.emit(this.buis_entity_form);
  }

  deleteEntity() {
    this.deleteEvent.emit();
  }
}
