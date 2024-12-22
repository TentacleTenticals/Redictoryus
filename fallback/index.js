import {El} from '../src/mjs.js';

window.onload = () => {
  console.log('Loaded', document.location.href);
  let param = document.location.search;
  if(!param) return;

  param = param.substring(1);

  const arr = param.split('&');
  const o = {};
  arr.forEach(e => {
    const q = e.split('=');
    o[q[0]] = q[1];
    // o.push({[q[0]]:q[1]});
  })

  console.log('Params', o);

  El.Div({
    path: document.body,
    text: 'Test',
    cName: 'list',
    func: (m) => {
      for(let i in o){
        El.Input({
          path: m,
          label: i,
          value: o[i],
          func: (l) => {
            El.Button({
              path: l,
              text: 'Copy',
              onclick: () => {
                navigator.clipboard.writeText(l.children[0].value);
              }
            })
          }
        })
      }
    }
  })


  // const params = new URLSearchParams(document.location.search);
  // params.forEach((v, k) => {
  //     console.log(k, v)
  // })
}

// console.log('Loaded');
