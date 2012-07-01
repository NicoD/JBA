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

    function cbEmpty() {}
    
	function createRequest() {
		var xhr = null;
		if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}
		return xhr;
	}

	function getHead(url, cbSuccess, cbError) {

		var xhr = createRequest();
		if (xhr) {
			if (cbSuccess) {
				if (typeof(xhr.onload) !== "undefined") {
					xhr.onload = function() {
                        ((xhr.status === "200") ? cbSuccess : (cbError||cbEmpty))(this);
						xhr = null;
					};
				} else {
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							((xhr.status === "200") ? cbSuccess : (cbError||cbEmpty))(this);
							xhr = null;
						}
					};
				}
			}
			xhr.open("HEAD", url, true);
			xhr.send(null);
		} else {
			(cbError||cbEmpty)();
		}
	}
	


	function sendRequest(url, cbSuccess, cbError) {
		var xhr = createRequest();
		if (xhr) {

			if (cbSuccess) {

				if (typeof(xhr.onload) !== "undefined") {
					xhr.onload = function() {
						if (xhr.status === 200 || xhr.status === 206 || xhr.status === 0) {
							xhr.binaryResponse = xhr.responseText;
							xhr.fileSize = xhr.getResponseHeader("Content-Length");
							cbSuccess(xhr);
						} else {
							(cbError||cbEmpty)();
						}
						xhr = null;
					};

				} else {
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							if (xhr.status === 200 || xhr.status === 206 || xhr.status === 0) {
								var oRes = {
									status : xhr.status,
									binaryResponse : (typeof xhr.responseBody === "unknown" ? xhr.responseBody : xhr.responseText),
									fileSize : xhr.getResponseHeader("Content-Length")
								};
								cbSuccess(oRes);
							} else {
								(cbError||cbEmpty)();
							}
							xhr = null;
						}
					};
				}
			}
			xhr.open("GET", url, true);
			xhr.overrideMimeType('text/plain; charset=x-user-defined');
			xhr.send(null);
		} else {
			(cbError||cbEmpty)();
		}
	}

	return function(url, cbSuccess, cbError) {
			sendRequest(url, cbSuccess, cbError);
	};
}());
