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


class dataInterface:
    def __init__(self, var, data):
        self.var = var
        if self.var == 1:
            self.buildData()
        if self.var == 2:
            self.data = data

    def getData(self):
        return self.data

    def buildData(self):
        lineCount = 0
        JString = '{ "ENTRIES": ['
        with open (jsDir + "db01.js", "r") as JSONfile:
            for line in JSONfile:
                if lineCount > 0:
                    JString += line.replace("'","").replace("+","").replace(";","")
                lineCount += 1

        self.data = json.loads(JString)

    def showData(self):
        if self.var == 2:
            return

        for entry in self.data['ENTRIES']:
            print(entry["ID"] + "==> " + entry["Name"])

        pp = pprint.PrettyPrinter(indent=2)
        pp.pprint(self.data)


#########################################################
class SearchNames:
    def __init__(self, var, data):
        self.var = var
        self.targetArray = []
        self.targetPointer = 0
        self.targetName = ""
        self.responseLabel = ""
        self.outLabel = ""
        self.data = data

    def initialize(self):
        self.targetArray = []

    def setOutLabel(self, str):
        self.outLabel = str

    def getOutLabel(self):
        return self.outLabel

    def getLengthTargetArray(self):
        return len(self.targetArray)

    def getTargetEntry(self):
        self.targetName = self.targetArray[self.targetPointer][1]
        return self.targetName

    def getTargetName(self):
        self.targetName = self.targetArray[self.targetPointer][0]
        return self.targetName

    def searchName(self, str):
        self.initialize()
        for entry in self.data['ENTRIES']:
            nArray = entry["Name"].split()
            for eName in nArray:
                if eName.lower().find(str.lower()) == 0:
                    self.targetArray.append([entry["Name"], entry])

        #print(self.targetArray[0][0])
        self.setOutLabel(self.targetArray[0][0])

    def getEachStroke(self, key):
        if key.char.lower() == str('\b') and len(self.responseLabel) > 0:
            self.responseLabel = self.responseLabel[0:len(self.esponseLabel)-1]

        if key.char.lower() == str(' '):
            self.responseLabel += key.char

        if key.char.lower() >= str('a') and key.char.lower() <= str('z'):
            self.responseLabel += key.char

        self.searchName(self.responseLabel)

    def getResponseLabel(self):
        return self.responseLabel

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
# var: 0 is data from a datafile
# var: 1 is one entry of data
#
#########################################################

class dataScreen:
    def __init__(self, var, data):
        self.dataI = dataInterface(var,data)
        self.responseLabel = ""
        self.outLabel = ""
        self.var = var
        self.root = Tk()
        self.root.configure(bg="teal", pady=34, padx=17)
        self.root.geometry('500x400')

        if var == 1:
            self.initOne()
        if var == 2:
            self.initTwo()

    def initOne(self):
        self.data = self.dataI.getData()
        self.searchObj = SearchNames(34, self.data)
        self.root.title('Install/Re-install Your Display')

    def initTwo(self):
        self.data = self.dataI.getData()
        self.searchObj = SearchNames(34, self.data)
        self.root.title('Edit The Entry')

    def setStyle(self):
        s = ttk.Style()
        s.configure('.', background='lightblue', foreground='maroon', border='4', sticky=EW)
        s.theme_use('default')

    def clickResponse(self):
        self.responseLabel['text'] = self.searchObj.getTargetName()
        entry = self.searchObj.getTargetEntry()
        #print(entry['ID'])
        ds = dataScreen(2, entry)
        ds.runScreen()

    def buildFrame(self, root):
        frame = Frame(root, width=450, height=430)
        frame.configure(bg="teal", pady=3, padx=3)

        l1 = Label(frame, text="Search: ", bg="blue", fg="yellow", padx=4, pady=4)
        l1.place(x=0, y=0, bordermode=OUTSIDE, height=30, width=150)
        frame.pack()

    def getEachKeyStroke(self, key):
        self.searchObj.getEachStroke(key)
        self.setOutlabel()

    def placeTextBox(self, frame):
        txt = Entry(frame, width=45,  borderwidth=2, relief="sunken")
        txt.place(x=210, y=33, bordermode=OUTSIDE, height=30, width=150)
        txt.bind("<Key>", self.getEachKeyStroke)
        txt.bind("<Up>", self.searchObj.upArrow)
        txt.bind("<Down>", self.searchObj.downArrow)
        txt.focus()
        return txt

    def placeButton(self, frame):
        button0 = ttk.Button(frame, text="Click It", command =self.clickResponse)
        button0.pack(side=RIGHT)
        button0.place(x=310, y=350, bordermode=OUTSIDE, height=30, width=150)
        return button0

    def placeResponseLabel(self, frame):
        self.responseLabel = Label(frame, text="Response Label", bg="blue", fg="yellow", padx=4, pady=4)
        self.responseLabel.place(x=30, y=120, bordermode=OUTSIDE, height=30, width=150)
        return self.responseLabel

    def placeOutLabel(self, frame):
        OutLabel = Label(frame, text="Result Label", bg="blue", fg="yellow", padx=4, pady=4)
        OutLabel.place(x=30, y=170, bordermode=OUTSIDE, height=30, width=450)
        return OutLabel

    def setOutlabel(self):
        self.outLabel['text'] = self.searchObj.getOutLabel()

    def runScreen(self):
        frame = self.buildFrame(self.root)
        enterButton = self.placeButton(frame)
        self.responseLabel = self.placeResponseLabel(frame)
        self.outLabel = self.placeOutLabel(frame)
        textBox = self.placeTextBox(frame)
        self.root.mainloop()

############################################################################################

dScreen = dataScreen(1, 0)
dScreen.runScreen()
