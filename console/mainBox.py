
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
img = tkinter.PhotoImage(file='/home/efraim/Ccode/BeisChayim/console/icon001.gif')
root.tk.call('wm', 'iconphoto', root._w, img)
root.wm_iconbitmap(bitmap = "@/home/efraim/Ccode/BeisChayim/console/icon001.xbm")
#root.iconbitmap('@/home/efraim/Ccode/BeisChayim/console/icon002.xbm')

def re_install():
    subprocess.call([bindir + '/CONreinstall'], shell=False)

def re_install_current():
    subprocess.call([bindir + '/CONreinstallCurrent'], shell=False)

def reconfigure():
    subprocess.call([bindir + '/CONCollect'], shell=False)

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

button0.pack(side=RIGHT)
button1.pack(side=RIGHT)
button2.pack(side=RIGHT)

button0.place(x=50, y=50, bordermode=OUTSIDE, height=30, width=300)
button1.place(x=50, y=100, bordermode=OUTSIDE, height=30, width=300)
button2.place(x=50, y=150, bordermode=OUTSIDE, height=30, width=300)
frame.pack()

root.mainloop()
