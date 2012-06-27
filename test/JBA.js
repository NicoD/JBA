var JBA_URL = "http://localhost/jba/";

test( "unsigned byte overflow", function() {
	var jba = new JBA();
	
	ok(!jba.isUnsignedByteValid(256), "testing 256");
	ok(!jba.isUnsignedByteValid(-1), "testing -1");	
	ok(jba.isUnsignedByteValid(0), "testing 0");
	ok(jba.isUnsignedByteValid(255), "testing 255");	
});


test( "byte overflow", function() {
	var jba = new JBA();
	
	ok(!jba.isByteValid(128), "testing 128");
	ok(!jba.isByteValid(-129), "testing -129");	
	ok(jba.isByteValid(-127), "testing -127");
	ok(jba.isByteValid(127), "testing 127");
	ok(jba.isByteValid(0), "testing 0");	
});


test( "unsigned short overflow", function() {
	var jba = new JBA();
	
	ok(!jba.isUnsignedShortValid(65536), "testing 65536");
	ok(!jba.isUnsignedShortValid(-1), "testing -1");	
	ok(jba.isUnsignedShortValid(0), "testing 0");
	ok(jba.isUnsignedShortValid(65535), "testing 65535");	
});


test( "short overflow", function() {
	var jba = new JBA();
	
	ok(!jba.isShortValid(32768), "testing 32768");
	ok(!jba.isShortValid(-32769), "testing -32769");	
	ok(jba.isShortValid(-32768), "testing -32768");
	ok(jba.isShortValid(32767), "testing 32767");
	ok(jba.isShortValid(0), "testing 0");	
});


test( "unsigned int overflow", function() {
	var jba = new JBA();
	
	ok(!jba.isUnsignedIntValid(4294967296), "testing 4294967296");
	ok(!jba.isUnsignedIntValid(-1), "testing -1");	
	ok(jba.isUnsignedIntValid(0), "testing 0");
	ok(jba.isUnsignedIntValid(4294967295), "testing 4294967295");	
});


test( "int overflow", function() {
	var jba = new JBA();
	
	ok(!jba.isIntValid(2147483648), "testing 2147483648");
	ok(!jba.isIntValid(-2147483649), "testing −2147483649");	
	ok(jba.isIntValid(-2147483648), "testing -2147483648");
	ok(jba.isIntValid(2147483647), "testing 2147483647");
	ok(jba.isIntValid(0), "testing 0");	
});



//byte => 1 byte length
test( "test unsigned byte length", function() {
	var jba;
	
	jba = new JBA();
	jba.writeUnsignedByte(0);	
	ok(jba.size() === 1);

	jba = new JBA();
	jba.writeUnsignedByte(255);
	ok(jba.size() === 1);
});


// byte => 1 byte length
test( "test byte length", function() {
	var jba;
	
	jba = new JBA();
	jba.writeByte(-128);	
	ok(jba.size() === 1);

	jba = new JBA();
	jba.writeByte(127);
	ok(jba.size() === 1);
});


//short => 2 byte length
test( "test unsigned short length", function() {
	var jba;
	
	jba = new JBA();
	jba.writeUnsignedShort(0);	
	ok(jba.size() === 2);

	jba = new JBA();
	jba.writeUnsignedShort(65535);
	ok(jba.size() === 2);
});


// short => 2 byte length
test( "test short length", function() {
	var jba;
	
	jba = new JBA();
	jba.writeShort(-32768);	
	ok(jba.size() === 2);

	jba = new JBA();
	jba.writeShort(32767);
	ok(jba.size() === 2);
});


//int => 4 byte length
test( "test unsigned int length", function() {
	var jba;
	
	jba = new JBA();
	jba.writeUnsignedInt(0);	
	ok(jba.size() === 4);

	jba = new JBA();
	jba.writeUnsignedInt(4294967295);
	ok(jba.size() === 4);
});


// int => 4 byte length
test( "test int length", function() {
	var jba;
	
	jba = new JBA();
	jba.writeInt(-2147483648);	
	ok(jba.size() === 4);

	jba = new JBA();
	jba.writeInt(2147483647);
	ok(jba.size() === 4);
});

test( "read unsigned byte", function() {
	var jba, value;
	
	jba = new JBA();
	jba.writeUnsignedByte(0);
	jba.position = 0;
	value = jba.readUnsignedByte();
	ok(value === 0, "writing / reading 0");
	
	jba = new JBA();
	jba.writeUnsignedByte(255);
	jba.position = 0;
	value = jba.readUnsignedByte();
	ok(value === 255, "writing / reading 255");
	
	jba = new JBA();
	jba.writeUnsignedByte(121);
	jba.position = 0;
	value = jba.readUnsignedByte();
	ok(value === 121, "writing / reading 121");	
});

test( "read byte", function() {
	var jba, value;
	
	jba = new JBA();
	jba.writeByte(0);
	jba.position = 0;
	value = jba.readByte();
	ok(value === 0, "writing / reading 0");
	
	jba = new JBA();
	jba.writeByte(-128);
	jba.position = 0;
	value = jba.readByte();
	ok(value === -128, "writing / reading -128");
	
	jba = new JBA();
	jba.writeByte(127);
	jba.position = 0;
	value = jba.readByte();
	ok(value === 127, "writing / reading 127");
	
	
	jba = new JBA();
	jba.writeByte(118);
	jba.position = 0;
	value = jba.readByte();
	ok(value === 118, "writing / reading 118");	
	
	jba.position = 0;
	jba.writeByte(-103);
	jba.position = 0;
	value = jba.readByte();	
	ok(value === -103, "writing / ready -103");
	
});

