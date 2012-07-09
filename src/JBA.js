/**
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 *
 * 2012 Nicolas Denoual <n.denoual@gmail.com>
 */




/**
 * byte array js class.
 * Allow to read write binary values in Big Endian byte order directly in an byte array
 * Supported types:
 *  - unsigned byte
 *  - byte
 *  - unsigned short
 *  - short
 *  - unsigned int
 *  - int
 *  - ascci char
 *  - ascci string
 *  - boolean
 *  - bytes
 * 
 * compatible AMD/requirejs
 */
define(function() {
    "use strict";

    /*jslint bitwise:true, plusplus:true*/

    var BIG_ENDIAN = 0,
        LITTLE_ENDIAN = 1,
        
        ByteStorage, ByteArray;
    
    
    // input (string | ArrayBuffer)
    // byteOrder (BIG_ENDIAN, LITTLE_ENDIAN)
    ByteStorage = function(input) {
        
        var buf, MEM_SIZE = 1024; 

        this.maxPosition = 0;
        
        if(typeof ArrayBuffer === 'function') {
            if (!ArrayBuffer.prototype.copyInto) {
                ArrayBuffer.prototype.copyInto = function (target) {
                    var i, that = new Uint8Array(this),
                    resultArray = new Uint8Array(target);
                    for (i = 0; i < resultArray.length; i++) {
                       resultArray[i] = that[i];
                    }
                    return target;
                };
            }
            

            if(input === undefined) {
                buf = new ArrayBuffer(MEM_SIZE);
            } else if(input instanceof ArrayBuffer) {
                buf = input;   
                this.maxPosition = buf.byteLength;            
            } else if(typeof input === "string") {
                buf = new ArrayBuffer(input.length);
            } else {
                throw new Error("unsupported input " + typeof(input));
            }
            this.ba = new Uint8Array(buf);  
        } else {
            this.ba = [];
        }
        
        this.position = 0;
        
        
        if(typeof input === "string") {
            this.maxPosition = input.length;
            (function(ba) { 
                var ch, i=0, j=0;
                for (i = 0; i < input.length; i++ ) { 
                    ch = input.charCodeAt(i);
                    ba[j++] = ch & 0xFF;
                    if(ch >= 127) {
                        ch = ch >> 8;                       
                    }
                }
            }(this.ba));
        }
        
        this.writeByte = function(b) {
           this.ba[this.position++] = b & 0xFF;          
            if(this.position > this.maxPosition) {
                this.maxPosition = this.position;
                if(typeof ArrayBuffer === 'function' && this.maxPosition >= this.ba.length) {
                    buf = buf.copyInto(new ArrayBuffer(this.ba.length + MEM_SIZE));
                    this.ba = new Uint8Array(buf);
                }
            }
        };
        
        
        this.readByte = function() {
            return this.ba[this.position++];
        };
        
        
        this.readBytes = function(length) {
            var i, bytes;
            if(typeof ArrayBuffer === 'function') {
                bytes = new Uint8Array(new ArrayBuffer(length));
            } else {
                bytes = [];
            }
            for(i=0; i<length; i++) {
                bytes[i] = this.readByte();
            }
            return bytes;
        };
        
        
        this.size = function() {
            return this.maxPosition;
        };
        
    };
    
    ByteArray = function(input, byteOrder) {
        
        var MIN_BYTE, MAX_BYTE, MIN_UBYTE, MAX_UBYTE, MIN_SHORT, MAX_SHORT, MIN_USHORT, MAX_USHORT,
            MIN_INT, MAX_INT, MIN_UINT, MAX_UINT, storage;
        
        MIN_BYTE = -Math.pow(2, 7) ;
        MAX_BYTE = Math.pow(2, 7) - 1;
        MIN_UBYTE = 0;
        MAX_UBYTE = Math.pow(2, 8) - 1;
        MIN_SHORT = -Math.pow(2, 15);
        MAX_SHORT = Math.pow(2, 15) - 1;
        MIN_USHORT = 0;
        MAX_USHORT = Math.pow(2, 16) - 1;
        MIN_INT = -Math.pow(2, 31);
        MAX_INT = Math.pow(2, 31) - 1;
        MIN_UINT = 0;
        MAX_UINT = Math.pow(2, 32) - 1;
        
        storage = new ByteStorage(input);
        
        this.byteOrder = byteOrder !== undefined ? byteOrder : BIG_ENDIAN;
        
        
        this.reset = function() {
            storage.position = 0;
        };
        
        this.next = function() {
            ++storage.position;
        };
        
        this.previous = function() {
            --storage.position;
        };
        
        this.to = function(to) {
            storage.position = to;
        };
        
        this.getPosition = function() {
            return storage.position;
        };
         
        this.isUnsignedIntValid = function(value) {
            return !(value < MIN_UINT || value > MAX_UINT);
        };
        
        this.isIntValid = function(value) {
            return !(value < MIN_INT || value > MAX_INT);   
        };
        
        this.isShortValid = function(value) {
            return !(value < MIN_SHORT || value > MAX_SHORT);
        };
        
        this.isUnsignedShortValid = function(value) {
            return !(value < MIN_USHORT || value > MAX_USHORT);
        };
        
        this.isByteValid = function(value) {
            return !(value < MIN_BYTE || value > MAX_BYTE);
        };
        
        this.isASCIIStringValid = function(value) {
            var i=0;
            for(i; i < value.length; i++) {
                if(!this.isASCIICharValid(value.substr(i, 1))) { return false; }
            }
            return true;
        };
        
        this.isASCIICharValid = function(value) {
            return value.length === 1 && value.charCodeAt(0) < 127;
        };
        
        this.isUnsignedByteValid = function(value) {
            return !(value < MIN_UBYTE || value > MAX_UBYTE);
        };
        
        this.writeBytes = function(bytes) {
            var i;
            for(i=0; i < bytes.length; i++) {
                this.writeByte(bytes[i]);
            }
        };
        
        this.writeBool = function(value) {
            this.writeByte(+(value === true));
        };
        
        this.writeASCIIChar = function(value) {
            this.writeByte(value.charCodeAt(0));
        };
        
        this.writeASCIIString = function(value, length) {
            
            var i = 0, maxLen = length ? Math.min(value.length, length) : value.length;
            for(i; i < maxLen; i++) {                   
                this.writeASCIIChar(value.substr(i, 1));
            }
            if(length === undefined) {
                this.writeASCIIChar("\u0000");
            }
            while(i++ < length) {
                this.writeASCIIChar("\u0000");
            }
        };
        
                
        this.writeUnsignedInt = function(value) {
            switch(this.byteOrder) {
                case BIG_ENDIAN:
                    storage.writeByte(value >> 24);
                    storage.writeByte(value >> 16);
                    storage.writeByte(value >> 8);            
                    storage.writeByte(value);
                break;
                
                case LITTLE_ENDIAN:
                    storage.writeByte(value);
                    storage.writeByte(value >> 8);
                    storage.writeByte(value >> 16);
                    storage.writeByte(value >> 24);
                break;                
            }
        };

        
        this.writeInt = function(value) {
            this.writeUnsignedInt(value);
        };
        
        
        this.writeUnsignedShort = function(value) {
            switch(this.byteOrder) {
                case BIG_ENDIAN:
                    storage.writeByte(value >> 8);
                    storage.writeByte(value);
                break;
                
                case LITTLE_ENDIAN:
                    storage.writeByte(value);
                    storage.writeByte(value >> 8);
                break;
            }                    
        };
        
        this.writeShort = function(value) {
            this.writeUnsignedShort(value);
        };
        
        this.writeUnsignedByte = function(value) {
            storage.writeByte(value);
        };
        
        this.writeByte = function(value) {
            this.writeUnsignedByte(value);
        };
        
        this.readBool = function() {
            return this.readByte() === 1;
        };
        
        this.readASCIIChar = function() {
            return String.fromCharCode(this.readByte());
        };
        
        this.readASCIIString = function(length) {
            var buff = "", c;
            while((c = this.readASCIIChar()) !== "\u0000") {
                buff += c;
            }
                
            while(--length >  buff.length) {
                ++storage.position;
            }

            return buff;
        };
        
        this.readUnsignedInt = function() {
            var value;
            switch(this.byteOrder) {
                case BIG_ENDIAN:
                    value = storage.readByte() << 24;
                    value |= storage.readByte() << 16;
                    value |= storage.readByte() << 8;
                    value |= storage.readByte();
                break;
                
                case LITTLE_ENDIAN:
                    value = storage.readByte();
                    value |= storage.readByte() << 8;
                    value |= storage.readByte() << 16;
                    value |= storage.readByte() << 24;
                break;
            }
            return value < 0 ? Math.pow(2, 32) + value : value;
        };
        
        this.readInt = function() {
            var unsignedValue = this.readUnsignedInt();
            return (unsignedValue > MAX_INT ? unsignedValue - Math.pow(2, 32) : unsignedValue); 
        };
        
        this.readUnsignedShort = function() {
            switch(this.byteOrder) {
                case BIG_ENDIAN:
                    return (storage.readByte() << 8 | storage.readByte());
                
                case LITTLE_ENDIAN:
                    return (storage.readByte() | storage.readByte() << 8);
            }
        };
        
        this.readShort = function() {
            var unsignedValue = this.readUnsignedShort();
            return (unsignedValue > MAX_SHORT ? unsignedValue - Math.pow(2, 16) : unsignedValue);           
        };
        
        this.readUnsignedByte = function() {      
            return storage.readByte();
        };
        
        this.readBytes = function(length) {
            return storage.readBytes(length);
        };
        
        this.readByte = function() {
            var unsignedValue = this.readUnsignedByte();
            return (unsignedValue > MAX_BYTE ? unsignedValue - Math.pow(2, 8) : unsignedValue);
        };
        
        this.size = function() {
            return storage.size();
        };
        
        this.toString = function() {
            if(this.size() === 0) { return null; }
            storage.position = 0;
            var buf = "";
            do {
                buf += String.fromCharCode(storage.readByte());
            } while(    storage.position < storage.size());

            return buf;
        };
        
        this.toArrayBuffer = function() {
            if(typeof ArrayBuffer !== 'function') {
                throw new Error("Array Buffer not compatible in the browser")
            }
            var buf = new ArrayBuffer(this.size()),
                ba = new Uint8Array(buf);
            storage.position = 0;
            do {
                ba[storage.position] = storage.readByte();
            } while(storage.position < storage.size());

            return buf;
        };
    };
  

      
    return {      
        // arguments can be
        //  - input (string | ArrayBuffer)
        //  - byteOrder (BIG_ENDIAN, LITTLE_ENDIAN)
        //  - input, byteOrder
        create: function(arg1, arg2) {
            var input, byteOrder;
            if(arg1 && !arg2) {
                if(arg1 === BIG_ENDIAN || arg1 === LITTLE_ENDIAN) {
                    byteOrder = arg1;
                } else {
                    input = arg1;
                }
            } else if(arg1 && arg2) {
                input = arg1;
                byteOrder = arg2;
            }
            return new ByteArray(input, byteOrder);
        },
        
        sendRequest: function(url, cbSuccess, cbError) {

            var xhr = null;
            if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } else if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            }

            xhr.open("GET", url, true);
            if(xhr.responseType !== undefined) {
                xhr.responseType = 'arraybuffer';
            }
            if(xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
            
            xhr.onload = function() {
                if (xhr.status === 200 || xhr.status === 206 || xhr.status === 0) {
                    xhr.binaryResponse = (xhr.responseType !== undefined) ? this.response : xhr.responseText;
                    cbSuccess(xhr);
                } else {
                    if(cbError) { cbError(); }
                }
                xhr = null;
            };
            xhr.send();
        },
                
        BIG_ENDIAN: BIG_ENDIAN,
        LITTLE_ENDIAN: LITTLE_ENDIAN,
    
        INT_BYTE_SIZE: 4,
        SHORT_BYTE_SIZE: 2
   };
});