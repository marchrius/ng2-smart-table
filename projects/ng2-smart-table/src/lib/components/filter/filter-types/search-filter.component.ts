import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { DefaultFilter } from './default-filter';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'search-filter',
  template: `
    <ng-select [items]="column.getFilterConfig().search.data"
                bindLabel="title"
                bindValue="value"
                [(ngModel)]="query"
                [placeholder]="column.getFilterConfig().search.placeholder || 'Start typing...'"
                [minTermLength]="column.getFilterConfig().search.minSearchLength || 0"
                (change)="searchContent.next($event)">
    </ng-select>
  `,
})
export class SearchFilterComponent extends DefaultFilter implements OnInit {

  searchContent = new Subject<any>();

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit() {
    const config = this.column.getFilterConfig().search;
    config.dataService = this.searchService.local(config.data, config.searchFields, config.titleField);
    config.dataService.descriptionField(config.descriptionField);

    this.changesSubscription = this.searchContent
      .pipe(
        map((ev: any) => (ev && ev.title) || ev || ''),
        distinctUntilChanged(),
        debounceTime(this.delay)
      )
      .subscribe((search: string) => {
        this.query = search;
        this.setFilter();
      });
  }

  inputTextChanged(event: string) {
    // workaround to trigger the search event when the home/end buttons are clicked
    // when this happens the [(ngModel)]="query" is set to "" but the (selected) method is not called
    // so here it gets called manually
    if (event === '') {
      this.searchContent.next(event);
    }
  }
}
