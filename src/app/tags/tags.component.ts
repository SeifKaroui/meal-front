import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tags',
  imports: [CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent {
  @Input({ required: true }) category!: string;
  @Input({ required: true }) tags!: string | null;
}
