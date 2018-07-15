import java.util.*;
import java.io.*;

class Enter {
	int choice = 0;
	String name;
	String hname;
	String edate;
	String hdate;
	String pic01;
	String pic02;
	String fbook;
	String comments01;

	public Enter(){
		setChoice(1);
	}

	public Enter(int choice){
		setChoice(choice);
	}

	public int getChoice(){
		return choice;
	}

	public void setChoice(int choice){
		if(choice > 2) return;
		this.choice = choice;
	}

	public void getInput(){
		Scanner s = new Scanner(System.in);

		System.out.print("Name: ");
		this.name = s.nextLine();

		System.out.print("Hebrew Name: ");
		this.hname = s.nextLine();

		System.out.print("English Date (Month day, year): ");
		this.edate = s.nextLine();

                System.out.print("Hebrew Date (Day Month, year): ");
                this.hdate = s.nextLine();

		System.out.print("Old Picture: ");
		this.pic01 = s.nextLine();

		System.out.print("Recent Picture: ");
		this.pic02 = s.nextLine();

		System.out.print("Facebook Page: ");
		this.fbook = s.nextLine();

		System.out.print("Comments: ");
		this.comments01 = s.nextLine();

	}

	public void processInput(int in){
		if(in == 1){
			getInput();
		}
	}	

	public void runMenu(){
		System.out.println("****************************");
		System.out.println("** 1) Enter Person        **");
		System.out.println("**                        **");
		System.out.println("** 2) End                 **");
		System.out.println("** This is a prototype    **");
		System.out.println("** Mistake? Control C and **");
		System.out.println("** Start over! 	      **"); 
		System.out.println("****************************");
		System.out.print("Enter >> ");
	}

	public int inputChoice(){
		Scanner s = new Scanner(System.in);
		return s.nextInt();
	}

	public void printLast(){
		System.out.println("Name: " + name);
		System.out.println("Hebrew Name: " + hname);
		System.out.println("English Date: " + edate);
		System.out.println("Hebrew Date: " + hdate);
		System.out.println("Old Picture: " + pic01);
		System.out.println("Recent Picture: " + pic02);
		System.out.println("Comments: " + comments01);
	}

	public void saveFile()  throws IOException {
		FileOutputStream out = null;
		String str = "{\"Name\":\"" + this.name + "\",\"HName\":\"" + this.hname + "\",\"EDate\":\"" + this.edate + "\",\"HDate\":\"" + this.hdate + "\"";      
		str += ",\"Pic01\":\"" + this.pic01 + "\",\"Pic02\":\"" + this.pic02 + "\",\"FBook\":\"" + this.fbook + "\",\"Comments01\":\"" + this.comments01 + "\"}";
		try {
			out = new FileOutputStream("./data/" + name + ".emkproject");
			for(int i=0; i < str.length(); i++){
					out.write(str.charAt(i));
			}
		} finally {
			if(out != null){
				out.close();
			}
		}
	}
}
