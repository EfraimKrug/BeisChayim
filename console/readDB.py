import tkinter as tk
from tkinter import ttk
from tkinter import filedialog
from dataInterface import *
from SearchNames import *
import tkinter.scrolledtext as tkst

from profile import *

class Demo1:
    def __init__(self, master):
        self.dataI = dataInterface(1, [])
        self.data = self.dataI.getData()
        self.searchObj = SearchNames(34, self.data)

        self.master = master
        self.master.configure(bg="teal", pady=34, padx=17)
        self.master.geometry('675x225')
        self.master.title('Edit Your Display Data')

        self.frame = tk.Frame(self.master, width=460, height=360)
        self.frame.configure(bg="teal", pady=3, padx=3)
        self.frame.grid(row=1, column=1)

        self.l1 = tk.Label(self.frame, text="Search: ", bg="teal", fg="yellow")
        self.l1.grid(row=1, column=2, padx=4, pady=4, sticky=tk.W)

        self.D1 = tk.Label(self.frame, text="                    ", bg="teal", fg="yellow")
        self.D1.grid(row=1, column=12, padx=4, pady=4, sticky=tk.W)

        self.button0 = tk.Button(self.frame, text="Edit Entry", command =self.new_window)
        self.button0.grid(row=1, column=13, columnspan=4, padx=4, pady=4, sticky=tk.EW)

        self.button1 = tk.Button(self.frame, text="New Entry", command =self.new_empty_window)
        self.button1.grid(row=2, column=13, columnspan=4, padx=4, pady=4, sticky=tk.EW)

        self.button2 = tk.Button(self.frame, text="Configuration", command =self.new_config_window)
        self.button2.grid(row=3, column=13, columnspan=4, padx=4, pady=4, sticky=tk.EW)


        self.txt = tk.Entry(self.frame, width=45,  borderwidth=2, relief="sunken")
        #self.txt.place(x=210, y=210, bordermode=tk.OUTSIDE, height=30, width=150)
        self.txt.bind("<Key>", self.getEachKeyStroke)
        self.txt.bind("<Up>", self.upArrow)
        self.txt.bind("<Down>", self.downArrow)
        self.txt.bind("<Return>", self.pre_new_window)

        self.txt.focus()
        self.txt.grid(row=2, column=2, columnspan=4, padx=4, pady=4, sticky=tk.E)

        self.responseLabel = tk.Label(self.frame, text="", bg="teal", fg="yellow")
        self.responseLabel.grid(row=7, rowspan=2, column=1, columnspan=4, padx=4, pady=4, sticky=tk.W)

        self.OutLabel = tk.Label(self.frame, text="", bg="teal", fg="yellow")
        self.OutLabel.grid(row=9, rowspan=2, column=1, columnspan=4, padx=4, pady=4, sticky=tk.W)

    def getEachKeyStroke(self, key):
        self.searchObj.getEachStroke(key)
        self.setOutlabel(self.searchObj.getTargetName())

    def setOutlabel(self, newLabel):
        self.OutLabel['text'] = newLabel

    def upArrow(self, key):
        self.searchObj.upArrow(key, self.setOutlabel)

    def downArrow(self, key):
        self.searchObj.downArrow(key, self.setOutlabel)

    def pre_new_window(self, key):
        self.new_window()

    def new_empty_window(self):
        self.newWindow = tk.Toplevel(self.master)
        self.app = Demo2(self.newWindow, self.searchObj.getNewEntry())

    def new_config_window(self):
        self.newWindow = tk.Toplevel(self.master)
        self.app = Demo3(self.newWindow)

    def new_window(self):
        self.newWindow = tk.Toplevel(self.master)
        self.app = Demo2(self.newWindow, self.searchObj.getTargetEntry())
