import {Component, EventEmitter, OnInit, ElementRef, Output} from '@angular/core';
import {AppConfig} from '../../app.config';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AppContextService} from '../../services/app.context.service';

declare var jQuery: any;

@Component({
    selector: '[navbar]',
    templateUrl: './navbar.template.html',
    providers: [AuthService]
})
export class Navbar implements OnInit {
    @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
    @Output() toggleChatEvent: EventEmitter<any> = new EventEmitter();
    $el: any;
    config: any;
    currentUser: any = {};

    constructor(private authService: AuthService,
                private appContextService: AppContextService,
                public router: Router,
                el: ElementRef,
                config: AppConfig) {
        this.$el = jQuery(el.nativeElement);
        this.config = config.getConfig();
    }

    toggleSidebar(state): void {
        this.toggleSidebarEvent.emit(state);
    }

    toggleChat(): void {
        this.toggleChatEvent.emit(null);
    }

    logout(event) {
        this.authService.logoutfn().then((res) => {
            if (!window.localStorage.getItem('id_token') && !res) {
                this.router.navigate(['/login']);
            } else {
                console.log(res);
            }
        });
    }

    ngOnInit(): void {
        /*
         * Current User
         */
        this.appContextService.getCurrentUser().subscribe(
            currentUser => {
                this.currentUser = currentUser;
            });

        setTimeout(() => {
            let $chatNotification = jQuery('#chat-notification');
            $chatNotification.removeClass('hide').addClass('animated fadeIn')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
                    $chatNotification.removeClass('animated fadeIn');
                    setTimeout(() => {
                        $chatNotification.addClass('animated fadeOut')
                            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd' +
                                ' oanimationend animationend', () => {
                                $chatNotification.addClass('hide');
                            });
                    }, 8000);
                });
            $chatNotification.siblings('#toggle-chat')
                .append('<i class="chat-notification-sing animated bounceIn"></i>');
        }, 4000);

        this.$el.find('.input-group-addon + .form-control').on('blur focus', function (e): void {
            jQuery(this).parents('.input-group')
                [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
        });
    }
}
