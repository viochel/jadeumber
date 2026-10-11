(function(root){
'use strict';
function sanitizeBag(raw,gifts){const out={};if(!raw||typeof raw!=='object'||Array.isArray(raw))return out;for(const g of gifts){const q=Number(raw[g.id]);if(Number.isInteger(q)&&q>=1&&q<=10000)out[g.id]=q;}return out;}
function subtotal(bag,gifts){return gifts.reduce((sum,g)=>sum+(bag[g.id]||0)*g.price,0);}
function checkoutUrl(config,bag){if(!config.checkoutEnabled)throw new Error('Checkout is not open.');if(!/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(config.storeDomain))throw new Error('A valid Shopify store must be configured.');const clean=sanitizeBag(bag,config.gifts);const ids=Object.keys(clean);if(!ids.length)throw new Error('Your gift bag is empty.');const lines=ids.map(id=>{const variant=String(config.variantIds[id]||'');if(!/^[1-9][0-9]*$/.test(variant))throw new Error('This gift is not yet available for checkout.');return variant+':'+clean[id];});return 'https://'+config.storeDomain+'/jadeumber/cart/'+lines.join(',');}
const api={sanitizeBag,subtotal,checkoutUrl};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.JadeCommerceCore=api;
})(typeof window!=='undefined'?window:globalThis);