#############################################################
class Demo2:
    def __init__(self, master, data):
        self.dataI = dataInterface(1, [])
        self.dataI.getData()

        self.master = master
        self.master.configure(bg="teal", pady=34, padx=17)
        self.master.geometry('900x600')
        self.data = data
        self.master.title(self.data['Name'])

        #self.frame = tk.Frame(self.master)
        self.frame = tk.Frame(self.master, width=850, height=530)
        self.frame.configure(bg="teal", pady=3, padx=3)
        self.frame.grid(row=1, column=1)

        self.l = tk.Label(self.frame, text=self.data['HName'], bg="teal", fg="yellow")
        self.l.grid(row=1, column=2, padx=4, pady=4, sticky=tk.W)

        self.l0 = tk.Label(self.frame, text="English Name: ", bg="teal", fg="yellow")
        self.l0.grid(row=2, column=1, padx=4, pady=4, sticky=tk.W)
        self.txt0 = tk.Entry(self.frame, width=25,  borderwidth=2, relief="sunken")
        self.txt0.focus()
        self.txt0.grid(row=2, column=3, columnspan=2, padx=4, pady=4, sticky=tk.E)
        self.txt0.insert(0, self.data['Name'])


        self.l1 = tk.Label(self.frame, text="Hebrew Name: ", bg="teal", fg="yellow")
        self.l1.grid(row=3, column=1, padx=4, pady=4, sticky=tk.W)
        self.txt1 = tk.Entry(self.frame, width=25,  borderwidth=2, relief="sunken")
        self.txt1.focus()
        self.txt1.grid(row=3, column=3, columnspan=2, padx=4, pady=4, sticky=tk.E)
        self.txt1.insert(0, self.data['HName'])

        self.l2 = tk.Label(self.frame, text="Gregorian Date: ", bg="teal", fg="yellow")
        self.l2.grid(row=4, column=1, padx=4, pady=4, sticky=tk.W)
        self.txt2 = tk.Entry(self.frame, width=25,  borderwidth=2, relief="sunken")
        self.txt2.focus()
        self.txt2.grid(row=4, column=3, columnspan=2, padx=4, pady=4, sticky=tk.E)
        self.txt2.insert(0, self.data['EDate'])

        self.l3 = tk.Label(self.frame, text="Hebrew Date: ", bg="teal", fg="yellow")
        self.l3.grid(row=5, column=1, padx=4, pady=4, sticky=tk.W)
        self.txt3 = tk.Entry(self.frame, width=25,  borderwidth=2, relief="sunken")
        self.txt3.focus()
        self.txt3.grid(row=5, column=3, columnspan=2, padx=4, pady=4, sticky=tk.E)
        self.txt3.insert(0, self.data['HDate'])

        payAmounts = [1,2,3,4]
        self.variable = tk.StringVar(self.frame)
        idx = payAmounts.index(int(self.data['PayLevel']))
        self.variable.set(payAmounts[idx]) # default value

        self.l4 = tk.Label(self.frame, text="Pay Level: ", bg="teal", fg="yellow")
        self.l4.grid(row=6, column=1, padx=4, pady=4, sticky=tk.W)

        self.dropDown4 =tk.OptionMenu(self.frame, self.variable, *payAmounts)
        self.dropDown4.config(bg = "teal", relief="raised")
        self.dropDown4.grid(row=6, column=3,  columnspan=2, padx=4, pady=4, sticky=tk.E)

        self.variable.trace('w', self.get_dropdown)

        self.l5 = tk.Label(self.frame, text="Comment Text: ", bg="teal", fg="yellow")
        self.l5.grid(row=7, column=1, padx=4, pady=4, sticky=tk.W)
        self.textfield5 = tk.Text(self.frame, wrap=tk.WORD, height=6, width=40 )
        self.textfield5.grid(row=7, rowspan=2, column=2, columnspan=2, padx=4, pady=4, sticky=tk.NSEW)
        self.textfield5.insert(tk.INSERT, self.data['Comments01'].strip().replace("&comma",""))

        self.scrollbar = tk.Scrollbar(self.frame, command=self.textfield5.yview)
        self.textfield5.configure(yscrollcommand=self.scrollbar.set)
        #self.scrollbar.config(self.textfield5.yview)
        #self.grid()
        self.scrollbar.grid(column=4, row=7, rowspan=2,  sticky=tk.NS)

        txt = self.data['Pic01'] or "Nothing..."
        self.btn6 = tk.Button(self.frame, text="Get File", command=self.fileSelectv6)
        self.btn6.grid(row=3, column=5, padx=4, pady=4, sticky=tk.W)
        self.l6 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l6.grid(row=3, column=6, padx=4, pady=4, sticky=tk.W)

        txt = self.data['Pic02'] or "Nothing..."
        self.btn7 = tk.Button(self.frame, text="Get File", command=self.fileSelectv7)
        self.btn7.grid(row=4, column=5, padx=4, pady=4, sticky=tk.W)
        self.l7 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l7.grid(row=4, column=6, padx=4, pady=4, sticky=tk.W)

        txt = self.data['PDF01'] or "Nothing..."
        self.btn8 = tk.Button(self.frame, text="Get File", command=self.fileSelectv8)
        self.btn8.grid(row=5, column=5, padx=4, pady=4, sticky=tk.W)
        self.l8 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l8.grid(row=5, column=6, padx=4, pady=4, sticky=tk.W)

        txt = self.data['PDF02'] or "Nothing..."
        self.btn9 = tk.Button(self.frame, text="Get File", command=self.fileSelectv9)
        self.btn9.grid(row=6, column=5, padx=4, pady=4, sticky=tk.W)
        self.l9 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l9.grid(row=6, column=6, padx=4, pady=4, sticky=tk.W)

        txt = self.data['PDF03'] or "Nothing..."
        self.btn10 = tk.Button(self.frame, text="Get File", command=self.fileSelectv10)
        self.btn10.grid(row=7, column=5, padx=4, pady=4, sticky=tk.W)
        self.l10 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l10.grid(row=7, column=6, padx=4, pady=4, sticky=tk.W)

        txt = self.data['PDF04'] or "Nothing..."
        self.btn11 = tk.Button(self.frame, text="Get File", command=self.fileSelectv11)
        self.btn11.grid(row=8, column=5, padx=4, pady=4, sticky=tk.W)
        self.l11 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l11.grid(row=8, column=6, padx=4, pady=4, sticky=tk.W)

        txt = self.data['PDF05'] or "Nothing..."
        self.btn12 = tk.Button(self.frame, text="Get File", command=self.fileSelectv12)
        self.btn12.grid(row=9, column=5, padx=4, pady=4, sticky=tk.W)
        self.l12 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l12.grid(row=9, column=6, padx=4, pady=4, sticky=tk.W)

        self.saveButton = tk.Button(self.frame, text="Save", width = 13, command =self.saveData)
        self.saveButton.grid(row=13, column=3, padx=4, pady=4, sticky=tk.E)

        self.quitButton = tk.Button(self.frame, text = 'Quit', width = 13, command = self.close_windows)
        self.quitButton.grid(row=13, column=2, padx=4, pady=4, sticky=tk.E)

        #print(data)

    def fileSelectv6(self):
        self.fileSelect(6)

    def fileSelectv7(self):
        self.fileSelect(7)

    def fileSelectv8(self):
        self.fileSelect(8)

    def fileSelectv9(self):
        self.fileSelect(9)

    def fileSelectv10(self):
        self.fileSelect(10)

    def fileSelectv11(self):
        self.fileSelect(11)

    def fileSelectv12(self):
        self.fileSelect(12)


    def fileSelect(self, choice):
        self.pic01 = ""
        if choice < 8:
            self.pic01 =  filedialog.askopenfilename(initialdir = picDir,title = "Select file",filetypes = (("jpeg files","*.jpg"),("png files","*.png"),("all files","*.*")))
        else:
            self.pic01 =  filedialog.askopenfilename(initialdir = pdfDir,title = "Select file",filetypes = (("jpeg files","*.jpg"),("png files","*.png"),("all files","*.*")))
        self.pic01 = self.pic01[self.pic01.rfind('/')+1:]
        
        if choice == 6:
            self.l6.configure(text=self.pic01)
        if choice == 7:
            self.l7.configure(text=self.pic01)
        if choice == 8:
            self.l8.configure(text=self.pic01)
        if choice == 9:
            self.l9.configure(text=self.pic01)
        if choice == 10:
            self.l10.configure(text=self.pic01)
        if choice == 11:
            self.l11.configure(text=self.pic01)
        if choice == 12:
            self.l12.configure(text=self.pic01)

        #print (self.pic01)
    def get_dropdown(self, *args):
        print(self.variable.get())

    def getNewID(self):
        #print("getting new ID")
        lastID = str(self.dataI.getLastID())
        lastID = "99" + lastID[2:]
        lastID = int(lastID) + 1
        return lastID

    def saveData(self):

        self.data['Name'] = self.txt0.get()
        self.data['HName'] = self.txt1.get()
        self.data['EDate'] = self.txt2.get()
        self.data['HDate'] = self.txt3.get()
        self.data['Comments01'] = self.textfield5.get('1.0', tk.END).replace("\n","")
        self.data['PayLevel'] = str(self.variable.get())

        self.data['Pic01'] = self.l6.cget('text').strip()[self.l6.cget('text').rfind('/')+1:]
        self.data['Pic02'] = self.l7.cget('text').strip()[self.l7.cget('text').rfind('/')+1:]

        self.data['PDF01'] = self.l8.cget('text').strip()[self.l8.cget('text').rfind('/')+1:]
        self.data['PDF02'] = self.l9.cget('text').strip()[self.l9.cget('text').rfind('/')+1:]
        self.data['PDF03'] = self.l10.cget('text').strip()[self.l10.cget('text').rfind('/')+1:]
        self.data['PDF04'] = self.l11.cget('text').strip()[self.l11.cget('text').rfind('/')+1:]
        self.data['PDF05'] = self.l12.cget('text').strip()[self.l12.cget('text').rfind('/')+1:]

        if self.data['Pic01'].find("Nothing...") > -1:
            self.data['Pic01'] = ""
        if self.data['Pic02'].find("Nothing...") > -1:
            self.data['Pic02'] = ""
        if self.data['PDF01'].find("Nothing...") > -1:
            self.data['PDF01'] = ""
        if self.data['PDF02'].find("Nothing...") > -1:
            self.data['PDF02'] = ""
        if self.data['PDF03'].find("Nothing...") > -1:
            self.data['PDF03'] = ""
        if self.data['PDF04'].find("Nothing...") > -1:
            self.data['PDF04'] = ""
        if self.data['PDF05'].find("Nothing...") > -1:
            self.data['PDF05'] = ""

        if(self.data['ID'].strip() == ""):
            self.data['ID'] = str(self.getNewID())

        if self.dataI.entryExists(self.data):
            print("replacing")
            self.dataI.replaceData(self.data)
        else:
            print("adding")
            self.dataI.addToData(self.data)

        self.dataI.writeStagingData(self.dataI.encodeData())
        self.master.destroy()

    def getEachKeyStroke(self, key):
        #print("getEachKeyStroke")
        self.searchObj.getEachStroke(key)
        self.setOutlabel(self.searchObj.getTargetName())

    def setOutlabel(self, newLabel):
        self.OutLabel['text'] = newLabel
        #self.OutLabel['text'] = self.searchObj.getOutLabel()

    def upArrow(self, key):
        #print("upArrow")
        self.searchObj.upArrow(key, self.setOutlabel)

    def downArrow(self, key):
        #print("downArrow")
        self.searchObj.downArrow(key, self.setOutlabel)


    def close_windows(self):
        self.master.destroy()
