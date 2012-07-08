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
 * just an helper that perform ajax call to retrieve binary data
 * @see https://developer.mozilla.org/En/Using_XMLHttpRequest#Receiving_binary_data
 */
var JBAjax = (function() {
    "use strict";


    var cbEmpty, createRequest, sendRequest;

    cbEmpty = function() {};
    
	createRequest = function() {
		var xhr = null;
		if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}
		return xhr;
	};


	sendRequest = function(url, cbSuccess, cbError) {

		var xhr = createRequest();
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
				(cbError||cbEmpty)();
			}
			xhr = null;
		};
		xhr.send();
	};

	return function(url, cbSuccess, cbError) {
			sendRequest(url, cbSuccess, cbError);
	};
}());
