from tkinter import *
from tkinter import ttk
from profile import *
import json


labelList = []
varList = []

oldData = dict()
runData = dict()
outDir = "."

filename = "/BCConfig"
runPhaseFile =  "/RunPhase"

def readOldConfig():
    with open(configDir + filename) as fl:
        for line in fl:
            varString = line[line.rfind("{")+1:line.find("}")]
            varData = varString.split(",")
            for x in varData:
                x = x.replace('\"','')
                y = x.split(":")
                oldData[y[0]] = y[1]

def readOldRunPhase():
    with open(configDir + runPhaseFile) as fl:
        for line in fl:
            varString = line[line.rfind("{")+1:line.find("}")]
            varData = varString.split(",")
            for x in varData:
                x = x.replace('\"','')
                y = x.split(":")
                runData[y[0]] = y[1]

def writeNewConfig(s):
    fd = open(outDir + filename, "w+")
    fd.write(s)
    fd.close()

def writeNewRunPhase():
    sec = "var RunPhase = { \"phase01\": {\"run_type\":\"security\"}};"
    view = "var RunPhase = { \"phase01\": {\"run_type\":\"view\"}};"
    fd = open(outDir + runPhaseFile, "w+")

    if varList[8].get() == "edit":
        fd.write(sec)
    else:
        fd.write(view)

    fd.close()

def getDisplayType():
    global varList
    #print("====>>>" + varList[1].get())
    if varList[1].get() == "List Memorial Plaques":
        return "0"
    if varList[1].get() == "List Entries One by One":
        return "1"
    if varList[1].get() == "Alternate":
        return "2"
    return "2"

def getDateType(val):
    if val == "Hebrew":
        return str(0)
    else:
        return str(1)

def createConfig():
    global varList
    displayType = "2"
    stng = "var ConfigList = '{ \"settings\": {\"display_type\":"
    displayType = getDisplayType()
    stng += "\"" + displayType + "\",\"time_factor\":"
    stng += "\"" + varList[2].get() + "\",\"password\":"
    stng += "\"" + varList[3].get() + "\",\"slots\":"
    stng += "\"" + varList[4].get() + "\",\"column_count\":"
    stng += "\"" + varList[5].get() + "\",\"row_count\":"
    stng += "\"" + varList[6].get() + "\",\"screen_title\":"
    stng += "\"" + varList[0].get() + "\",\"dates_in_hebrew\":"
    stng += "\"" + getDateType(varList[7].get()) + "\"}}';"
    return stng

def clicked():
    writeNewConfig(createConfig())
    writeNewRunPhase()

def configure_var():
    global labelList
    global varList

    window = Tk()
    window.configure(bg="blue", pady=34, padx=17)
    style = ttk.Style()

    window.title("Configure Beis Chayim")
    window.geometry('750x500')
#flat label

    l1 = Label(window, text="Title: ", bg="blue", fg="yellow")
    l1.grid(sticky=W, row=3, padx=17)
    #text box
    txt = Entry(window,width=45,  borderwidth=2, relief="sunken")
    txt.config(bg="blue", fg="yellow")
    txt.grid(sticky=E, row=3, column=9)
    txt.insert(0, oldData['screen_title'])
    txt.focus()
    varList.append(txt)

#drop list for view type
    l2 = Label(window, text="View option: ", bg="blue", fg="yellow")
    l2.grid(sticky=W, row=5, padx=17)

    views = [
    'List Memorial Plaques',
    'List Entries One by One',
    'Alternate'
    ]
    variable = StringVar(window)
    variable.set(views[int(oldData['display_type'])]) # default value
    varList.append(variable)
    w2 = OptionMenu(window, variable, *views)
    w2.grid(sticky=E, row=5, column=9, pady=7)
    w2.config(bg = "blue", relief="raised")
