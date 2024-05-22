import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { LocalData } from "./local-data";
import { LocalDataFactory } from "./local-data-factory";

@Injectable()
export class SearchService {
    constructor(
        private localDataFactory: LocalDataFactory, // Using any instead of () => LocalData because of AoT errors
    ) { }

    public local(
        data: any[] | Observable<any>,
        searchFields: string | null = "",
        titleField: string | null = ""
    ): LocalData {

        const localData = this.localDataFactory.create();
        return localData
            .data(data)
            .searchFields(searchFields)
            .titleField(titleField);
    }

    public remote(url: string | null, searchFields: string | null = "", titleField: string | null = ""): any {
      throw new Error("Method not implemented.");
    }
}
