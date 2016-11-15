export class ModalService {
    modal: any;

    constructor() {
    }

    initModal(modalEl: HTMLElement) {
        this.modal = modalEl;
    }
}