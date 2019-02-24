from tkinter import *
from tkinter import ttk
#from tkinter import filedialog
#import tkinter.messagebox

from PIL import ImageTk, Image
#import subprocess
#import os
#from os import walk
#import shutil

from profile import *

import json
import pprint

data = ""
responseLabel = ""
outLabel = ""

def buildData():
    global data
    lineCount = 0
    JString = '{ "ENTRIES": ['
    with open ("/home/efraiim/code/BeisChayim/js/db01.js", "r") as JSONfile:
        for line in JSONfile:
            if lineCount > 0:
                JString += line.replace("'","").replace("+","").replace(";","")
            lineCount += 1

    data = json.loads(JString)

def showData():
    global data
    for entry in data['ENTRIES']:
        print(entry["ID"] + "==> " + entry["Name"])

    pp = pprint.PrettyPrinter(indent=2)
    pp.pprint(data)

def buildWindow():
    root = Tk()
    root.configure(bg="teal", pady=34, padx=17)
    s = ttk.Style()
    s.configure('.', background='lightblue', foreground='maroon', border='4', sticky=EW)
    s.theme_use('default')
    root.geometry('500x400')
    root.title('Install/Re-install Your Display')
    return root

#########################################################
class SearchNames:
    def __init__(self, var):
        self.var = var
        self.targetArray = []
        self.targetPointer = 0
        self.targetName = ""

    def initialize(self):
        self.targetArray = []

    def setOutlabel(self):
        count = len(self.targetArray)

        if count == 1:
            outLabel['text'] = self.getTargetName()
            return
        if count > 0:
            outLabel['text'] = str(count) + ": " + self.getTargetName()
            return

        outLabel['text'] = ""


    def getTargetName(self):
        self.targetName = self.targetArray[self.targetPointer]
        return self.targetName

    def searchName(self, str):
        self.initialize()
        for entry in data['ENTRIES']:
            nArray = entry["Name"].split()
            for eName in nArray:
                if eName.lower().find(str.lower()) == 0:
                    self.targetArray.append(entry["Name"])

    def getEachStroke(self, key):
        global responseLabel
        global outLabel
        if key.char.lower() == str('\b') and len(responseLabel['text']) > 0:
            responseLabel['text'] = responseLabel['text'][0:len(responseLabel['text'])-1]

        if key.char.lower() == str(' '):
            responseLabel['text'] += key.char

        if key.char.lower() >= str('a') and key.char.lower() <= str('z'):
            responseLabel['text'] += key.char

        self.searchName(responseLabel['text'])
        self.setOutlabel()

    def downArrow(self, key):
        count = len(self.targetArray)
        if count < 2:
            return
        if self.targetPointer > count - 2:
            return
        print("Incrementing")
        self.targetPointer += 1
        self.setOutlabel()

    def upArrow(self, key):
        count = len(self.targetArray)
        if count < 2:
            return
        if self.targetPointer < 1:
            return
        print("Decrementing")
        self.targetPointer -= 1
        self.setOutlabel()

#########################################################
searchObj = SearchNames(34)

def clickResponse():
    global responstueLabel
    global textBox

    responseLabel['text'] = searchObj.getTargetName()
    #print("Responding... (kind of)")

def buildFrame(root):
    global outLabel
    frame = Frame(root, width=450, height=430)
    frame.configure(bg="teal", pady=3, padx=3)
    # img = ImageTk.PhotoImage(Image.open("images/clock01.gif"))
    # pic01 = ttk.Label(frame, image = img)
    # pic01.pack(side = "bottom", fill = "both", expand = "yes")

    l1 = Label(frame, text="Title: ", bg="blue", fg="yellow", padx=4, pady=4)
    l1.place(x=50, y=125, bordermode=OUTSIDE, height=30, width=150)
    frame.pack()
    return frame

def placeTextBox(frame):
    #text box
    txt = Entry(frame, width=45,  borderwidth=2, relief="sunken")
    txt.place(x=50, y=250, bordermode=OUTSIDE, height=30, width=150)
    txt.bind("<Key>", searchObj.getEachStroke)
    txt.bind("<Up>", searchObj.upArrow)
    txt.bind("<Down>", searchObj.downArrow)

    return txt
    #

def placeButton(frame):
    button0 = ttk.Button(frame, text="Click It", command = clickResponse)
    button0.pack(side=RIGHT)
    button0.place(x=50, y=50, bordermode=OUTSIDE, height=30, width=150)
    return button0

def placeResponseLabel(frame):
    responseLabel = Label(frame, text="Yep", bg="blue", fg="yellow", padx=4, pady=4)
    responseLabel.place(x=50, y=150, bordermode=OUTSIDE, height=30, width=150)
    return responseLabel

def placeOutLabel(frame):
    OutLabel = Label(frame, text="", bg="blue", fg="yellow", padx=4, pady=4)
    OutLabel.place(x=50, y=0, bordermode=OUTSIDE, height=30, width=450)
    return OutLabel


buildData()
showData()
myRoot = buildWindow()
frame = buildFrame(myRoot)
enterButton = placeButton(frame)
responseLabel = placeResponseLabel(frame)
outLabel = placeOutLabel(frame)

textBox = placeTextBox(frame)

responseText = textBox.get()
responseLabel['text'] = responseText

#outLabel['text'] = 'Nuts'
myRoot.mainloop()
