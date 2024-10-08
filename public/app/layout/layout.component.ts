import { Component,
    ViewEncapsulation, ElementRef, ViewChild, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppState } from '../app.service';
import { AppConfig } from '../app.config';

import { MessageBusService } from '../services/message.bus.service';
import { ModalComponent } from '../shared/modal-window/modal.component';

declare var jQuery: any;
declare var Hammer: any;

@Component({
    selector: 'tfc-cmp-layout',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './layout.template.html'
})
export class LayoutComponent implements OnInit {
    @HostBinding('class.nav-static') navStatic;
    @HostBinding('class.chat-sidebar-opened') chatOpened: boolean = false;
    @HostBinding('class.app') true;
    @HostBinding('id') string = 'tfc-cmp-app';
    config: any;
    configFn: any;
    $sidebar: any;
    el: ElementRef;
    router: Router;

    @ViewChild(ModalComponent)
    modalComponent: ModalComponent;

    constructor(appConfig: AppConfig,
                el: ElementRef,
                router: Router,
                private appState: AppState,
                private messageBusService: MessageBusService) {
        this.el = el;
        this.config = appConfig.getConfig();
        this.navStatic = this.config.state['nav-static'];
        this.configFn = appConfig;
        this.router = router;
    }

    toggleSidebarListener(state): void {
        let toggleNavigation = state === 'static'
            ? this.toggleNavigationState
            : this.toggleNavigationCollapseState;
        toggleNavigation.apply(this);
        localStorage.setItem('nav-static', this.config.state['nav-static']);
    }

    toggleChatListener(): void {
        jQuery(this.el.nativeElement).find('.chat-notification-sing').remove();
        this.chatOpened = !this.chatOpened;

        setTimeout(() => {
            // demo: add class & badge to indicate incoming messages from contact
            // .js-notification-added ensures notification added only once
            jQuery('.chat-sidebar-user-group:first-of-type ' +
                '.list-group-item:first-child:not(.js-notification-added)')
                .addClass('active js-notification-added')
                .find('.fa-circle')
                .after('<span class="badge tag-danger ' +
                    'pull-right animated bounceInDown">3</span>');
        }, 1000);
    }

    toggleNavigationState(): void {
        this.config.state['nav-static'] = !this.config.state['nav-static'];
        if (!this.config.state['nav-static']) {
            this.collapseNavigation();
        }
    }

    expandNavigation(): void {
        // this method only makes sense for non-static navigation state
        if (this.isNavigationStatic()
            && (this.configFn.isScreen('lg') || this.configFn.isScreen('xl'))) {
            return;
        }

        jQuery('tfc-cmp-layout').removeClass('nav-collapsed');
        this.$sidebar.find('.active .active').closest('.collapse').collapse('show')
            .siblings('[data-toggle=collapse]').removeClass('collapsed');
    }

    collapseNavigation(): void {
        // this method only makes sense for non-static navigation state
        if (this.isNavigationStatic()
            && (this.configFn.isScreen('lg') || this.configFn.isScreen('xl'))) {
            return;
        }

        jQuery('tfc-cmp-layout').addClass('nav-collapsed');
        this.$sidebar.find('.collapse.in').collapse('hide')
            .siblings('[data-toggle=collapse]').addClass('collapsed');
    }

    /**
     * Check and set navigation collapse according to screen size and navigation state
     */
    checkNavigationState(): void {
        if (this.isNavigationStatic()) {
            if (this.configFn.isScreen('sm')
                || this.configFn.isScreen('xs') || this.configFn.isScreen('md')) {
                this.collapseNavigation();
            }
        } else {
            if (this.configFn.isScreen('lg') || this.configFn.isScreen('xl')) {
                setTimeout(() => {
                    this.collapseNavigation();
                }, this.config.settings.navCollapseTimeout);
            } else {
                this.collapseNavigation();
            }
        }
    }

    isNavigationStatic(): boolean {
        return this.config.state['nav-static'] === true;
    }

    toggleNavigationCollapseState(): void {
        if (jQuery('tfc-cmp-layout').is('.nav-collapsed')) {
            this.expandNavigation();
        } else {
            this.collapseNavigation();
        }
    }

