import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

class ReadCVS {
    String Name;
    String HName;
    String EDate;
    String HDate;
    String Pic01;
    String Pic02;
    String FBook;
    String Comment01;

    private String fixQuotes(String name){
       String NameHold = name.substring(1, name.length() - 1);
       NameHold = NameHold.replaceAll("\"", "'");
       return "\"" + NameHold + "\"";
    }

    public void parseLine(String line){
	String[] arr = line.split("\\|");
	//System.out.println(line);
	Name = arr[0];
	HName = arr[1];
	EDate = arr[2];
	HDate = arr[3];
	Pic01 = arr[4];
	Pic02 = arr[5];
	FBook = arr[6];
	Comment01 = arr[7];

	Name = fixQuotes(Name); 
	HName = fixQuotes(HName);
	String oline = "'{\"Name\":" + Name + ",\"HName\":" + HName + ",\"EDate\":" + EDate + ",\"HDate\":" + HDate + ",\"Pic01\":" + Pic01 + ","; 
	oline += "\"Pic02\":" + Pic02 + ",\"FBook\":\"www.facebook.com\",\"Comments01\":" + Comment01 + "},' + ";
	System.out.println(oline);
	//for(int i=0; i<arr.length; i++){
	//	System.out.println("\n==> " + arr[i]);
	//}
    }

    public void run() throws IOException {
        try {

            File f = new File("./data/inLoad");
            BufferedReader b = new BufferedReader(new FileReader(f));
            String readLine = "";
            System.out.println("Reading file using Buffered Reader");
            while ((readLine = b.readLine()) != null) {
		parseLine(readLine);
                //System.out.println(readLine);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}

public class RunReadCVS {
	public static void main(String[] args) throws IOException {
		ReadCVS rCVS = new ReadCVS();
		rCVS.run();
	}
}

