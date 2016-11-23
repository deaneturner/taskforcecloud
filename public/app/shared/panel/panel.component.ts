import { Component, ViewEncapsulation, Input } from '@angular/core';

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
    @Input() showFullscreen: boolean = false;
    @Input() menu: Array<any> = [];

    showDropdown: boolean = false;

    ngOnInit(): void {
        this.showDropdown = this.menu.length > 0;
    }
}
