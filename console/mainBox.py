
from tkinter import *
from tkinter import filedialog
import tkinter.messagebox
import subprocess
import os
from os import walk
import shutil

from profile import *

root = Tk()
root.geometry('500x400')
root.title('Beis Chayim')

def re_install():
    subprocess.call([bindir + '/CONreinstall'], shell=False)
    root.destroy()

def re_install_current():
    subprocess.call([bindir + '/CONreinstallCurrent'], shell=False)
    root.destroy()

def reconfigure():
    subprocess.call([bindir + '/CONCollect'], shell=False)
    root.destroy()

    #buildConfigure()
    #farm = buildDrop(farm)

def buildDrop(farm):
    global variable

    options = [
    'List Entries One by One',
    'List Memorial Plaques',
    'Alternate'
    ]

    variable = StringVar(farm)
    variable.set(options[2]) # default value

    w = OptionMenu(farm, variable, *options)
    w.pack()
    return farm

def debugging():
    print (variable.get())

# def buildConfigure():
# window = Tk()
# window.title("Welcome to LikeGeeks app")
# window.geometry('350x200')
# lbl = Label(window, text="Hello")
# lbl.grid(column=0, row=0)
# txt = Entry(window,width=10)
# txt.grid(column=1, row=0)
#
# def clicked():
#      lbl.configure(text="Button was clicked !!")
#
# btn = Button(window, text="Click Me", command=clicked)
# btn.grid(column=2, row=0)
#
# window.mainloop()
# def moreJunk():
#     root2 = Tk()
#     root2.geometry('500x400')
#     root2.title('Configuration')
#
#     frame = Frame(root2, width=400, height=400)
#
#     button0 = Button(frame, text="try it!", command = debugging)
#     # button1 = Button(frame, text='Rebuild from current file', command=re_install_current)
#     # button2 = Buttonf(frame, text='Reconfigure', command=reconfigure)
#     button0.pack(side=RIGHT)
#     # button1.pack(side=RIGHT)
#     # button2.pack(side=RIGHT)
#     #
#     button0.place(x=50, y=250, bordermode=OUTSIDE, height=30, width=300)
#     # button1.place(x=50, y=100, bordermode=OUTSIDE, height=30, width=300)
#     # button2.place(x=50, y=150, bordermode=OUTSIDE, height=30, width=300)
#     #frame = buildDrop(frame)
#     global variable
#
#     optns = [
#     'List Entries One by One',
#     'List Memorial Plaques',
#     'Alternate'
#     ]
#
#     variable = StringVar(frame)
#     variable.set(optns[2]) # default value
#
#     w = OptionMenu(frame, variable, *optns)
#     w.pack()
#
#     frame.pack()
#
#     root2.mainloop()
#     return frame

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

def junk():
            fout = open(basedir + "\\shulCloud\\.filestat", "w")
            fout.write(str(os.path.getmtime(fname)))
            fout.close()

frame = Frame(root, width=400, height=400)
button0 = Button(frame, text="Reinstall from original file", command = re_install)
button1 = Button(frame, text='Rebuild from current file', command=re_install_current)
button2 = Button(frame, text='Reconfigure', command=reconfigure)
button0.pack(side=RIGHT)
button1.pack(side=RIGHT)
button2.pack(side=RIGHT)

button0.place(x=50, y=50, bordermode=OUTSIDE, height=30, width=300)
button1.place(x=50, y=100, bordermode=OUTSIDE, height=30, width=300)
button2.place(x=50, y=150, bordermode=OUTSIDE, height=30, width=300)
frame.pack()

root.mainloop()
