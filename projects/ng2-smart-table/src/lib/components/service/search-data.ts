import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs";

import { SearchItem } from "./search-item";

export interface SearchData extends Observable<SearchItem[] | null> {
    dataSourceChange?: EventEmitter<void>;

    search(term: string): void;
    cancel(): void;
    // Implement if you need to set an initial value
    convertToItem?(data: any): SearchItem | null;
};
