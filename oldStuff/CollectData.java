import java.io.*;
import java.util.*;

class CollectDataWork {
	FileInputStream in = null;
	FileOutputStream out = null;

	ArrayList<String> pathArray = new ArrayList<String>();
	
	public CollectDataWork() throws IOException {
		getFiles();	
		openOutFile();
		startItOff();
		collectData();
	}

	private void openOutFile() throws IOException{
		out = new FileOutputStream("./data/all.emkproject");
	}

	private void startItOff() throws IOException {
        	String FirstString = "var YahrzeitList = '{ \"Yahrzeits\": [' +";
		for(int i=0; i < FirstString.length(); i++){
			out.write(FirstString.charAt(i));
		}
		out.write('\n');
	}

 	private void collectData() throws IOException {
		int c;
		System.out.println("Number of files: " + pathArray.size());
		//out.write('\'');
		for(int i=0; i < pathArray.size(); i++){
			in = new FileInputStream(pathArray.get(i));
			out.write('\'');
			while(( c = in.read())!= -1){
				out.write(c);
			}
			if(i < pathArray.size()-1){
				out.write(',');
				out.write('\'');
				out.write('+');
				out.write('\n');
			}
		}
		out.write(']');
		out.write('}');
		out.write('\'');
		out.write(';');
		out.write('\n');
	}
	
	private void getFiles(){
	      	File file = null;
      		String[] paths;
		
      		try {      
         		file = new File("./data/");
         		paths = file.list();
         		for(String path:paths) {
	    			if(path.length() < 12) continue;
				//System.out.println("{" + path.substring(path.length() - 11) + "}");
	    			if(path.substring(path.length() - 11).equals(".emkproject")){
					pathArray.add("./data/" + path);
	    			}
			}	
      		} catch (Exception e) {
         		e.printStackTrace();
      		}
	}

	public void printFiles(){
		for(int i=0; i<pathArray.size(); i++){
			System.out.println(pathArray.get(i));
		}
	}
}

class CollectData{
	public static void main(String [] argv) throws IOException  {
		CollectDataWork cdw = new CollectDataWork();
		//cdw.printFiles();
	}
}
