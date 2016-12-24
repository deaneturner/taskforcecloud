import { Directive, Input } from '@angular/core';
declare var jQuery: any;

@Directive({
    selector: '[panel-widget]',
})

export class PanelDirective {
    @Input() collapsed: boolean;

    render(): void {
        jQuery.fn.widgster.Constructor.DEFAULTS.bodySelector = '.widget-body';

        let $widgets = jQuery('.widget'),
            $panelWidget = jQuery('#panel-widget');

        /**
         * turn off .content-wrap transforms & disable sorting when widget fullscreened
         */
        $widgets.on('fullscreen.widgster', () => {
            jQuery('.content-wrap').css({
                '-webkit-transform': 'none',
                '-ms-transform': 'none',
                transform: 'none',
                'margin': 0,
                'z-index': 2
            });
            // prevent widget from dragging when fullscreened
            jQuery('.widget-container').sortable('option', 'disabled', true);
        }).on('restore.widgster closed.widgster', () => {
            jQuery('.content-wrap').css({
                '-webkit-transform': '',
                '-ms-transform': '',
                transform: '',
                margin: '',
                'z-index': ''
            });
            jQuery('body').css({
                'overflow-y': 'scroll'
            });
            // allow dragging back
            jQuery('.widget-container').sortable('option', 'disabled', false);
        });

        /**
         * Use custom loader template
         */
        $panelWidget.widgster({
            loaderTemplate: '<div class="loader animated fadeIn">' +
            '   <span class="spinner"><i class="fa fa-spinner fa-spin"></i></span>' +
            '</div>',
            collapsed: this.collapsed
        });

        /**
         * Init all other widgets with default settings & settings retrieved from data-* attributes
         */
        $widgets.widgster();

        /**
         * Init tooltips for all widget controls on page
         */
        // jQuery('.widget-controls > a').tooltip({placement: 'bottom'});
    }

    ngOnInit(): void {
        this.render();
    }
}
