import {El} from '../../src/mjs.js';

window.addEventListener('message', (e) => {
  console.log('Message fromm c!', e.data);
});

El.Div({
  path: document.body,
  cName: 'mainer',
  text: 'Verificator',
  func: (m) => {
    function cc(length) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
    
      for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    
      return text;
    };
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
    let tokens;

    El.Form({
      path: m,
      cName: 'form main',
      func: (form) => {
        El.Input({
          path: form,
          label: 'Client ID',
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
          value: 'Login and get Code',
          onclick: () => {
            document.activeElement.blur();
            window.open(info.url+new URLSearchParams(params));
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
          required: true,
          onblur: (e) => {
            params1.code = e.target.value;
            // console.log('Q', params1);
          }
        });
        
        El.Input({
          path: form,
          type: 'submit',
          value: 'Get tokens',
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
          text: 'Get token',
          onclick: () => {
            document.activeElement.blur();
            navigator.clipboard.writeText(tokens.access_token);
            // window.open(url+toArr(params));
          }
        });
        El.Button({
          path: form,
          cName: 'btn hidden',
          text: 'Get refresh token',
          onclick: () => {
            document.activeElement.blur();
            navigator.clipboard.writeText(tokens.refresh_token);
            // window.open(url+toArr(params));
          }
        });
      }
    });
  }
})
