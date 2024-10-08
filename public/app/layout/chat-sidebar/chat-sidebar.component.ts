import { Component, OnInit, ElementRef } from '@angular/core';
import { ChatService } from './chat.service';
declare var jQuery: any;
declare var Hammer: any;

@Component({
    selector: 'tfc-cmp-chat-sidebar',
    templateUrl: './chat-sidebar.template.html'
})
export class ChatSidebarComponent implements OnInit {
    conversations: ChatService;
    newMessage: string = '';
    activeConversation: any;
    chatMessageOpened: boolean = false;
    $el: any;
    searchText: string;

    constructor(el: ElementRef) {
        this.conversations = new ChatService();

        this.$el = jQuery(el.nativeElement);
        this.activeConversation = this.conversations.todayConversations[0];
    }

    openConversation(conversation): void {
        this.activeConversation = conversation;
        this.chatMessageOpened = true;
    }

    deactivateLink(e): void {
        jQuery(e.currentTarget).removeClass('active').find('.badge').remove();
    }

    initChatSidebarScroll(): void {
        let $sidebarContent = jQuery('.chat-sidebar-contacts', this.$el);
        if (this.$el.find('.slimScrollDiv').length !== 0) {
            $sidebarContent.slimscroll({
                destroy: true
            });
        }
        $sidebarContent.slimscroll({
            height: window.innerHeight,
            width: '',
            size: '4px'
        });
    }

    enableSwipeCollapsing(): void {
        let $chatContainer = jQuery('tfc-cmp-layout');
        let chatSidebarSwipe = new Hammer(document.getElementById('content-wrap'));

        chatSidebarSwipe.on('swipeleft', () => {
            if ($chatContainer.is('.nav-collapsed')) {
                $chatContainer.addClass('chat-sidebar-opened');
            }
        });

        chatSidebarSwipe.on('swiperight', () => {
            setTimeout(() => {
                if ($chatContainer.is('.chat-sidebar-opened')) {
                    $chatContainer.removeClass('chat-sidebar-opened');
                }
            });
        });
    }

    ngOnInit(): void {
        jQuery('tfc-cmp-layout').addClass('chat-sidebar-container');

        if ('ontouchstart' in window) {
            this.enableSwipeCollapsing();
        }

        jQuery(window).on('sn:resize', this.initChatSidebarScroll.bind(this));
        this.initChatSidebarScroll();
    }

}
