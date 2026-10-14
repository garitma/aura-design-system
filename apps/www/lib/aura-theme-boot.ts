export const AURA_THEME_COLORS_KEY = "aura-theme-colors";

export const AURA_THEME_MODE_KEY = "theme";

export const AURA_THEME_BOOT_SCRIPT = `(function(){try{var raw=localStorage.getItem("${AURA_THEME_COLORS_KEY}");if(!raw)return;var data=JSON.parse(raw);var css=data&&data.css;if(!css)return;var stored=localStorage.getItem("${AURA_THEME_MODE_KEY}")||"system";var dark=stored==="dark"||(stored!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var vars=css[dark?"dark":"light"];if(!vars||typeof vars!=="object")return;var root=document.documentElement;for(var key in vars){if(!Object.prototype.hasOwnProperty.call(vars,key))continue;if(!/^--[a-z0-9-]+$/i.test(key))continue;var value=vars[key];if(typeof value!=="string"||value.length>200)continue;if(/[<>]|[;{}]|url\\s*\\(|expression\\s*\\(/i.test(value))continue;root.style.setProperty(key,value);}}catch(e){}})();`;

