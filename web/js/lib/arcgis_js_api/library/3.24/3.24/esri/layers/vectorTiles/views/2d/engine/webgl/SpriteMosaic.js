// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.24/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/2d/engine/webgl/SpriteMosaic","require exports ./GeometryUtils ./Rect ./RectangleBinPack ../../../webgl/Texture".split(" "),function(u,v,p,r,q,t){return function(){function c(b,d,a){void 0===a&&(a=0);this._size=[];this._mosaicsData=[];this._textures=[];this._dirties=[];this._pageHeight=this._pageWidth=this._currentPage=this._maxItemSize=0;this._mosaicRects=new Map;this._spriteCopyQueue=[];this.pixelRatio=1;(0>=b||0>=d)&&console.error("Sprites mosaic defaultWidth and defaultHeight must be greater than zero!");
this._pageWidth=b;this._pageHeight=d;0<a&&(this._maxItemSize=a);this.pixelRatio=window.devicePixelRatio|1;this._binPack=new q(this._pageWidth,this._pageHeight);this._mosaicsData[0]=new Uint32Array(Math.floor(this._pageWidth)*Math.floor(this._pageHeight));this._dirties.push(!0);this._size.push([this._pageWidth,this._pageHeight]);this._textures.push(void 0)}c.prototype.getWidth=function(b){return b>=this._size.length?-1:this._size[b][0]};c.prototype.getHeight=function(b){return b>=this._size.length?
-1:this._size[b][1]};c.prototype.getPage=function(b){return b<this._textures.length?this._textures[b]:null};c.prototype.has=function(b){return this._mosaicRects.has(b)};Object.defineProperty(c.prototype,"itemCount",{get:function(){return this._mosaicRects.size},enumerable:!0,configurable:!0});c.prototype.getSpriteItem=function(b){return this._mosaicRects.get(b)};c.prototype.addSpriteItem=function(b,d,a,e,c,l){if(this._mosaicRects.has(b))return this._mosaicRects.get(b);var g=this._allocateImage(d[0],
d[1]),f=g[0],k=g[1],g=g[2];if(0>=f.width||0>=f.height)return null;a={rect:f,width:d[0],height:d[1],anchorX:a[0],anchorY:a[1],sdf:l,pixelRatio:1,page:k};this._mosaicRects.set(b,a);this._copy({rect:f,spriteSize:d,spriteData:e,page:k,pageSize:g,repeat:c,sdf:l});return a};c.prototype.hasItemsToProcess=function(){return 0!==this._spriteCopyQueue.length};c.prototype.processNextItem=function(){var b=this._spriteCopyQueue.pop();b&&this._copy(b)};c.prototype.getSpriteItems=function(b){for(var d={},a=0;a<b.length;a++){var e=
b[a];d[e]=this.getSpriteItem(e)}return d};c.prototype.getMosaicItemPosition=function(b,d){var a=this.getSpriteItem(b),e=a&&a.rect;if(!e)return null;e.width=a.width;e.height=a.height;return{size:[a.width,a.height],tl:[(e.x+1)/this._size[a.page][0],(e.y+1)/this._size[a.page][1]],br:[(e.x+1+a.width)/this._size[a.page][0],(e.y+1+a.height)/this._size[a.page][1]],page:a.page}};c.prototype.bind=function(b,d,a,e){void 0===a&&(a=0);void 0===e&&(e=0);this._textures[a]||(this._textures[a]=new t(b,{pixelFormat:6408,
dataType:5121,width:this._size[a][0],height:this._size[a][1]},new Uint8Array(this._mosaicsData[a].buffer)));var c=this._textures[a];c.setSamplingMode(d);this._dirties[a]&&(c.setData(new Uint8Array(this._mosaicsData[a].buffer)),c.generateMipmap());b.bindTexture(c,e);this._dirties[a]=!1};c._copyBits=function(b,d,a,c,k,l,g,f,m,n,h){var e=c*d+a;g=f*l+g;if(h)for(g-=l,h=-1;h<=n;h++,e=((h+n)%n+c)*d+a,g+=l)for(f=-1;f<=m;f++)k[g+f]=b[e+(f+m)%m];else for(h=0;h<n;h++){for(f=0;f<m;f++)k[g+f]=b[e+f];e+=d;g+=l}};
c.prototype._copy=function(b){if(!(b.page>=this._mosaicsData.length)){var d=b.spriteData,a=this._mosaicsData[b.page];a&&d||console.error("Source or target images are uninitialized!");c._copyBits(d,b.spriteSize[0],0,0,a,b.pageSize[0],b.rect.x+1,b.rect.y+1,b.spriteSize[0],b.spriteSize[1],b.repeat);this._dirties[b.page]=!0}};c.prototype._allocateImage=function(b,d){b+=2;d+=2;var a=Math.max(b,d);if(this._maxItemSize&&this._maxItemSize<a){var a=Math.pow(2,Math.ceil(p.log2(b))),c=Math.pow(2,Math.ceil(p.log2(d))),
k=new r(0,0,b,d);this._mosaicsData.push(new Uint32Array(a*c));this._dirties.push(!0);this._size.push([a,c]);this._textures.push(void 0);return[k,this._mosaicsData.length-1,[a,c]]}a=this._binPack.allocate(b+(b%4?4-b%4:0),d+(d%4?4-d%4:0));return 0>=a.width?(this._dirties[this._currentPage]||(this._mosaicsData[this._currentPage]=null),this._currentPage=this._mosaicsData.length,this._mosaicsData.push(new Uint32Array(this._pageWidth*this._pageHeight)),this._dirties.push(!0),this._size.push([this._pageWidth,
this._pageHeight]),this._textures.push(void 0),this._binPack=new q(this._pageWidth,this._pageHeight),this._allocateImage(b,d)):[a,this._currentPage,[this._pageWidth,this._pageHeight]]};c.prototype._dispose=function(){this._binPack=null;this._mosaicRects.clear()};return c}()});