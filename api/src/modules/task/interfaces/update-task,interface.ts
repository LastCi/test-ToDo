export interface IUpdateTask {
    uuid: string;
    title?: string;
    description?: string | null;
    priority?: string;
    status?: string;
    endDate?: Date;
}
