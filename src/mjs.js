export const El = {
    Div: function(o){
      const main = document.createElement('div');
      if(o.cName) main.className=o.cName;
      if(o.text) main.textContent=o.text;
      if(o.onClick) main.clasonmousedownsName=o.onClick;
      o.path.appendChild(main);

      if(o.func) o.func(main);
    },
    Button: function(o){
      const main = document.createElement('button');
      if(o.cName) main.className=o.cName;
      if(o.text) main.textContent=o.text;
      if(o.onClick) main.clasonmousedownsName=o.onClick;
      o.path.appendChild(main);

      if(o.func) o.func(main);
    },
    Input: function(o){
      const main = document.createElement('input');
      let label;
      if(o.label) label = this.Label({
        path: o.path,
        cName: o.cLabel,
        text: o.label,
        r: true
      });
      if(o.value) main.value=o.value;
      if(o.onClick) main.clasonmousedownsName=o.onClick;

      if(label){
        o.path.appendChild(label);
        label.appendChild(main);
      }else
      o.path.appendChild(main);

      if(o.func) o.func(label||main);
    },
    Label: function(o){
      const main = document.createElement('label');
      if(o.cName) main.className=o.cName;
      if(o.text) main.textContent=o.text;
      if(o.onClick) main.clasonmousedownsName=o.onClick;
      o.path.appendChild(main);

      if(o.func) o.func(main);
      if(o.r) return main;
    }
  };