#######################################################################
class Demo3:
    def __init__(self, master):
        self.dataI = dataInterface(1, [])
        self.data = self.dataI.getConfig()
        self.varList = []
        self.style = ttk.Style()


        self.master = master
        self.master.configure(bg="teal", pady=34, padx=17)
        self.master.geometry('750x500')
        self.master.title('Beis Chayim Configuration')

        self.frame = tk.Frame(self.master, width=460, height=360)
        self.frame.configure(bg="teal", pady=3, padx=3)
        self.frame.grid(row=1, column=1)

        self.l1 = tk.Label(self.frame, text="Title: ", bg="blue", fg="yellow")
        self.l1.grid(sticky=tk.W, row=3, padx=17)

        #text box
        self.txt = tk.Entry(self.frame, width=45,  borderwidth=2, relief="sunken")
        self.txt.config(bg="blue", fg="yellow")
        self.txt.grid(sticky=tk.E, row=3, column=9)
        self.txt.insert(0, self.data['screen_title'])
        self.txt.focus()
        self.varList.append(self.txt)

#drop list for view type
        self.l2 = tk.Label(self.frame, text="View option: ", bg="blue", fg="yellow")
        self.l2.grid(sticky=tk.W, row=5, padx=17)

        views = [
        'List Memorial Plaques',
        'List Entries One by One',
        'Alternate'
        ]
        self.variable = tk.StringVar(self.frame)
        self.variable.set(views[int(self.data['display_type'])]) # default value
        self.varList.append(self.variable)
        self.w2 = tk.OptionMenu(self.frame, self.variable, *views)
        self.w2.grid(sticky=tk.E, row=5, column=9, pady=7)
        self.w2.config(bg = "blue", relief="raised")
    #drop list for time

        self.l3 = tk.Label(self.frame, text="Time for each entry: ", bg="blue", fg="yellow")
        self.l3.grid(sticky=tk.W, row=7, padx=17)

        times = [2,3,4,5,6,7,8,20,30,60]
        self.variable = tk.StringVar(self.frame)
        idx = times.index(int(self.data['time_factor']))
        self.variable.set(times[idx]) # default value

        self.w2 = tk.OptionMenu(self.frame, self.variable, *times)
        self.w2.config(bg = "blue", relief="raised")
        self.w2.grid(row=7, sticky=tk.E, column=9, pady=7)
        self.varList.append(self.variable)

    # password...
        self.l4 = tk.Label(self.frame, text="Password: ", bg="blue", fg="yellow")
        self.l4.grid(sticky=tk.W, row=9, padx=17)

        self.txt = tk.Entry(self.frame, width=1,  borderwidth=2, relief="sunken")
        self.txt.grid(sticky=tk.E, row=9, column=9, padx=1)
        self.txt.config(bg="blue", fg="yellow", width=20)
        self.txt.insert(0, self.data['password'])

        self.varList.append(self.txt)

        self.l5 = tk.Label(self.frame, text="Number of yahrzeits showing: ", bg="blue", fg="yellow")
        self.l5.grid(sticky=tk.W, row=11, padx=17)
        slots = [2,3,4,5,6,7]
        self.variable = tk.StringVar(self.frame)
        idx = times.index(int(self.data['slots']))
        self.variable.set(slots[idx]) # default value

        self.w2 = tk.OptionMenu(self.frame, self.variable, *slots)
        self.w2.config(bg = "blue", relief="raised")
        self.w2.grid(sticky=tk.E, row=11, column=9, pady=7)
        self.varList.append(self.variable)

        self.l6 = tk.Label(self.frame, text="Number of columns (plaque view): ", bg="blue", fg="yellow")
        self.l6.grid(sticky=tk.W, row=13, padx=17)
        self.variable = tk.StringVar(self.frame)
        cols = [2,3,4,5,6,7]
        idx = times.index(int(self.data['column_count']))
        self.variable.set(cols[idx]) # default value

        self.w2 = tk.OptionMenu(self.frame, self.variable, *cols)
        self.w2.config(bg = "blue", relief="raised")
        self.w2.grid(sticky=tk.E, row=13, column=9, pady=7)
        self.varList.append(self.variable)

        self.l7 = tk.Label(self.frame, text="Number of rows (plaque view): ", bg="blue", fg="yellow")
        self.l7.grid(sticky=tk.W, row=15, padx=17)
        self.variable = tk.StringVar(self.frame)
        rows = [2,3,4,5,6,7]
        for i in range(len(rows)):
            if rows[i] == int(self.data['row_count']):
                self.variable.set(rows[i]) # default value

        self.w2 = tk.OptionMenu(self.frame, self.variable, *rows)
        self.w2.config(bg = "blue", relief="raised")
        self.w2.grid(sticky=tk.E, row=15, column=9, pady=7)
        self.varList.append(self.variable)
        self.l8 = tk.Label(self.frame, text="Dates in Hebrew: ", bg="blue", fg="yellow")
        self.l8.grid(sticky=tk.W, row=17, padx=17)

        dType = ["Hebrew", "Gregorian"]
        self.variable = tk.StringVar(self.frame)
        self.variable.set(dType[int(self.data["dates_in_hebrew"])]) # default value

        self.w2 = tk.OptionMenu(self.frame, self.variable, *dType)
        self.w2.config(bg = "blue", relief="raised")
        self.w2.grid(sticky=tk.E, row=17, column=9, pady=7)
        self.varList.append(self.variable)

        self.style.map("C.TButton",
            foreground=[('pressed', 'red'), ('active', 'blue')],
            background=[('pressed', '!disabled', 'black'), ('active', 'yellow')]
            )

        self.btn = ttk.Button(self.frame, text="Quit", style="C.TButton", command=self.quitConfig)
        self.btn.grid(sticky=tk.SE, column=7, row=25, pady=7)

        self.btn = ttk.Button(self.frame, text="Save", style="C.TButton", command=self.saveConfig)
        #self.btn = tk.Button(self.frame, text="Save", command=self.saveConfig)
        self.btn.grid(sticky=tk.SE, column=9, row=25, pady=7)

    def getDisplayType(self):
        if self.varList[1].get() == "List Memorial Plaques":
            return "0"
        if self.varList[1].get() == "List Entries One by One":
            return "1"
        if self.varList[1].get() == "Alternate":
            return "2"
        return "2"

    def getDateType(self, val):
        if val == "Hebrew":
            return str(0)
        else:
            return str(1)

    def createConfig(self):
        displayType = "2"
        stng = "var ConfigList = '{ \"settings\": {\"display_type\":"
        displayType = self.getDisplayType()
        stng += "\"" + displayType + "\",\"time_factor\":"
        stng += "\"" + self.varList[2].get() + "\",\"password\":"
        stng += "\"" + self.varList[3].get() + "\",\"slots\":"
        stng += "\"" + self.varList[4].get() + "\",\"column_count\":"
        stng += "\"" + self.varList[5].get() + "\",\"row_count\":"
        stng += "\"" + self.varList[6].get() + "\",\"screen_title\":"
        stng += "\"" + self.varList[0].get() + "\",\"dates_in_hebrew\":"
        stng += "\"" + self.getDateType(self.varList[7].get()) + "\"}}';"
        #print(stng)
        return stng

    def saveConfig(self):
        #print ("saveConfig")
        self.dataI.writeNewConfig(self.createConfig())
        self.master.destroy()

    def quitConfig(self):
        #print("quit - not saving")
        self.master.destroy()


#######################################################################
def main():
    root = tk.Tk()
    app = Demo1(root)
    root.mainloop()

if __name__ == '__main__':
    main()
