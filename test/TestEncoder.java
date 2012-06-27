import java.io.DataOutputStream;
import java.io.FileOutputStream;

public class TestEncoder {

	public static void main(String args[]) {
		try {
			FileOutputStream fos = new FileOutputStream("bjava.dat");
			 
			DataOutputStream dos = new DataOutputStream(fos);
			int i = 0;

			for (i = Byte.MIN_VALUE; i <= Byte.MAX_VALUE; i++) {
				dos.writeByte(i);
			}
			for (i = Short.MIN_VALUE; i <= Short.MAX_VALUE; i++) {
				dos.writeShort(i);
			}
			
			dos.writeInt(0);
			dos.writeInt(Integer.MIN_VALUE);
			dos.writeInt(1234567890);
			dos.writeInt(Integer.MAX_VALUE);
			
			dos.flush();
			dos.close();
		} catch (Exception e) {
			System.err.println(e);
			e.printStackTrace(System.err);
		}
		
		System.exit(0);
	}
}