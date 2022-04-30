function capitaliseFirstLetter(e){return e.charAt(0).toUpperCase()+e.slice(1)}function generateNumbers(e){let t=[];for(let n=0;n<e;n+=1)t.push(getRandomInt(0,10).toString());return t}function genRangeChar(e,t,n){const r=[];for(let o=0;o<n;o+=1)r.push(String.fromCharCode(getRandomInt(e,t)));return r}function generateSymbols(e){return genRangeChar(33,44,e)}function generateAscii(e){return genRangeChar(33,127,e)}function generateWordsOffline(e,t){return wordsFromList(document.getElementById(e).value.split("\n"),t)}function wordsFromList(e,t){const n=[];for(let r=0;r<t;r+=1)n.push(e[getRandomInt(0,e.length)]);return n}async function generateWords(e,t){return wordsFromList(await grabFile(e),t)}async function grabFile(e){return new Promise((function(t,n){const r=new XMLHttpRequest;r.open("GET","resources/"+e+".txt"),r.onload=function(){t(r.responseText.split("\n"))},r.send(null)}))}function grabValue(e,t){let n=t;try{n=document.getElementById(e).value.replace(/\s/g,"")}catch(e){}return n}function grabBool(e,t){let n=t;try{n=document.getElementById(e).checked}catch(e){}return n}function calcPasswordStrength(e){const t=e.split("").reduce((function(e,t){return e[t]=(e[t]||0)+1,e}),{});return Object.keys(t).reduce((function(n,r){const o=t[r]/e.length;return n-=Math.log(o)/Math.log(2)*o}),0)*e.length}async function start(){const e=generateNumbers(grabValue("numbers",2)),t=generateSymbols(grabValue("symbols",2)),n=generateAscii(grabValue("ascii",0)),r=grabValue("words",2);let o=await generateWords(grabValue("wordlist","10k"),r);if(grabBool("customwl",!1)&&(o=generateWordsOffline("list",r)),grabBool("uppercase",!0))for(let e=0;e<o.length;e++)o[e]=capitaliseFirstLetter(o[e]);let a=o.concat(e,t,n);grabBool("shuffle",!1)&&(a=shuffle(a));const l=a.join("");document.getElementById("output").value=l,document.getElementById("password-strength").value=calcPasswordStrength(l)}function uploadWordslist(){upload(document.getElementById("files").files,["list"])}function check(){document.getElementById("password-strength").value=calcPasswordStrength(grabValue("input",""))}const MAX_FILE_SIZE=4194304;function upload(e,t){const n=[];for(let r=0;r<e.length;r++){const o=e[r],a=new FileReader;a.readAsText(o,"UTF-8"),a.onload=function(e){const n=e.target.result;n.length<4194304?document.getElementById(t[r]).value=n:window.alert("File must be smaller than 1MB")},n.push(o.name)}return n}async function copyToClipboard(e){if(navigator.clipboard)try{await navigator.clipboard.writeText(e)}catch(e){window.alert("Failed to Copy: "+e)}}function copy(){let e=document.getElementById("output");e.select(),e.setSelectionRange(0,99999),copyToClipboard(e.value)}function getRandomInt(e,t){let n=window.crypto.getRandomValues(new Uint8Array(1))/256;return Math.floor(n*(t-e))+e}function shuffle(e){for(let t=e.length-1;t>0;t--){const n=getRandomInt(0,e.length);[e[t],e[n]]=[e[n],e[t]]}return e}