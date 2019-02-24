
from tkinter import *
from tkinter import ttk
from tkinter import filedialog
import tkinter.messagebox

from PIL import ImageTk, Image
import subprocess
import os
from os import walk
import shutil
import json

from profile import *
from mainBox3b import *

def re_install():
    subprocess.call([bindir + '/CONreinstall'], shell=False)
    root = ""
    exit()

def re_install_current():
    subprocess.call([bindir + '/CONreinstallCurrent'], shell=False)
    root = ""
    exit()

def reconfigure():
    runApp2()
    #subprocess.call([bindir + '/CONCollect'], shell=False)
    root = ""
    exit()

def turnOn():
    subprocess.call([bindir + '/turnOn2'], shell=False)
    root = ""
    exit()

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

def runApp():
    root = Tk()
    root.configure(bg="teal", pady=34, padx=17)
    ################################################################################
    s = ttk.Style()
    s.configure('.', background='lightblue', foreground='maroon', border='4', sticky=EW)
    s.theme_use('default')
    ################################################################################
    root.geometry('500x400')
    root.title('Install/Re-install Your Display')
    frame = Frame(root, width=450, height=430)
    frame.configure(bg="teal", pady=3, padx=3)

    img = ImageTk.PhotoImage(Image.open("images/clock01.gif"))
    pic01 = ttk.Label(root, image = img)
    pic01.pack(side = "bottom", fill = "both", expand = "yes")

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
    button3.place(x=100, y=10, bordermode=OUTSIDE, height=30, width=80)

    frame.pack()
    root.mainloop()

#runApp()
