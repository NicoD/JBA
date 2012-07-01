(function(exports){exports.JBA=function(input){this.SHORT_BYTE_SIZE=2;this.INT_BYTE_SIZE=4;this.MIN_BYTE=-Math.pow(2,7);this.MAX_BYTE=Math.pow(2,7)-1;this.MIN_UBYTE=0;this.MAX_UBYTE=Math.pow(2,8)-1;this.MIN_SHORT=-Math.pow(2,15);this.MAX_SHORT=Math.pow(2,15)-1;this.MIN_USHORT=0;this.MAX_USHORT=Math.pow(2,16)-1;this.MIN_INT=-Math.pow(2,31);this.MAX_INT=Math.pow(2,31)-1;this.MIN_UINT=0;this.MAX_UINT=Math.pow(2,32)-1;this.position=0;var ba=new Array();if(input){var toByteArray=function(str){var ch,re=[],j=0;for(var i=0;i<str.length;i++){ch=str.charCodeAt(i);re[j++]=ch&0xFF;if(ch>=127){ch=ch>>8}}return re};ba=toByteArray(input)}this.isUnsignedIntValid=function(value){return!(value<this.MIN_UINT||value>this.MAX_UINT)};this.isIntValid=function(value){return!(value<this.MIN_INT||value>this.MAX_INT)};this.isShortValid=function(value){return!(value<this.MIN_SHORT||value>this.MAX_SHORT)};this.isUnsignedShortValid=function(value){return!(value<this.MIN_USHORT||value>this.MAX_USHORT)};this.isByteValid=function(value){return!(value<this.MIN_BYTE||value>this.MAX_BYTE)};this.isASCIIStringValid=function(value){for(var i=0;i<value.length;i++){if(!this.isASCIICharValid(value.substr(i,1)))return false}return true};this.isASCIICharValid=function(value){return value.length===1&&value.charCodeAt(0)<127};this.isUnsignedByteValid=function(value){return!(value<this.MIN_UBYTE||value>this.MAX_UBYTE)};this.writeBool=function(value){this.writeByte(+(value===true))};this.writeASCIIChar=function(value){this.writeByte(value.charCodeAt(0))};this.writeASCIIString=function(value,length){var maxLen=length?Math.min(value.length,length):value.length;var i=0;for(i=0;i<maxLen;i++){this.writeASCIIChar(value.substr(i,1))}while(i++<length){this.writeASCIIChar("\0")}};this.writeUnsignedInt=function(value){ba[this.position++]=(value>>24)&0xFF;ba[this.position++]=(value>>16)&0xFF;ba[this.position++]=(value>>8)&0xFF;ba[this.position++]=value&0xFF};this.writeInt=function(value){this.writeUnsignedInt(value)},this.writeUnsignedShort=function(value){ba[this.position++]=(value>>8)&0xFF;ba[this.position++]=value&0xFF};this.writeShort=function(value){this.writeUnsignedShort(value)};this.writeUnsignedByte=function(value){ba[this.position++]=value&0xFF};this.writeByte=function(value){this.writeUnsignedByte(value)};this.readBool=function(){return this.readByte()===1};this.readASCIIChar=function(){return String.fromCharCode(this.readByte())};this.readASCIIString=function(length){var buff="",char;while((char=this.readASCIIChar())!=="\0")buff+=char;while(--length>buff.length)++this.position;return buff};this.readUnsignedInt=function(){var value=(ba[this.position++]<<24);value|=(ba[this.position++]<<16);value|=(ba[this.position++]<<8);value|=ba[this.position++];return value<0?Math.pow(2,32)+value:value};this.readInt=function(){var unsignedValue=this.readUnsignedInt();return(unsignedValue>this.MAX_INT?unsignedValue-Math.pow(2,32):unsignedValue)};this.readUnsignedShort=function(){return(ba[this.position++]<<8|ba[this.position++])};this.readShort=function(){var unsignedValue=this.readUnsignedShort();return(unsignedValue>this.MAX_SHORT?unsignedValue-Math.pow(2,16):unsignedValue)};this.readUnsignedByte=function(){return ba[this.position++]};this.readByte=function(){var unsignedValue=this.readUnsignedByte();return(unsignedValue>this.MAX_BYTE?unsignedValue-Math.pow(2,8):unsignedValue)};this.size=function(){return ba.length};this.toString=function(){if(this.size()===0)return null;this.position=0;var buff="";do{buff+=String.fromCharCode(ba[this.position])}while(++this.position<ba.length);return buff}}})(typeof exports==='undefined'?this:exports);