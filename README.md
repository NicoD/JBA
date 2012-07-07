JBA (Javascript ByteArray)
=================================

**JBA** provides methods to read and write easily binary value

###Features###

 * support of reading / writing: bytes, ubytes, short, ushort, int, uint
 * load binary input
 * Big Endian byte order support
 * client side ans server side (nodejs) support
 * ajax helper to load binary data (client side)


###Performance###
The JBA class is not aimed to provide good performance. 
The bytes are stored in ArrayBuffer if they are available, otherwise, they are store in a basic int array (so each byte is stored as a 8 byte number (http://ecma262-5.com/ELS5_HTML.htm#Section_8.5)
Also, the code has not be yet optimize.


##Compatiblity##
Chrome 20.0 and >
Firefox 13.0.1 and >
Should be compatible with previous version of this browsers (not tested)

JBAjax not Compatible with IE

###Tests###

Tests are done using QUnit. Three kind of tests are done:

 * reading and writing from JBA
 * reading from JBA a binary file with content generated by the DataOutputstream java class
 * reading from JBA a binary file with content generated by the ByteArray as3 class

The java and as3 source are presents in the test folder.
The as3 is an air app to be able to write the file.

The run the tests, you have to launch the test.html through a web server since there is ajax calls.

The basic test configuration runs with http://localhost/test/test.html



###TODO###
 
 * add string writing ASCII (**DONE**) / UTF-8 / UTF16
 * add boolean support (**DONE**)
 * add ArrayBuffer implementation if available (**DONE**)
 * support Little Endian 
 * optimize the operations
 * add compatibility with IE9 for JBAjax