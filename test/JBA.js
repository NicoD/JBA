(function() {
    "use strict";

    /*jslint plusplus: true*/

    var JBA_URL = "http://localhost/jba/";
    
    
    test( "ASCCI char valid", function() {
        var jba = JBA.create();

        ok(jba.isASCIICharValid("a"), "testing a");
        ok(jba.isASCIICharValid("9"), "testing 9");	
        ok(!jba.isASCIICharValid("é"), "testing é");
        ok(!jba.isASCIICharValid("þ"), "testing þ");
    });
    
    test( "ASCCI string valid", function() {
        var jba = JBA.create();
    
        ok(jba.isASCIIStringValid("hello word"), "testing hello word");
        ok(jba.isASCIIStringValid("foo" + "\0" + "bar"), "testing foo[null char]bar");	
        ok(!jba.isASCIIStringValid("déjà"), "testing déjà");	
        ok(!jba.isASCIIStringValid("Россия"), "testing Россия");
    });
    
    test( "unsigned byte overflow", function() {
        var jba = JBA.create();
    
        ok(!jba.isUnsignedByteValid(256), "testing 256");
        ok(!jba.isUnsignedByteValid(-1), "testing -1");	
        ok(jba.isUnsignedByteValid(0), "testing 0");
        ok(jba.isUnsignedByteValid(255), "testing 255");	
    });
    
    
    test( "byte overflow", function() {
        var jba = JBA.create();
    
        ok(!jba.isByteValid(128), "testing 128");
        ok(!jba.isByteValid(-129), "testing -129");	
        ok(jba.isByteValid(-127), "testing -127");
        ok(jba.isByteValid(127), "testing 127");
        ok(jba.isByteValid(0), "testing 0");	
    });
    
    
    test( "unsigned short overflow", function() {
        var jba = JBA.create();
        
        ok(!jba.isUnsignedShortValid(65536), "testing 65536");
        ok(!jba.isUnsignedShortValid(-1), "testing -1");	
        ok(jba.isUnsignedShortValid(0), "testing 0");
        ok(jba.isUnsignedShortValid(65535), "testing 65535");	
    });
    
    
    test( "short overflow", function() {
        var jba = JBA.create();
        
        ok(!jba.isShortValid(32768), "testing 32768");
        ok(!jba.isShortValid(-32769), "testing -32769");	
        ok(jba.isShortValid(-32768), "testing -32768");
        ok(jba.isShortValid(32767), "testing 32767");
        ok(jba.isShortValid(0), "testing 0");	
    });
    
    
    test( "unsigned int overflow", function() {
        var jba = JBA.create();
        
        ok(!jba.isUnsignedIntValid(4294967296), "testing 4294967296");
        ok(!jba.isUnsignedIntValid(-1), "testing -1");	
        ok(jba.isUnsignedIntValid(0), "testing 0");
        ok(jba.isUnsignedIntValid(4294967295), "testing 4294967295");	
    });
    
    
    test( "int overflow", function() {
        var jba = JBA.create();
        
        ok(!jba.isIntValid(2147483648), "testing 2147483648");
        ok(!jba.isIntValid(-2147483649), "testing −2147483649");	
        ok(jba.isIntValid(-2147483648), "testing -2147483648");
        ok(jba.isIntValid(2147483647), "testing 2147483647");
        ok(jba.isIntValid(0), "testing 0");	
    });
    
    
    
    //byte => 1 byte length
    test( "test unsigned byte length", function() {
        var jba;
    	
        jba = JBA.create();
        jba.writeUnsignedByte(0);	
        ok(jba.size() === 1);
    
        jba = JBA.create();
        jba.writeUnsignedByte(255);
        ok(jba.size() === 1);
    });
    
    
    // byte => 1 byte length
    test( "test byte length", function() {
        var jba;
        
        jba = JBA.create();
        jba.writeByte(-128);	
        ok(jba.size() === 1);
    
        jba = JBA.create();
        jba.writeByte(127);
        ok(jba.size() === 1);
    });
    
    
    //short => 2 byte length
    test( "test unsigned short length", function() {
        var jba;
    
        jba = JBA.create();
        jba.writeUnsignedShort(0);	
        ok(jba.size() === 2);
    
        jba = JBA.create();
        jba.writeUnsignedShort(65535);
        ok(jba.size() === 2);
    });
    
    
    // short => 2 byte length
    test( "test short length", function() {
        var jba;
        
        jba = JBA.create();
        jba.writeShort(-32768);	
        ok(jba.size() === 2);
    
        jba = JBA.create();
        jba.writeShort(32767);
        ok(jba.size() === 2);
    });
    
    
    //int => 4 byte length
    test( "test unsigned int length", function() {
        var jba;
        
        jba = JBA.create();
        jba.writeUnsignedInt(0);	
        ok(jba.size() === 4);
    
        jba = JBA.create();
        jba.writeUnsignedInt(4294967295);
        ok(jba.size() === 4);
    });
    
    
    // int => 4 byte length
    test( "test int length", function() {
        var jba;
    
        jba = JBA.create();
        jba.writeInt(-2147483648);	
        ok(jba.size() === 4);
    
        jba = JBA.create();
        jba.writeInt(2147483647);
        ok(jba.size() === 4);
    });
    
    test( "test read bool", function() {
        var jba, value;
        
        jba = JBA.create();
        jba.writeBool(false);
        jba.reset();
        value = jba.readBool();
        ok(value === false, "writing / reading false");
    
    
        jba = JBA.create();
        jba.writeBool(true);
        jba.reset();
        value = jba.readBool();
        ok(value === true, "writing / reading true");
        
    
        jba = JBA.create();
        jba.writeBool("");
        jba.reset();
        value = jba.readBool();
        ok(value === false, "writing / reading empty string");	
    
        jba = JBA.create();
        jba.writeBool("true");
        jba.reset();
        value = jba.readBool();
        ok(value === false, "writing / reading string");		
    });
    
    
    test( "test read ASCII char", function() {
        var jba, value;
        
        jba = JBA.create();
        jba.writeASCIIChar("a");
        jba.reset();
        value = jba.readASCIIChar();
        ok(value === "a", "writing / reading a");
    
    
        jba = JBA.create();
        jba.writeASCIIChar("\n");
        jba.reset();
        value = jba.readASCIIChar();
        ok(value === "\n", "writing / reading \n");
        
        jba = JBA.create();
        jba.writeASCIIChar("\0");
        jba.reset();
        value = jba.readASCIIChar();
        ok(value === "\0", "writing / reading \0");
    });
    
    
    test( "test read ASCII string", function() {
        var jba, value;
    
        jba = JBA.create();
        jba.writeASCIIString("javascript");
        jba.reset();
        value = jba.readASCIIString();
        ok(value === "javascript", "writing / reading javascript");
    
        jba = JBA.create();
        jba.writeASCIIString("javascript", 200);
        jba.reset();
        value = jba.readASCIIString();
        ok(value === "javascript", "writing / reading javascript with bigger buffer");
   
        jba = JBA.create();
        jba.writeASCIIString("javascript", 4);
        jba.reset();
        value = jba.readASCIIString();
        ok(value === "java", "writing / reading javascript with lower buffer");
        
        jba = JBA.create();
        jba.writeASCIIString("java" + "\0" + "script");
        jba.reset();
        value = jba.readASCIIString();
        ok(value === "java", "writing / reading javascript with null char");	
    });
    
    
   test( "read unsigned byte", function() {
        var jba, value;
        
        jba = JBA.create();
        jba.writeUnsignedByte(0);
        jba.reset();
        value = jba.readUnsignedByte();
        ok(value === 0, "writing / reading 0");
        
        jba = JBA.create();
        jba.writeUnsignedByte(255);
        jba.reset();
        value = jba.readUnsignedByte();
        ok(value === 255, "writing / reading 255");
        
        jba = JBA.create();
        jba.writeUnsignedByte(121);
        jba.reset();
        value = jba.readUnsignedByte();
        ok(value === 121, "writing / reading 121");	
    });
    
    test( "read byte", function() {
        var jba, value;
        
        jba = JBA.create();
        jba.writeByte(0);
        jba.reset();
        value = jba.readByte();
        ok(value === 0, "writing / reading 0");
        
        jba = JBA.create();
        jba.writeByte(-128);
        jba.reset();
        value = jba.readByte();
        ok(value === -128, "writing / reading -128");
    
        jba = JBA.create();
        jba.writeByte(127);
        jba.reset();
        value = jba.readByte();
        ok(value === 127, "writing / reading 127");
        
        
        jba = JBA.create();
        jba.writeByte(118);
        jba.reset();
        value = jba.readByte();
        ok(value === 118, "writing / reading 118");	
        
        jba.reset();
        jba.writeByte(-103);
        jba.reset();
        value = jba.readByte();	
        ok(value === -103, "writing / ready -103");
        
    });
    
    test( "read unsigned short", function() {
        var jba, value;
        
        jba = JBA.create();
        jba.writeUnsignedShort(0);
        jba.reset();
        value = jba.readUnsignedShort();
        ok(value === 0, "writing / reading 0");		
        
        jba = JBA.create();
        jba.writeUnsignedShort(65535);
        jba.reset();
        value = jba.readUnsignedShort();
        ok(value === 65535, "writing / reading 65535");		
        
        jba = JBA.create();
        jba.writeUnsignedShort(43212);
        jba.reset();
        value = jba.readUnsignedShort();
        ok(value === 43212, "writing / reading 43212");	
    });
    
    
    test( "read short", function() {
        var jba, value;
        
        jba = JBA.create();
        jba.writeShort(0);
        jba.reset();
        value = jba.readShort();
        ok(value === 0, "writing / reading 0");		
   
        jba = JBA.create();
        jba.writeShort(-32768);
        jba.reset();
        value = jba.readShort();
        ok(value === -32768, "writing / reading -32768");		
        
        jba = JBA.create();
        jba.writeShort(32767);
        jba.reset();
        value = jba.readShort();
        ok(value === 32767, "writing / reading 32767");		
        
        jba = JBA.create();
        jba.writeShort(14212);
        jba.reset();
        value = jba.readShort();	
        ok(value === 14212, "writing / reading 14212");	
    
        jba = JBA.create();
        jba.writeShort(-12272);
        jba.reset();
        value = jba.readShort();	
        ok(value === -12272, "writing / reading -12272");		
    });
    
    
    test( "read unsigned int", function() {
        var jba, value;
        
        jba = JBA.create();
        jba.writeUnsignedInt(0);
        jba.reset();
        value = jba.readUnsignedInt();
        ok(value === 0, "writing / reading 0");		
        
        jba = JBA.create();
        jba.writeUnsignedInt(3000000000);
        jba.reset();
        value = jba.readUnsignedInt();
        ok(value === 3000000000, "writing / reading 3000000000");		
        
        
        jba = JBA.create();     
        jba.writeUnsignedInt(4294967295);
        jba.reset();
        value = jba.readUnsignedInt();
        ok(value === 4294967295, "writing / reading 374239372");		
    });
    
    
    test( "read int", function() {
        var jba, value;
        
        jba = JBA.create();
        jba.writeInt(0);
        jba.reset();
        value = jba.readInt();
        ok(value === 0, "writing / reading 0");		
        
        jba = JBA.create();
        jba.writeInt(-2147483648);
        jba.reset();
        value = jba.readInt();
        ok(value === -2147483648, "writing / reading -2147483648");		
        
        jba = JBA.create();
        jba.writeInt(2147483647);
        jba.reset();
        value = jba.readInt();
        ok(value === 2147483647, "writing / reading 2147483647");		
        
        
        jba = JBA.create();
        jba.writeInt(1231231231);
        jba.reset();
        value = jba.readInt();
        ok(value === 1231231231, "writing / reading 1231231231");			
        
        jba = JBA.create();
        jba.writeInt(-1894561237);
        jba.reset();
        value = jba.readInt();
        ok(value === -1894561237, "writing / reading -1894561237");				
    });
    
    
    test("export as string" , function() {
        var jbaOut, jbaIn, value, output;
        
        jbaOut = JBA.create();
        jbaOut.writeByte(-32);
        jbaOut.writeByte(0);
        jbaOut.writeByte(-100); 
        jbaOut.writeByte(-110);	
        jbaOut.writeByte(115);	
        jbaOut.writeByte(10);
        jbaOut.writeShort(-32768);
        jbaOut.writeShort(0);			
        jbaOut.writeShort(32767);						
        jbaOut.writeInt(-2147483648);
        jbaOut.writeInt(0);			
        jbaOut.writeInt(2147483647);			
        jbaOut.writeUnsignedInt(0);
        jbaOut.writeUnsignedInt(8);        
        jbaOut.writeUnsignedInt(3000000000);			
        jbaOut.writeUnsignedInt(4294967295);						
        jbaOut.writeASCIIChar("z");			
        jbaOut.writeASCIIString("hello", 10);			
        jbaOut.writeBool(false);
        jbaOut.writeBool(true);
        
        output = jbaOut.toString();
        ok(output.length === 53);
    
        jbaIn = JBA.create(output);
        ok(jbaIn.readByte() === -32);
        ok(jbaIn.readByte() === 0);	
        ok(jbaIn.readByte() === -100);		
        ok(jbaIn.readByte() === -110);			
        ok(jbaIn.readByte() === 115);	
        ok(jbaIn.readByte() === 10);
        ok(jbaIn.readShort() === -32768);
        ok(jbaIn.readShort() === 0);	
        ok(jbaIn.readShort() === 32767);
        ok(jbaIn.readInt() === -2147483648);								
        ok(jbaIn.readInt() === 0);
        ok(jbaIn.readInt() === 2147483647);								
        ok(jbaIn.readUnsignedInt() === 0);
        ok(jbaIn.readUnsignedInt() === 8);        
        ok(jbaIn.readUnsignedInt() === 3000000000);
        ok(jbaIn.readUnsignedInt() === 4294967295);
        ok(jbaIn.readASCIIChar() === "z");
        ok(jbaIn.readASCIIString(10) === "hello");	
        ok(jbaIn.readBool() === false);		
        ok(jbaIn.readBool() === true);			
    });
    
    
    test("export as array buffer" , function() {
        var jbaOut, jbaIn, value, output;
        
        jbaOut = JBA.create();
        jbaOut.writeByte(-32);
        jbaOut.writeByte(0);
        jbaOut.writeByte(-100); 
        jbaOut.writeByte(-110); 
        jbaOut.writeByte(115);  
        jbaOut.writeByte(10);
        jbaOut.writeShort(-32768);
        jbaOut.writeShort(0);           
        jbaOut.writeShort(32767);                       
        jbaOut.writeInt(-2147483648);
        jbaOut.writeInt(0);         
        jbaOut.writeInt(2147483647);            
        jbaOut.writeUnsignedInt(0);
        jbaOut.writeUnsignedInt(8);        
        jbaOut.writeUnsignedInt(3000000000);            
        jbaOut.writeUnsignedInt(4294967295);                        
        jbaOut.writeASCIIChar("z");         
        jbaOut.writeASCIIString("hello", 10);           
        jbaOut.writeBool(false);
        jbaOut.writeBool(true);
        
        output = jbaOut.toArrayBuffer();
        ok(new Uint8Array(output).length === 53);
    
        jbaIn = JBA.create(output);
        ok(jbaIn.readByte() === -32);
        ok(jbaIn.readByte() === 0); 
        ok(jbaIn.readByte() === -100);      
        ok(jbaIn.readByte() === -110);          
        ok(jbaIn.readByte() === 115);   
        ok(jbaIn.readByte() === 10);
        ok(jbaIn.readShort() === -32768);
        ok(jbaIn.readShort() === 0);    
        ok(jbaIn.readShort() === 32767);
        ok(jbaIn.readInt() === -2147483648);                                
        ok(jbaIn.readInt() === 0);
        ok(jbaIn.readInt() === 2147483647);                             
        ok(jbaIn.readUnsignedInt() === 0);
        ok(jbaIn.readUnsignedInt() === 8);        
        ok(jbaIn.readUnsignedInt() === 3000000000);
        ok(jbaIn.readUnsignedInt() === 4294967295);
        ok(jbaIn.readASCIIChar() === "z");
        ok(jbaIn.readASCIIString(10) === "hello");  
        ok(jbaIn.readBool() === false);     
        ok(jbaIn.readBool() === true);          
    });
        
    // see TestEncoder.java
    asyncTest( "read javaFile", function() {
        JBAjax(JBA_URL+"test/bjava.dat", 
            function(ob) {
                var i, jba = JBA.create(ob.response);
                for (i=-128; i<=127; i++) {
                    ok(jba.readByte() === i);
                }
                for (i=-32768; i<=32767; i++) {
                    ok(jba.readShort() === i);
                }
                ok(jba.readInt() === 0);
                ok(jba.readInt() === -2147483648);
                ok(jba.readInt() === 1234567890);
                ok(jba.readInt() === 2147483647);			
                start();
        },
        function() {
            ok(false);
            start();
        });
    });    
    
    //see TestEncoder.as
    asyncTest( "read as3File", function() {
        JBAjax(JBA_URL+"test/bas3.dat", 
            function(ob) {
                var jba = JBA.create(ob.response);
                ok(jba.readByte() === -128);
                ok(jba.readByte() === 0);
                ok(jba.readByte() === 110);			
                ok(jba.readByte() === 127);
                ok(jba.readShort() === -32768);
                ok(jba.readShort() === 0);			
                ok(jba.readShort() === 32767);						
                ok(jba.readInt() === -2147483648);
                ok(jba.readInt() === 0);			
                ok(jba.readInt() === 2147483647);			
                ok(jba.readUnsignedInt() === 0);
                ok(jba.readUnsignedInt() === 3000000000);			
                ok(jba.readUnsignedInt() === 4294967295);						
                start();
            },
            function() {
                ok(false);
                start();			
            }
        );
    });
    
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
            }
        );
    });
    
}());