import { Injectable } from "@angular/core";

import { LocalData } from "./local-data";

@Injectable()
export class LocalDataFactory {
    public create() {
        return new LocalData();
    }
}
