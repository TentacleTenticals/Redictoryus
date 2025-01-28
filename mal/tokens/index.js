import {El} from '../../src/mjs.js';

// window.addEventListener('message', (e) => {
//   console.log('Message fromm c!', e.data);
// });

El.Div({
  path: document.body,
  cName: 'm header',
  text: 'Получатель MAL токенов',
});

El.Div({
  path: document.body,
  cName: 'helper flex ver',
  func: (h) => {
    El.Div({
      path: h,
      cName: 'header',
      text: 'Справка'
    });

    El.Div({
      path: h,
      cName: 'list flex ver',
      func: (l) => {
        El.Div({
          path: l,
          cName: 'item',
          text: 'Вы можете создать MAL приложение по ссылке ',
          func: (q) => {
            El.A({
              path: q,
              text: 'MAL',
              url: 'https://myanimelist.net/apiconfig'
            });
          }
        });
    
        El.Div({
          path: l,
          cName: 'item',
          func: (q) => {
            El.Div({
              path: q,
              text: '"Catcher Url" используется для получения и передачи запросов. Вы можете скопировать проект и захостить его на '
            });
            El.A({
              path: q,
              text: 'Glitch',
              url: 'https://glitch.com'
            });
    
            El.Div({
              path: q,
              text: ' и аналогах'
            });
          }
        });
      }
    });
  }
});

El.Div({
  path: document.body,
  cName: 'mainer',
  func: (m) => {
    const info = {
      url: 'https://myanimelist.net/v1/oauth2/authorize?'
    };
    const params = {
      'response_type': 'code',
      'code_challenge': cc(128)
    };
    const params1 = {
      grant_type: 'authorization_code',
      code_verifier: params.code_challenge
    };
    const el = {};
    let tokens;

    El.Form({
      path: m,
      cName: 'form main',
      func: (form) => {
        El.Input({
          path: form,
          label: 'Client ID',
          title: 'ID клиента',
          required: true,
          onblur: (e) => {
            params.client_id = e.target.value;
            params1.client_id = e.target.value;
            // console.log('Q', params);
          }
        });

        El.Input({
          path: form,
          label: 'Client Secret',
          required: true,
          onblur: (e) => {
            params1.client_secret = e.target.value;
            // console.log('Q', params1);
          }
        });

        El.Input({
          path: form,
          label: 'Redirect url',
          title: 'Ссылка на сайт, которую вы ввели при создании приложения на сайте MAL',
          type: 'url',
          required: true,
          onblur: (e) => {
            params.redirect_uri = e.target.value;
            params1.redirect_uri = e.target.value;
            // console.log('Q', params);
          }
        });

        El.Input({
          path: form,
          type: 'submit',
          value: 'Войти в аккаунт MAL и получить код',
          onclick: () => {
            document.activeElement.blur();
            el.w = window.open(info.url+toArr(params));
          }
        });
      }
    });

    El.Form({
      path: m,
      cName: 'form tokens',
      func: (form) => {
        El.Input({
          path: form,
          label: 'Catcher url',
          title: 'Ссылка на сайт, который обработает запрос, выдав в ответ токены',
          type: 'url',
          required: true,
          onblur: (e) => {
            info.catcherUrl = e.target.value;
            // console.log('Q', info);
          }
        });
        
        El.Input({
          path: form,
          label: 'Code',
          title: 'Код, который вы получите при нажатии кнопки "Войти в аккаунт MAL и получить код". Вводить не нужно, он впишется автоматически',
          required: true,
          onblur: (e) => {
            params1.code = e.target.value;
            // console.log('Q', params1);
          },
          func: (e) => {
            el.code = e;
            // console.log('EL', el.code)
          }
        });
        
        El.Input({
          path: form,
          type: 'submit',
          cName: 'btn tokens',
          value: 'Получить токены',
          onclick: () => {
            document.activeElement.blur();
            // form.children[2].classList.remove('hidden');
            // form.children[3].classList.remove('hidden');
    
            fetch(info.catcherUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Method: 'POST',
                Type: 'application/x-www-form-urlencoded',
                // Info: JSON.stringify({
                //   url: 'https://myanimelist.net/v1/oauth2/token',
                //   method: 'post'
                // }),
                // Head: JSON.stringify({
                //   'Content-Type': 'application/x-www-form-urlencoded'
                // }),
                Url: 'https://myanimelist.net/v1/oauth2/token'
                // JSON.stringify(params1)
              },
              body: JSON.stringify(params1)
            }).then(r => r.json().then(
              res => {
                console.log('RES', res);
                form.children[3].classList.remove('hidden');
                form.children[4].classList.remove('hidden');
                tokens = res;
              },
              err => {
                console.log('ERR', err);
                console.log('ERRRRR', r);
                form.children[3].classList.add('hidden');
                form.children[4].classList.add('hidden');
                tokens = {};
              }
            ))
          }
        });

        El.Button({
          path: form,
          cName: 'btn hidden',
          text: 'Токен',
          title: 'Токен, необходимый для использования апи MAL. Действует месяц',
          onclick: () => {
            document.activeElement.blur();
            navigator.clipboard.writeText(tokens.access_token);
            // window.open(url+toArr(params));
          }
        });
        El.Button({
          path: form,
          cName: 'btn hidden',
          text: 'Токен обновления',
          title: 'Токен, необходимый для получения нового токена апи MAL',
          onclick: () => {
            document.activeElement.blur();
            navigator.clipboard.writeText(tokens.refresh_token);
            // window.open(url+toArr(params));
          }
        });
      }
    });

    window.addEventListener('message', (e) => {
      console.log('Message from c!', e.data);
      console.log('ELL', el)
      if(e.data.code){
        el.code.value = e.data.code;
        params1.code = e.data.code;

        el.w.postMessage({MSG:'Код получен, данная вкладка будет закрыта через 5 секунд'}, '*');
        setTimeout(() => {
          el.w.postMessage({type:'close'}, '*');
        }, 5000);
      }
    });
  }
})
