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
 * 	- unsigned bytes
 * 	- bytes
 * 	- unsigned short
 * 	- short
 * 	- unsigned int
 * 	- int
 * 
 * supports client side and server side (nodejs)
 */
(function(exports) {
	
	exports.JBA = function(input) {
		
		
		// all the min / max variable are set in the JPA object scope to be available outside
		this.MIN_BYTE = -Math.pow(2, 7) ;
		this.MAX_BYTE = Math.pow(2, 7) - 1;
		this.MIN_UBYTE = 0;
		this.MAX_UBYTE = Math.pow(2, 8) - 1;
		this.MIN_SHORT = -Math.pow(2, 15);
		this.MAX_SHORT = Math.pow(2, 15) - 1;
		this.MIN_USHORT = 0;
		this.MAX_USHORT = Math.pow(2, 16) - 1;
		this.MIN_INT = -Math.pow(2, 31);
		this.MAX_INT = Math.pow(2, 31) - 1;
		this.MIN_UINT = 0;
		this.MAX_UINT = Math.pow(2, 32) - 1;
		
		this.position = 0;
		
		var ba = new Array();
		if(input) {
			var toByteArray = function(str) { 
				var ch, re = [], j=0;
				for (var i = 0; i < str.length; i++ ) { 
				    ch = str.charCodeAt(i);
				    if(ch < 127) {
				        re[j++] = ch & 0xFF;
				    }
				    else {
				    	re[j++] =  ch & 0xFF;
			            ch = ch >> 8;
				    }
				}   
				// return an array of bytes
				return re; 
			};
			ba = toByteArray(input);
		}
		
		this.isUnsignedIntValid = function(value) {
			return !(value < this.MIN_UINT || value > this.MAX_UINT);
		};
		
		this.isIntValid = function(value) {
			return !(value < this.MIN_INT || value > this.MAX_INT);	
		};
		
		this.isShortValid = function(value) {
			return !(value < this.MIN_SHORT || value > this.MAX_SHORT);
		};
		
		this.isUnsignedShortValid = function(value) {
			return !(value < this.MIN_USHORT || value > this.MAX_USHORT);
		};
		
		this.isByteValid = function(value) {
			return !(value < this.MIN_BYTE || value > this.MAX_BYTE);
		};
		
		this.isUnsignedByteValid = function(value) {
			return !(value < this.MIN_UBYTE || value > this.MAX_UBYTE);
		}
		
		this.writeUnsignedInt = function(value) {
			ba[this.position++] = (value >> 24) & 0xFF;			
			ba[this.position++] = (value >> 16) & 0xFF;
			ba[this.position++] = (value >> 8) & 0xFF;
			ba[this.position++] = value & 0xFF;			
		};

		
		this.writeInt = function(value) {
			this.writeUnsignedInt(value);
		},
		
		
		this.writeUnsignedShort = function(value) {
			ba[this.position++] = (value >> 8) & 0xFF;
			ba[this.position++] = value & 0xFF;			
		};
		
		this.writeShort = function(value) {
			this.writeUnsignedShort(value);
		};
		
		this.writeUnsignedByte = function(value) {
			ba[this.position++] = value & 0xFF;
		};
		
		this.writeByte = function(value) {
			this.writeUnsignedByte(value);
		};
		
		this.readUnsignedInt = function() {
			var value = (ba[this.position++] << 24);
			value |= (ba[this.position++] << 16);
			value |= (ba[this.position++] << 8);
			value |= ba[this.position++];
			
			value = Math.pow(2, 32) + value;
			
			return value == Math.pow(2, 32) ? 0 : value;
		};
		
		this.readInt = function() {
			var unsignedValue = this.readUnsignedInt();
			return (unsignedValue > this.MAX_INT ? unsignedValue - Math.pow(2, 32) : unsignedValue);	
		};
		
		this.readUnsignedShort = function() {
			return (ba[this.position++] << 8 | ba[this.position++]);
		};
		
		this.readShort = function() {
			var unsignedValue = this.readUnsignedShort();
			return (unsignedValue > this.MAX_SHORT ? unsignedValue - Math.pow(2, 16) : unsignedValue);			
		};
		
		this.readUnsignedByte = function() {			
			return ba[this.position++];
		};
		
		this.readByte = function() {
			var unsignedValue = this.readUnsignedByte();
			return (unsignedValue > this.MAX_BYTE ? unsignedValue - Math.pow(2, 8) : unsignedValue);
		};
		
		this.size = function() {
			return ba.length;
		};
	};
	
})(typeof exports === 'undefined'? this : exports);