import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

declare var jQuery: any;

@Component({
    selector: '[sidebar]',
    templateUrl: './sidebar.template.html',
    providers: [AuthService]
})

export class Sidebar implements OnInit {
    $el: any;
    config: any;
    currentUser: any = {};

    constructor(private el: ElementRef,
                private router: Router,
                private location: Location,
                private service: AuthService,
                public userService: UserService) {
        this.$el = jQuery(el.nativeElement);
        this.router = router;
        this.location = location;
    }

    initSidebarScroll(): void {
        let $sidebarContent = this.$el.find('.js-sidebar-content');
        if (this.$el.find('.slimScrollDiv').length !== 0) {
            $sidebarContent.slimscroll({
                destroy: true
            });
        }
        $sidebarContent.slimscroll({
            height: window.innerHeight,
            size: '4px'
        });
    }

    changeActiveNavigationItem(location): void {
        let $newActiveLink = this.$el.find('a[href="#' + location.path() + '"]');

        // collapse .collapse only if new and old active links belong to different .collapse
        if (!$newActiveLink.is('.active > .collapse > li > a')) {
            this.$el.find('.active .active').closest('.collapse').collapse('hide');
        }
        this.$el.find('.sidebar-nav .active').removeClass('active');

        $newActiveLink.closest('li').addClass('active')
            .parents('li').addClass('active');

        // uncollapse parent
        $newActiveLink.closest('.collapse').addClass('in')
            .siblings('a[data-toggle=collapse]').removeClass('collapsed');
    }

    ngAfterViewInit(): void {
        this.changeActiveNavigationItem(this.location);
    }

    ngOnInit(): void {
        jQuery(window).on('sn:resize', this.initSidebarScroll.bind(this));
        this.initSidebarScroll();

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.changeActiveNavigationItem(this.location);
            }
        });
    }

    logout(event) {
        this.service.logoutfn().then((res) => {
            if (!window.localStorage.getItem('id_token') && !res) {
                this.router.navigate(['/login']);
            } else {
                console.log(res);
            }
        });
    }
}
