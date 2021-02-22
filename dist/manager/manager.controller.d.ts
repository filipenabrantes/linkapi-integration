import { BlingService } from 'src/bling/bling.service';
import { IDeal } from 'src/pipedrive/interfaces/deals.interface';
import { PipedriveService } from 'src/pipedrive/pipedrive.service';
import { ManagerService } from './manager.service';
export declare class ManagerController {
    private readonly pipedriveService;
    private readonly blingService;
    private readonly managerService;
    constructor(pipedriveService: PipedriveService, blingService: BlingService, managerService: ManagerService);
    PipedriveToBling(): Promise<void>;
    getAllOrders(): Promise<any[]>;
    syncAPIs(): Promise<{
        msg: string;
        error?: undefined;
        reason?: undefined;
    } | {
        error: string;
        reason: any;
        msg?: undefined;
    }>;
    insertDeal({ pedido }: any, deal: IDeal): Promise<void>;
}
