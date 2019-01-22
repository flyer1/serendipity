import { trigger, style, transition, animate, keyframes, state } from '@angular/animations';

/*

@keyframes animScaleUp {
  0% {
    opacity: 0;
    transform: translate3d(0, -50%, 0) scale3d(0, 0, 1);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, -50%, 0) scale3d(1, 1, 1);
  }
}

@keyframes animFade {
	0% { opacity: 0; }
	100% { opacity: 1; }
}


@keyframes animSlideTop {
	0% { transform: translate3d(0,-100%,0); }
	100% { transform: translate3d(0,0,0); }
}*/

// export const animScaleUp2 =
//   trigger('animScaleUp2', [
//     transition('* => true', [
//       animate(300, keyframes([
//         style({ 'transform': 'translate3d(0,-50%,0) scale3d(0,0,1)', 'opacity': '0', offset: 0 }),
//         style({ 'transform': 'translate3d(0,-50%,0) scale3d(1,1,1)', 'opacity': '1', offset: 1 }),
//       ]))
//     ])
//   ]);

// export const animScaleUp =
//   trigger('animScaleUp', [
//     transition('* => true', [
//       style({ 'transform': 'translate3d(0,-50%,0) scale3d(0,0,1)', 'opacity': '0' }),
//       animate('300ms ease-in-out', style({ 'transform': 'translate3d(0,-50%,0) scale3d(1,1,1)', 'opacity': '1' }))
//     ])
//   ]);

// export const animSlideTop2 =
//   trigger('animSlideTop2', [
//     transition(':enter', [
//       animate(300, keyframes([
//         style({ 'transform': 'translate3d(0,-100%,0)', offset: 0 }),
//         style({ 'transform': 'translate3d(0,0,0)', offset: 1 }),
//       ]))
//     ])
//   ]);

// export const animSlideTop =
//   trigger('animSlideTop', [
//     transition(':enter', [
//       style({ 'transform': 'translate3d(0,-100%,0)' }),
//       animate('0ms ease-in-out', style({ 'transform': 'translate3d(0,0,0)' }))
//     ])
//   ]);


// @keyframes animSlideTop {
//   0 % { transform: translate3d(0, -100 %, 0); }
//   100 % { transform: translate3d(0, 0, 0); }
// }