    _sidebarMouseEnter(): void {
        // if (this.configFn.isScreen('lg') || this.configFn.isScreen('xl')) {
        //     this.expandNavigation();
        // }
    }

    _sidebarMouseLeave(): void {
        // if (this.configFn.isScreen('lg') || this.configFn.isScreen('xl')) {
        this.collapseNavigation();
        // }
    }

    enableSwipeCollapsing(): void {
        let swipe = new Hammer(document.getElementById('content-wrap'));
        let d = this;

        swipe.on('swipeleft', () => {
            setTimeout(() => {
                if (d.configFn.isScreen('md')) {
                    return;
                }

                if (!jQuery('tfc-cmp-layout').is('.nav-collapsed')) {
                    d.collapseNavigation();
                }
            });
        });

        swipe.on('swiperight', () => {
            if (d.configFn.isScreen('md')) {
                return;
            }

            if (jQuery('tfc-cmp-layout').is('.chat-sidebar-opened')) {
                return;
            }

            if (jQuery('tfc-cmp-layout').is('.nav-collapsed')) {
                d.expandNavigation();
            }
        });
    }

    collapseNavIfSmallScreen(): void {
        // if (this.configFn.isScreen('xs')
        //     || this.configFn.isScreen('sm') || this.configFn.isScreen('md')) {
        this.collapseNavigation();
        // }
    }

    /*
     * Trigger retrieval of current user and notify subscribers (sidebar, navbar).
     * Set current user on application state.
     */
    initCurrentUser() {
        const self = this;
        // subscribe to retrieval of current user
        this.messageBusService.getCurrentUser().subscribe(
            currentUser => {
                self.appState.set('currentUser', currentUser);
            });
        /*
         * Trigger the retrieval of current user object.
         * Subscription (above) will set current user.
         */
        this.messageBusService.retrieveCurrentUser();
    }

    ngOnInit(): void {
        this.initCurrentUser();

        if (localStorage.getItem('nav-static') === 'true') {
            this.config.state['nav-static'] = true;
        }

        let $el = jQuery(this.el.nativeElement);
        this.$sidebar = $el.find('[sidebar]');

        $el.find('a[href="#"]').on('click', (e) => {
            e.preventDefault();
        });

        this.$sidebar.on('mouseenter', this._sidebarMouseEnter.bind(this));
        this.$sidebar.on('mouseleave', this._sidebarMouseLeave.bind(this));

        this.checkNavigationState();

        this.$sidebar.on('click', () => {
            // if (this.configFn.isScreen('lg') || this.configFn.isScreen('xl')) {
            //     if (jQuery('tfc-cmp-layout').is('.nav-collapsed')) {
            //         this.expandNavigation();
            //     }
            // }
            //
            // setTimeout(() => {
            //     this.collapseNavigation();
            // }, this.config.settings.navCollapseTimeout);
        });

        this.router.events.subscribe(() => {
            this.collapseNavIfSmallScreen();
            window.scrollTo(0, 0);
        });

        if ('ontouchstart' in window) {
            this.enableSwipeCollapsing();
        }

        this.$sidebar.find('.collapse').on('show.bs.collapse', function(e): void {
            // execute only if we're actually the .collapse element initiated event
            // return for bubbled events
            if (e.target !== e.currentTarget) {
                return;
            }

            let $triggerLink = jQuery(this).prev('[data-toggle=collapse]');
            jQuery($triggerLink.data('parent'))
                .find('.collapse.in').not(jQuery(this)).collapse('hide');
        })
        /* adding additional classes to navigation link li-parent
         for several purposes. see navigation styles */
            .on('show.bs.collapse', function(e): void {
                // execute only if we're actually the .collapse element initiated event
                // return for bubbled events
                if (e.target !== e.currentTarget) {
                    return;
                }

                jQuery(this).closest('li').addClass('open');
            }).on('hide.bs.collapse', function(e): void {
            // execute only if we're actually the .collapse element initiated event
            // return for bubbled events
            if (e.target !== e.currentTarget) {
                return;
            }

            jQuery(this).closest('li').removeClass('open');
        });
    }
}
