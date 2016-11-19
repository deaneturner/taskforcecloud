export class ModalService {
    modal: any;

    constructor() {
        this.modal = 'TEMP';
    }

    initModal(modalEl: HTMLElement) {
        this.modal = modalEl;
    }
}