import {El} from '../src/mjs.js';
const el = {};

El.Div({
  path: document.body,
  cName: 'msg',
  func: (e) => {
    el.MSG = e;
  }
});

window.addEventListener('message', (e) => {
  console.log('Message from p!', e.data);

  if(e.data.type === 'close') window.close();
  if(e.data.MSG) el.MSG.textContent = e.data.MSG;
});

window.onload = () => {
  console.log('Loaded', document.location.href);
  const params = new URLSearchParams(document.location.search);
  const o = {};
  
  for(let [key, val] of params.entries()){
    console.log(`${key}, ${val}`);
    o[key] = val;
  };

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
  });

  if(o && window.opener) window.opener.postMessage(o, '*');


  // const params = new URLSearchParams(document.location.search);
  // params.forEach((v, k) => {
  //     console.log(k, v)
  // })
};

// console.log('Loaded');
