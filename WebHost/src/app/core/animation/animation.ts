import { trigger, style, transition, animate, keyframes, state } from '@angular/animations';

export const fadeDownAnimation =
    trigger('fadeDownAnimation', [
        transition('*=>*', [
            style({ opacity: 0, transform: 'translate(0, -15%)' }),
            animate('300ms cubic-bezier(.61,1.05,.99,.99)', style({ opacity: 1, transform: 'translate(0, 0)' }))
        ])
    ]);

export const nopeAnimation =
    trigger('nopeAnimation', [
        transition(':enter', [
            style({ 'transform': 'translate3d(0,0,0)' }),
            animate('1.5s 3s ease', keyframes([
                style({ 'transform': 'translate3d(-5px,0,0)', offset: 0.1 }),
                style({ 'transform': 'translate3d(5px,0,0)', offset: 0.2 }),
                style({ 'transform': 'translate3d(-5px,0,0)', offset: 0.3 }),
                style({ 'transform': 'translate3d(5px,0,0)', offset: 0.4 }),
                style({ 'transform': 'translate3d(-5px,0,0)', offset: 0.5 }),
                style({ 'transform': 'translate3d(5px,0,0)', offset: 0.6 }),
                style({ 'transform': 'translate3d(-5px,0,0)', offset: 0.7 }),
                style({ 'transform': 'translate3d(5px,0,0)', offset: 0.8 }),
                style({ 'transform': 'translate3d(-5px,0,0)', offset: 0.9 }),
                style({ 'transform': 'translate3d(0,0,0)', offset: 1 }),
            ]))
        ])
    ]);

export const slideUpDownAnimation =
    trigger('slideUpDownAnimation', [
        transition(':enter', [
            style({ height: 0 }),
            animate('300ms ease-in-out', style({ height: '*' }))
        ]),
        transition(':leave', [
            style({ height: '*' }),
            animate('300ms ease-in-out', style({ height: 0 }))
        ])
    ]);

export const rotate90Animation =
    trigger('rotate90Animation', [
        state('0', style({ transform: 'rotate(0)' })),
        state('1', style({ transform: 'rotate(90deg)' })),
        transition('* => *', animate('300ms ease-in-out'))
    ]);

    export const fadeInAnimation =
    trigger('fadeInAnimation', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate(300, style({ opacity: 1 }))
        ]),
        transition(':leave', [
            style({ opacity: 1 }),
            animate(300, style({ opacity: 0 }))
        ])
    ]);
