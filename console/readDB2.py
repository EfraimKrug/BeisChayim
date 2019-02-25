import tkinter as tk
from tkinter import filedialog
from dataInterface import *
from SearchNames import *
import tkinter.scrolledtext as tkst

class Demo1:
    def __init__(self, master):
        self.dataI = dataInterface(1, [])
        self.data = self.dataI.getData()
        self.searchObj = SearchNames(34, self.data)

        self.master = master
        self.master.configure(bg="teal", pady=34, padx=17)
        self.master.geometry('500x400')
        self.master.title('Install/Re-install Your Display')

        self.frame = tk.Frame(self.master, width=450, height=430)
        self.frame.configure(bg="teal", pady=3, padx=3)
        self.frame.grid(row=1, column=1)

        self.l1 = tk.Label(self.frame, text="Search: ", bg="teal", fg="yellow")
        self.l1.grid(row=1, column=2, padx=4, pady=4, sticky=tk.W)

        self.button0 = tk.Button(self.frame, text="Click It", command =self.new_window)
        self.button0.grid(row=1, column=12, columnspan=4, padx=4, pady=4, sticky=tk.E)

        self.txt = tk.Entry(self.frame, width=45,  borderwidth=2, relief="sunken")
        self.txt.place(x=210, y=210, bordermode=tk.OUTSIDE, height=30, width=150)
        self.txt.bind("<Key>", self.getEachKeyStroke)
        self.txt.bind("<Up>", self.upArrow)
        self.txt.bind("<Down>", self.downArrow)
        self.txt.focus()
        self.txt.grid(row=4, column=2, columnspan=4, padx=4, pady=4, sticky=tk.E)

        self.responseLabel = tk.Label(self.frame, text="Response Label", bg="teal", fg="yellow")
        self.responseLabel.grid(row=7, rowspan=2, column=1, columnspan=4, padx=4, pady=4, sticky=tk.W)

        self.OutLabel = tk.Label(self.frame, text="Result Label", bg="teal", fg="yellow")
        self.OutLabel.grid(row=9, rowspan=2, column=1, columnspan=4, padx=4, pady=4, sticky=tk.W)


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

    def new_window(self):
        self.newWindow = tk.Toplevel(self.master)
        #print(self.searchObj.getTargetEntry())
        self.app = Demo2(self.newWindow, self.searchObj.getTargetEntry())