test( "read unsigned short", function() {
	var jba, value;
	
	jba = new JBA();
	jba.writeUnsignedShort(0);
	jba.position = 0;
	value = jba.readUnsignedShort();
	ok(value === 0, "writing / reading 0");		
	
	jba = new JBA();
	jba.writeUnsignedShort(65535);
	jba.position = 0;
	value = jba.readUnsignedShort();
	ok(value === 65535, "writing / reading 65535");		
	
	jba = new JBA();
	jba.writeUnsignedShort(43212);
	jba.position = 0;
	value = jba.readUnsignedShort();
	ok(value === 43212, "writing / reading 43212");	
});


test( "read short", function() {
	var jba, value;
	
	jba = new JBA();
	jba.writeShort(0);
	jba.position = 0;
	value = jba.readShort();
	ok(value === 0, "writing / reading 0");		

	jba = new JBA();
	jba.writeShort(-32768);
	jba.position = 0;
	value = jba.readShort();
	ok(value === -32768, "writing / reading -32768");		
	
	jba = new JBA();
	jba.writeShort(32767);
	jba.position = 0;
	value = jba.readShort();
	ok(value === 32767, "writing / reading 32767");		
	
	jba = new JBA();
	jba.writeShort(14212);
	jba.position = 0;
	value = jba.readShort();	
	ok(value === 14212, "writing / reading 14212");	
	
	jba = new JBA();
	jba.writeShort(-12272);
	jba.position = 0;
	value = jba.readShort();	
	ok(value === -12272, "writing / reading -12272");		
});


test( "read unsigned int", function() {
	var jba, value;
	
	jba = new JBA();
	jba.writeUnsignedInt(0);
	jba.position = 0;
	value = jba.readUnsignedInt();
	ok(value === 0, "writing / reading 0");		
	
	jba = new JBA();
	jba.writeUnsignedInt(4294967295);
	jba.position = 0;
	value = jba.readUnsignedInt();
	ok(value === 4294967295, "writing / reading 4294967295");		
	
	
	jba = new JBA();
	jba.writeUnsignedInt(4294967295);
	jba.position = 0;
	value = jba.readUnsignedInt();
	ok(value === 4294967295, "writing / reading 374239372");		
});


test( "read int", function() {
	var jba, value;
	
	jba = new JBA();
	jba.writeInt(0);
	jba.position = 0;
	value = jba.readInt();
	ok(value === 0, "writing / reading 0");		
	
	jba = new JBA();
	jba.writeInt(-2147483648);
	jba.position = 0;
	value = jba.readInt();
	ok(value === -2147483648, "writing / reading -2147483648");		
	
	jba = new JBA();
	jba.writeInt(2147483647);
	jba.position = 0;
	value = jba.readInt();
	ok(value === 2147483647, "writing / reading 2147483647");		
	
	
	jba = new JBA();
	jba.writeInt(1231231231);
	jba.position = 0;
	value = jba.readInt();
	ok(value === 1231231231, "writing / reading 1231231231");			
	
	jba = new JBA();
	jba.writeInt(-1894561237);
	jba.position = 0;
	value = jba.readInt();
	ok(value === -1894561237, "writing / reading -1894561237");				
});


// see TestEncoder.java
asyncTest( "read javaFile", function() {
	JBAjax(JBA_URL+"test/bjava.dat", 
		function(ob) {
			var jba = new JBA(ob.response);
			for (var i=-128; i<=127; i++) {
				ok(jba.readByte() == i);
			}
			for (var i=-32768; i<=32767; i++) {
				ok(jba.readShort() == i);
			}
			ok(jba.readInt() == 0);
			ok(jba.readInt() == -2147483648);
			ok(jba.readInt() == 1234567890);
			ok(jba.readInt() == 2147483647);			
			start();
	},
	function() {
		ok(false);
		start();
	});
	}
);


//see TestEncoder.as
asyncTest( "read as3File", function() {
	JBAjax(JBA_URL+"test/bas3.dat", 
		function(ob) {
			var jba = new JBA(ob.response);
			ok(jba.readByte() == -128);
			ok(jba.readByte() == 0);
			ok(jba.readByte() == 110);			
			ok(jba.readByte() == 127);
			ok(jba.readShort() == -32768);
			ok(jba.readShort() == 0);			
			ok(jba.readShort() == 32767);						
			ok(jba.readInt() == -2147483648);
			ok(jba.readInt() == 0);			
			ok(jba.readInt() == 2147483647);			
			ok(jba.readUnsignedInt() == 0);
			ok(jba.readUnsignedInt() == 3000000000);			
			ok(jba.readUnsignedInt() == 4294967295);						
			start();
		},
		function() {
			ok(false);
			start();			
		});
	}
);

// test JBAjax 404
asyncTest( "test 404", function() {
	JBAjax(JBA_URL+"test/404", 
		function() {
			ok(false);
			start();		
		},
		function() {
			ok(true);
			start();
		});
	}
);