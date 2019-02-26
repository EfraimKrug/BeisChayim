
from tkinter import *
from tkinter import ttk
from tkinter import filedialog
import tkinter.messagebox

from PIL import ImageTk, Image
import subprocess
import os
from os import walk
import shutil

from profile import *
import json


labelList = []
varList = []

oldData = dict()
runData = dict()
#outDir = "."

filename = "/BCConfig"
runPhaseFile =  "/RunPhase"
windowHold = ""

window = ""

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
#
# write in the install directory (~/Downloads)
def writeNewConfig(s):
    # fd = open(outDir + filename, "w+")
    # fd.write(s)
    # fd.close()
    #
    fd = open(installDir + filename, "w+")
    fd.write(s)
    fd.close()

# def writeNewRunPhase():
#     sec = "var RunPhase = { \"phase01\": {\"run_type\":\"security\"}};"
#     view = "var RunPhase = { \"phase01\": {\"run_type\":\"view\"}};"
#     fd = open(configDir + runPhaseFile, "w+")
#
#     if varList[8].get() == "edit":
#         fd.write(sec)
#     else:
#         fd.write(view)
#
#     fd.close()

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
    global window
    writeNewConfig(createConfig())
    #writeNewRunPhase()
    # -*- coding: utf-8 -*-
    exit()

def configure_var():
    global labelList
    global varList
    global window

    window = Tk()
    window.configure(bg="blue", pady=34, padx=17)
    style = ttk.Style()

    window.title("Configure Beis Chayim")
    window.geometry('750x500')

#set up background
    img = ImageTk.PhotoImage(Image.open("images/clock02.gif"))
    pic01 = ttk.Label(window, image = img)
    pic01.pack(side = "bottom", fill = "both", expand = "yes")

#flat label

    l1 = Label(pic01, text="Title: ", bg="blue", fg="yellow")
    l1.grid(sticky=W, row=3, padx=17)
    #text box
    txt = Entry(pic01,width=45,  borderwidth=2, relief="sunken")
    txt.config(bg="blue", fg="yellow")
    txt.grid(sticky=E, row=3, column=9)
    txt.insert(0, oldData['screen_title'])
    txt.focus()
    varList.append(txt)

#drop list for view type
    l2 = Label(pic01, text="View option: ", bg="blue", fg="yellow")
    l2.grid(sticky=W, row=5, padx=17)

    views = [
    'List Memorial Plaques',
    'List Entries One by One',
    'Alternate'
    ]
    variable = StringVar(pic01)
    variable.set(views[int(oldData['display_type'])]) # default value
    varList.append(variable)
    w2 = OptionMenu(pic01, variable, *views)
    w2.grid(sticky=E, row=5, column=9, pady=7)
    w2.config(bg = "blue", relief="raised")
#drop list for time

    l3 = Label(pic01, text="Time for each entry: ", bg="blue", fg="yellow")
    l3.grid(sticky=W, row=7, padx=17)

    times = [2,3,4,5,6,7,8,20,30,60]
    variable = StringVar(pic01)
    idx = times.index(int(oldData['time_factor']))
    variable.set(times[idx]) # default value

    w2 = OptionMenu(pic01, variable, *times)
    w2.config(bg = "blue", relief="raised")
    w2.grid(row=7, sticky=E, column=9, pady=7)
    varList.append(variable)

# password...
    l4 = Label(pic01, text="Password: ", bg="blue", fg="yellow")
    l4.grid(sticky=W, row=9, padx=17)

    txt = Entry(pic01, width=1,  borderwidth=2, relief="sunken")
    txt.grid(sticky=E, row=9, column=9, padx=1)
    txt.config(bg="blue", fg="yellow", width=20)
    txt.insert(0, oldData['password'])

    varList.append(txt)

    l5 = Label(pic01, text="Number of yahrzeits showing: ", bg="blue", fg="yellow")
    l5.grid(sticky=W, row=11, padx=17)
    slots = [2,3,4,5,6,7]
    variable = StringVar(pic01)
    idx = times.index(int(oldData['slots']))
    variable.set(slots[idx]) # default value

    w2 = OptionMenu(pic01, variable, *slots)
    w2.config(bg = "blue", relief="raised")
    w2.grid(sticky=E, row=11, column=9, pady=7)
    varList.append(variable)

    l6 = Label(pic01, text="Number of columns (plaque view): ", bg="blue", fg="yellow")
    l6.grid(sticky=W, row=13, padx=17)
    variable = StringVar(pic01)
    cols = [2,3,4,5,6,7]
    idx = times.index(int(oldData['column_count']))
    variable.set(cols[idx]) # default value

    w2 = OptionMenu(pic01, variable, *cols)
    w2.config(bg = "blue", relief="raised")
    w2.grid(sticky=E, row=13, column=9, pady=7)
    varList.append(variable)

    l7 = Label(pic01, text="Number of rows (plaque view): ", bg="blue", fg="yellow")
    l7.grid(sticky=W, row=15, padx=17)
    variable = StringVar(pic01)
    rows = [2,3,4,5,6,7]
    for i in range(len(rows)):
        if rows[i] == int(oldData['row_count']):
            variable.set(rows[i]) # default value

    w2 = OptionMenu(pic01, variable, *rows)
    w2.config(bg = "blue", relief="raised")
    w2.grid(sticky=E, row=15, column=9, pady=7)
    varList.append(variable)
    l8 = Label(pic01, text="Dates in Hebrew: ", bg="blue", fg="yellow")
    l8.grid(sticky=W, row=17, padx=17)

    dType = ["Hebrew", "Gregorian"]
    variable = StringVar(pic01)
    variable.set(dType[int(oldData["dates_in_hebrew"])]) # default value

    w2 = OptionMenu(pic01, variable, *dType)
    w2.config(bg = "blue", relief="raised")
    w2.grid(sticky=E, row=17, column=9, pady=7)
    varList.append(variable)

