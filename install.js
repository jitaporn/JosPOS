let deferredInstall=null;
const saleTop=$('#sale .top');saleTop.insertAdjacentHTML('beforeend','<button class="install-btn" id="installApp">⬇ ติดตั้งแอป</button>');
const installButton=$('#installApp');
function isStandalone(){return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}
if(isStandalone())installButton.hidden=true;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;installButton.hidden=false});
window.addEventListener('appinstalled',()=>{deferredInstall=null;installButton.hidden=true;josSuccess('ติดตั้ง JOS POS เรียบร้อยแล้ว')});
installButton.onclick=async()=>{if(deferredInstall){deferredInstall.prompt();let result=await deferredInstall.userChoice;deferredInstall=null;if(result.outcome==='accepted')installButton.hidden=true;return}await josDialog('เบราว์เซอร์นี้ไม่แสดงหน้าติดตั้งอัตโนมัติ\n\nSamsung Internet: กดเมนู ☰ หรือ ⋮ แล้วเลือก “เพิ่มหน้าไปยัง” → “หน้าจอหลัก”\n\nChrome: กดเมนู ⋮ แล้วเลือก “ติดตั้งแอป” หรือ “เพิ่มลงในหน้าจอหลัก”',{title:'ติดตั้ง JOS POS'})};