#drop list for time

    l3 = Label(window, text="Time for each entry: ", bg="blue", fg="yellow")
    l3.grid(sticky=W, row=7, padx=17)

    times = [2,3,4,5,6,7,8,20,30,60]
    variable = StringVar(window)
    variable.set(times[3]) # default value

    w2 = OptionMenu(window, variable, *times)
    w2.config(bg = "blue", relief="raised")
    w2.grid(row=7, sticky=E, column=9, pady=7)
    varList.append(variable)

# password...
    l4 = Label(window, text="Password: ", bg="blue", fg="yellow")
    l4.grid(sticky=W, row=9, padx=17)

    txt = Entry(window, width=1,  borderwidth=2, relief="sunken")
    txt.grid(sticky=E, row=9, column=9, padx=1)
    txt.config(bg="blue", fg="yellow", width=20)
    txt.insert(0, oldData['password'])

    varList.append(txt)

    l5 = Label(window, text="Number of yahrzeits showing: ", bg="blue", fg="yellow")
    l5.grid(sticky=W, row=11, padx=17)
    slots = [2,3,4,5,6,7]
    variable = StringVar(window)
    for i in range(len(slots)):
        if slots[i] == int(oldData['slots']):
            variable.set(slots[i]) # default value

    w2 = OptionMenu(window, variable, *slots)
    w2.config(bg = "blue", relief="raised")
    w2.grid(sticky=E, row=11, column=9, pady=7)
    varList.append(variable)

    l6 = Label(window, text="Number of columns (plaque view): ", bg="blue", fg="yellow")
    l6.grid(sticky=W, row=13, padx=17)
    variable = StringVar(window)
    cols = [2,3,4,5,6,7]
    for i in range(len(cols)):
        if cols[i] == int(oldData['column_count']):
            variable.set(cols[i]) # default value

    variable.set(cols[2]) # default value
    w2 = OptionMenu(window, variable, *cols)
    w2.config(bg = "blue", relief="raised")
    w2.grid(sticky=E, row=13, column=9, pady=7)
    varList.append(variable)

    l7 = Label(window, text="Number of rows (plaque view): ", bg="blue", fg="yellow")
    l7.grid(sticky=W, row=15, padx=17)
    variable = StringVar(window)
    rows = [2,3,4,5,6,7]
    for i in range(len(rows)):
        if rows[i] == int(oldData['row_count']):
            variable.set(rows[i]) # default value

    w2 = OptionMenu(window, variable, *rows)
    w2.config(bg = "blue", relief="raised")
    w2.grid(sticky=E, row=15, column=9, pady=7)
    varList.append(variable)
    l8 = Label(window, text="Dates in Hebrew: ", bg="blue", fg="yellow")
    l8.grid(sticky=W, row=17, padx=17)

    dType = ["Hebrew", "Gregorian"]
    variable = StringVar(window)
    variable.set(dType[int(oldData["dates_in_hebrew"])]) # default value

    w2 = OptionMenu(window, variable, *dType)
    w2.config(bg = "blue", relief="raised")
    w2.grid(sticky=E, row=17, column=9, pady=7)
    varList.append(variable)

#run phase
    l9 = Label(window, text="Run Phase: ", bg="blue", fg="yellow")
    l9.grid(sticky=W, row=19, padx=17)


    phases = ["Edit", "View"]
    variable = StringVar(window)

    if runData['run_type'] == "view":
        variable.set(phases[1]) # default value
    if runData['run_type'] == "security":
        variable.set(phases[0]) # default value

    varList.append(variable)
    w2 = OptionMenu(window, variable, *phases)
    w2.config(bg = "blue", relief="raised")
    w2.grid(sticky=E, row=19, column=9, pady=7)

    style.map("C.TButton",
        foreground=[('pressed', 'red'), ('active', 'blue')],
        background=[('pressed', '!disabled', 'black'), ('active', 'yellow')]
        )

    btn = ttk.Button(window, text="Click Me", style="C.TButton", command=clicked)
    btn.grid(sticky=SE, column=9, row=25, pady=7)
    window.mainloop()


readOldConfig()
readOldRunPhase()
configure_var()
