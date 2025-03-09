export interface ICreateTask {
    title: string;
    description?: string;
    priority: string;
    status: string;
    creatorId: string;
    responsibleId: string;
    endDate: Date;
}