#run phase
    # l9 = Label(pic01, text="Run Phase: ", bg="blue", fg="yellow")
    # l9.grid(sticky=W, row=19, padx=17)
    #
    #
    # phases = ["Edit", "View"]
    # variable = StringVar(pic01)
    #
    # if runData['run_type'] == "view":
    #     variable.set(phases[1]) # default value
    # if runData['run_type'] == "security":
    #     variable.set(phases[0]) # default value
    #
    # varList.append(variable)
    # w2 = OptionMenu(pic01, variable, *phases)
    # w2.config(bg = "blue", relief="raised")
    # w2.grid(sticky=E, row=19, column=9, pady=7)

    style.map("C.TButton",
        foreground=[('pressed', 'red'), ('active', 'blue')],
        background=[('pressed', '!disabled', 'black'), ('active', 'yellow')]
        )

    btn = ttk.Button(pic01, text="Click Me", style="C.TButton", command=clicked)
    btn.grid(sticky=SE, column=9, row=25, pady=7)
    window.mainloop()

def  runApp2():
    readOldConfig()
    readOldRunPhase()
    configure_var()

root = Tk()
root.configure(bg="teal", pady=34, padx=17)
################################################################################
# Playing with styles...
#
s = ttk.Style()
#s.configure('Ef.TButton', foreground='maroon', sticky=EW)
s.configure('.', background='lightblue', foreground='maroon', border='4', sticky=EW)
s.theme_use('default')
################################################################################
root.geometry('500x400')
root.title('Install/Re-install Your Display')
# img = tkinter.PhotoImage(file='/home/efraim/Ccode/BeisChayim/console/icon001.gif')
# root.tk.call('wm', 'iconphoto', root._w, img)
# root.wm_iconbitmap(bitmap = "@/home/efraim/Ccode/BeisChayim/console/icon001.xbm")
#root.iconbitmap('@/home/efraim/Ccode/BeisChayim/console/icon002.xbm')

def re_install():
    subprocess.call([bindir + '/CONreinstall'], shell=False)
    root = ""
    exit()

def re_install_current():
    subprocess.call([bindir + '/CONreinstallCurrent'], shell=False)
    root = ""
    exit()

def reconfigure():
    subprocess.call([bindir + '/Reconfigure'], shell=False)
    #runApp2()
    #subprocess.call(['ls'], shell=False)
    #root = ""
    #exit()

def turnOn():
    subprocess.call([bindir + '/turnOn2'], shell=False)
    root = ""
    exit()
    #buildConfigure()
    #farm = buildDrop(farm)

# def buildDrop(farm):
#     global variable
#
#     options = [
#     'List Entries One by One',
#     'List Memorial Plaques',
#     'Alternate'
#     ]
#
#     variable = StringVar(farm)
#     variable.set(options[2]) # default value
#
#     w = OptionMenu(farm, variable, *options)
#     w.pack()
#     return farm
#
# def debugging():
#     print (variable.get())

def getFilenames():
    f = []
    mypath = basedir

    for (dirpath, dirnames, filenames) in walk(mypath):
        f.extend(filenames)
    for x in f:
        if (x == 'yahrzeits.xlsx'):
            print("found it: " + x)
            fname = mypath + r'\\shulCloud\\yahrzeits.xlsx'
            checkOldFile(fname)

# def junk():
#             fout = open(basedir + "\\shulCloud\\.filestat", "w")
#             fout.write(str(os.path.getmtime(fname)))
#             fout.close()

frame = Frame(root, width=450, height=430)
frame.configure(bg="teal", pady=3, padx=3)
#button0 = ttk.Button(frame, text="Reinstall from original file", command = re_install, style='Ef.TButton')
#button1 = ttk.Button(frame, text='Rebuild from current file', command=re_install_current, style='Ef.TButton')
#button2 = ttk.Button(frame, text='Reconfigure', command=reconfigure, style='Ef.TButton')
img = ImageTk.PhotoImage(Image.open("images/clock01.gif"))
pic01 = ttk.Label(root, image = img)
pic01.pack(side = "bottom", fill = "both", expand = "yes")
#pic01.place(x=0, y=0, bordermode=OUTSIDE, height=400, width=400)
button0 = ttk.Button(pic01, text="Reinstall from original file", command = re_install)
button1 = ttk.Button(pic01, text='Rebuild from current file', command=re_install_current)
button2 = ttk.Button(pic01, text='Reconfigure', command=reconfigure)
button3 = ttk.Button(pic01, text='Turn On The System', command=turnOn)

button0.pack(side=RIGHT)
button1.pack(side=RIGHT)
button2.pack(side=RIGHT)
button3.pack(side=RIGHT)

button0.place(x=50, y=50, bordermode=OUTSIDE, height=30, width=300)
button1.place(x=50, y=100, bordermode=OUTSIDE, height=30, width=300)
button2.place(x=50, y=150, bordermode=OUTSIDE, height=30, width=300)
button3.place(x=50, y=200, bordermode=OUTSIDE, height=30, width=300)

frame.pack()

root.mainloop()
#runApp2()
