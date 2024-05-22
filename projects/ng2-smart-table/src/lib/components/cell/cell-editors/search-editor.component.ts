import { Component, OnInit } from '@angular/core';

import { DefaultEditor } from './default-editor';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'search-editor',
  template: `
    <ng-select [items]="cell.getColumn().getConfig().search.data"
                bindLabel="title"
                bindValue="value"
                [(ngModel)]="searchStr"
                [placeholder]="cell.getColumn().getConfig().search.placeholder || 'Start typing...'"
                [minTermLength]="cell.getColumn().getConfig().search.minSearchLength || 0"
                (change)="onEditedSearch($event)">
    </ng-select>
    `,
})
export class SearchEditorComponent extends DefaultEditor implements OnInit {

  searchStr: string = '';

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit() {
    if (this.cell.getColumn().editor && this.cell.getColumn().editor.type === 'search') {
      const config = this.cell.getColumn().getConfig().search;
      config.dataService = this.searchService.local(config.data, config.searchFields, config.titleField);
      config.dataService.descriptionField(config.descriptionField);
    }
  }

  onEditedSearch(event: { title: '' }): boolean {
    this.cell.newValue = event.title;
    return false;
  }
}
