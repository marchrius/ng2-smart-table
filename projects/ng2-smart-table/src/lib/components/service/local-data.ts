import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { SearchBaseData } from "../service/search-base-data";
import { SearchItem } from "../service/search-item";

export class LocalData extends SearchBaseData {

    public dataSourceChange: EventEmitter<void> = new EventEmitter<void>();

    protected _data: any[] = [];
    protected savedTerm: string | null = null;

    constructor() {
        super();
    }

    public data(data: any[] | Observable<any[]>) {
        if (data instanceof Observable) {
            const data$ = data as Observable<any[]>;
            data$
                .pipe(catchError(() => []))
                .subscribe((res) => {
                    this._data = res;
                    if (this.savedTerm) {
                        this.search(this.savedTerm);
                    }
                    this.dataSourceChange.emit();
                });
        } else {
            this._data = data;
        }

        this.dataSourceChange.emit();

        return this;
    }

    public search(term: string): void {
        if (!this._data) {
            this.savedTerm = term;
        } else {
            this.savedTerm = null;
            const matches: any[] = this.extractMatches(this._data, term);
            this.next(this.processResults(matches));
        }
    }

    public convertToItem(data: any): SearchItem | null {
        return super.convertToItem(data);
    }
}
