import tkinter as tk
from tkinter import ttk
from tkinter import filedialog
from dataInterface import *
from SearchNames import *
import tkinter.scrolledtext as tkst

from profile import *

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

    def getDisplayType():
        if self.varList[1].get() == "List Memorial Plaques":
            return "0"
        if self.varList[1].get() == "List Entries One by One":
            return "1"
        if self.varList[1].get() == "Alternate":
            return "2"
        return "2"

    def getDateType(val):
        if val == "Hebrew":
            return str(0)
        else:
            return str(1)

    def createConfig():
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
        return stng

    def saveConfig(self):
        self.dataI.writeNewConfig(self.createConfig())
        exit()

    def quitConfig(self):
        exit()

def main():
    root = tk.Tk()
    app = Demo3(root)
    root.mainloop()

if __name__ == '__main__':
    main()
