import { IParent } from 'app/shared/model//parent.model';

export interface IPermission {
    id?: number;
    name?: string;
    parent?: IParent;
}

export class Permission implements IPermission {
    constructor(public id?: number, public name?: string, public parent?: IParent) {}
}
