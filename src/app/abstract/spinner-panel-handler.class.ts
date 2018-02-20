import { Message } from 'primeng/components/common/api';

export abstract class SpinnerPanelHandler {

    private msgs: Message[] = [];
    private showPanel: boolean;
    private showSpinner: boolean;

    handleInit( ) {
        this.showPanel = false;
        this.showSpinner = false;
    }

    handleStart() {
        this.showPanel = false;
        this.showSpinner = true;
    }

    handleSuccess() {
        this.showSpinner = false;
        this.showPanel = true;
    }

    handleError(summary: string, errormsg: any) {
        console.log(errormsg);
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: summary, detail: errormsg });
        this.showSpinner = false;
        this.showPanel = false;
    }
}
