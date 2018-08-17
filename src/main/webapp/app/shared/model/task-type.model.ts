import { ITask } from 'app/shared/model//task.model';

export interface ITaskType {
    id?: number;
    name?: string;
    priority?: number;
    tasks?: ITask[];
}

export class TaskType implements ITaskType {
    constructor(public id?: number, public name?: string, public priority?: number, public tasks?: ITask[]) {}
}