#############################################################
class Demo2:
    def __init__(self, master, data):
        self.master = master
        self.master.configure(bg="teal", pady=34, padx=17)
        self.master.geometry('900x600')
        self.master.title(data['Name'])

        #self.frame = tk.Frame(self.master)
        self.frame = tk.Frame(self.master, width=850, height=530)
        self.frame.configure(bg="teal", pady=3, padx=3)
        self.frame.grid(row=1, column=1)

        self.l = tk.Label(self.frame, text=data['HName'], bg="teal", fg="yellow")
        self.l.grid(row=1, column=2, padx=4, pady=4, sticky=tk.W)

        self.l0 = tk.Label(self.frame, text="English Name: ", bg="teal", fg="yellow")
        self.l0.grid(row=2, column=1, padx=4, pady=4, sticky=tk.W)
        self.txt0 = tk.Entry(self.frame, width=25,  borderwidth=2, relief="sunken")
        self.txt0.focus()
        self.txt0.grid(row=2, column=3, columnspan=2, padx=4, pady=4, sticky=tk.E)
        self.txt0.insert(0, data['Name'])


        self.l1 = tk.Label(self.frame, text="Hebrew Name: ", bg="teal", fg="yellow")
        self.l1.grid(row=3, column=1, padx=4, pady=4, sticky=tk.W)
        self.txt1 = tk.Entry(self.frame, width=25,  borderwidth=2, relief="sunken")
        self.txt1.focus()
        self.txt1.grid(row=3, column=3, columnspan=2, padx=4, pady=4, sticky=tk.E)
        self.txt1.insert(0, data['HName'])

        self.l2 = tk.Label(self.frame, text="Gregorian Date: ", bg="teal", fg="yellow")
        self.l2.grid(row=4, column=1, padx=4, pady=4, sticky=tk.W)
        self.txt2 = tk.Entry(self.frame, width=25,  borderwidth=2, relief="sunken")
        self.txt2.focus()
        self.txt2.grid(row=4, column=3, columnspan=2, padx=4, pady=4, sticky=tk.E)
        self.txt2.insert(0, data['EDate'])

        self.l3 = tk.Label(self.frame, text="Hebrew Date: ", bg="teal", fg="yellow")
        self.l3.grid(row=5, column=1, padx=4, pady=4, sticky=tk.W)
        self.txt3 = tk.Entry(self.frame, width=25,  borderwidth=2, relief="sunken")
        self.txt3.focus()
        self.txt3.grid(row=5, column=3, columnspan=2, padx=4, pady=4, sticky=tk.E)
        self.txt3.insert(0, data['HDate'])


        # self.responseLabel = tk.Label(self.frame, text="Response Label", bg="teal", fg="yellow")
        # self.responseLabel.grid(row=7, rowspan=2, column=1, columnspan=4, padx=4, pady=4, sticky=tk.W)
        #
        # self.OutLabel = tk.Label(self.frame, text="Result Label", bg="teal", fg="yellow")
        # self.OutLabel.grid(row=9, rowspan=2, column=1, columnspan=4, padx=4, pady=4, sticky=tk.W)
        #
        payAmounts = [1,2,3,4]
        variable = tk.StringVar(self.frame)
        idx = payAmounts.index(int(data['PayLevel']))
        variable.set(payAmounts[idx]) # default value

        self.l4 = tk.Label(self.frame, text="Pay Level: ", bg="teal", fg="yellow")
        self.l4.grid(row=6, column=1, padx=4, pady=4, sticky=tk.W)

        self.dropDown4 =tk.OptionMenu(self.frame, variable, *payAmounts)
        self.dropDown4.config(bg = "teal", relief="raised")
        self.dropDown4.grid(row=6, column=3,  columnspan=2, padx=4, pady=4, sticky=tk.E)

        self.l5 = tk.Label(self.frame, text="Comment Text: ", bg="teal", fg="yellow")
        self.l5.grid(row=7, column=1, padx=4, pady=4, sticky=tk.W)
        self.textfield5 = tkst.Text(self.frame, wrap=tk.WORD, height=6, width=40 )
        self.textfield5.grid(row=7, rowspan=2, column=2, columnspan=2, padx=4, pady=4, sticky=tk.NSEW)
        self.textfield5.insert(tk.INSERT, data['Comments01'].strip())

        self.scrollbar = tkst.Scrollbar(self.frame, command=self.textfield5.yview)
        self.textfield5.configure(yscrollcommand=self.scrollbar.set)
        #self.scrollbar.config(self.textfield5.yview)
        #self.grid()
        self.scrollbar.grid(column=4, row=7, rowspan=2,  sticky=tk.NS)

        txt = data['Pic01'] or "Nothing..."
        self.btn6 = tk.Button(self.frame, text="Get File", command=self.fileSelectv6)
        self.btn6.grid(row=3, column=5, padx=4, pady=4, sticky=tk.W)
        self.l6 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l6.grid(row=3, column=6, padx=4, pady=4, sticky=tk.W)

        txt = data['Pic02'] or "Nothing..."
        self.btn7 = tk.Button(self.frame, text="Get File", command=self.fileSelectv7)
        self.btn7.grid(row=4, column=5, padx=4, pady=4, sticky=tk.W)
        self.l7 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l7.grid(row=4, column=6, padx=4, pady=4, sticky=tk.W)

        txt = data['PDF01'] or "Nothing..."
        self.btn8 = tk.Button(self.frame, text="Get File", command=self.fileSelectv8)
        self.btn8.grid(row=5, column=5, padx=4, pady=4, sticky=tk.W)
        self.l8 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l8.grid(row=5, column=6, padx=4, pady=4, sticky=tk.W)

        txt = data['PDF02'] or "Nothing..."
        self.btn9 = tk.Button(self.frame, text="Get File", command=self.fileSelectv9)
        self.btn9.grid(row=6, column=5, padx=4, pady=4, sticky=tk.W)
        self.l9 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l9.grid(row=6, column=6, padx=4, pady=4, sticky=tk.W)

        txt = data['PDF03'] or "Nothing..."
        self.btn10 = tk.Button(self.frame, text="Get File", command=self.fileSelectv10)
        self.btn10.grid(row=7, column=5, padx=4, pady=4, sticky=tk.W)
        self.l10 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l10.grid(row=7, column=6, padx=4, pady=4, sticky=tk.W)

        txt = data['PDF04'] or "Nothing..."
        self.btn11 = tk.Button(self.frame, text="Get File", command=self.fileSelectv11)
        self.btn11.grid(row=8, column=5, padx=4, pady=4, sticky=tk.W)
        self.l11 = tk.Label(self.frame, text=txt, bg="teal", fg="yellow")
        self.l11.grid(row=8, column=6, padx=4, pady=4, sticky=tk.W)

        txt = data['PDF05'] or "Nothing..."
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
        self.pic01 =  filedialog.askopenfilename(initialdir = "/home/efraiim/code/BeisChayim/img",title = "Select file",filetypes = (("jpeg files","*.jpg"),("all files","*.*")))
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

    def saveData(self):
        #data['Name'] = self.txt0.get()
        #data['HName'] = self.txt1.get()
        #data['EDate'] = self.txt2.get()
        #data['HDate'] = self.txt3.get()
        #data['Comments01'] = self.textfield5.get()
        #data['Pic01'] = self.l6.cget('text')
        #data['Pic02'] = self.l7.cget('text')
        #data['PDF01'] = self.l8.cget('text')
        #data['PDF02'] = self.l9.cget('text')
        #data['PDF03'] = self.l10.cget('text')
        #data['PDF04'] = self.l11.cget('text')
        #data['PDF05'] = self.l12.cget('text')

        self.printl(self.txt0.get())
        self.printl(self.txt1.get())
        self.printl(self.txt2.get())
        self.printl(self.txt3.get())
        self.printl(self.textfield5.get("1.0", tk.END))

        self.printl(self.l6.cget('text'))
        self.printl(self.l7.cget('text'))
        self.printl(self.l8.cget('text'))
        self.printl(self.l9.cget('text'))
        self.printl(self.l10.cget('text'))
        self.printl(self.l11.cget('text'))
        self.printl(self.l12.cget('text'))

    def printl(self, text):
        print("[" + text + "]")

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

def main():
    root = tk.Tk()
    app = Demo1(root)
    root.mainloop()

if __name__ == '__main__':
    main()
