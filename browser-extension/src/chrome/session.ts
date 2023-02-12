import {IStorageService} from "./StorageService";

export class Session {
	constructor(protected host: string, public storageService: IStorageService, ) {
	}
}
