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
    @Input() collapsible: boolean = false;
    @Input() collapsed: boolean = false;
    @Input() showReload: boolean = false;
    @Input() showClose: boolean = false;
    @Input() showFullscreen: boolean = false;
    @Input() menu: Array<any> = [];

    showDropdown: boolean = false;
    chevron = <any>{
        collapsed: this.collapsed,
        toggle: function () {
            this.collapsed = !this.collapsed;
        }
    };

    ngOnInit(): void {
        if (this.menu && this.menu.length > 0) {
            this.showDropdown = true;
        } else {
            this.showDropdown = false;
        }
    }
}
