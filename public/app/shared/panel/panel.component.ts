import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'tfc-panel',
    templateUrl: './panel.template.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panel.style.scss']
})
export class PanelComponent {
    @Input() title: string;
    @Input() iconClass: Array<string>[];
    @Input() collapsed: boolean = false;
    @Input() showReload: boolean = false;
    @Input() showClose: boolean = false;
    @Input() showFullscreen: boolean = true;
    @Input() showDropdown: boolean = false;

    @Output() onMenuSelect = new EventEmitter<string>();

    ngOnInit(): void {

    }

    onDropdownSelect(menuItem: string) {
        this.onMenuSelect.emit(menuItem);
    }
}
