from profile import *
import os
from shutil import copyfile
from sys import platform

import json
import pprint

###############################################################
# data conversion -
# buildData - converts json file to dict
# encodeData - converts dict back to json
###############################################################
class dataInterface:
    def __init__(self, var, data):
        self.var = var
        if self.var == 1:
            self.buildData()
        if self.var == 2:
            self.data = data

        self.filename = "/BCConfig"
        if platform.find('win') > -1:
            self.filename = "\\BCConfig"

    def getData(self):
        return self.data

    def getConfig(self):
        cwd = os.getcwd()
        cwd = cwd[0:cwd.find("/BeisChayim")] + "/BeisChayim"

        if platform.find('win') > -1:
            cwd = cwd[0:cwd.find("\\BeisChayim")] + "\\BeisChayim"
        configFile = cwd + configDir + self.filename
        #print(configFile)
        #print("##################################")
        configData = dict()
        #with open(cwd + "\\" + configDir + self.filename) as fl:
        with open(configFile) as fl:
            for line in fl:
                varString = line[line.rfind("{")+1:line.find("}")]
                varData = varString.split(",")
                for x in varData:
                    x = x.replace('\"','')
                    y = x.split(":")
                    configData[y[0]] = y[1]
        return configData

    def writeNewConfig(self, s):
        cwd = os.getcwd()
        cwd = cwd[0:cwd.find("/BeisChayim")] + "/BeisChayim"
        if platform.find('win') > -1:
            cwd = cwd[0:cwd.find("\\BeisChayim")] + "\\BeisChayim"
        #print("writing config to: " + installDir + self.filename)
        configFile = cwd + configDir + self.filename

        #fd = open(cwd + "\\" + installDir + self.filename, "w+")
        fd = open(configFile, "w+")
        fd.write(s)
        fd.close()

    def buildData(self):
        lineCount = 0
        cwd = os.getcwd()
        cwd = cwd[0:cwd.find("/BeisChayim")] + "/BeisChayim"
        if platform.find('win') > -1:
            cwd = cwd[0:cwd.find("\\BeisChayim")] + "\\BeisChayim"

        JString = '{ "ENTRIES": ['
        # print(cwd)
        # print(jsDir)
        db01 = cwd + "/" + jsDir + "/db01.js"
        if platform.find('win') > -1:
            db01 = cwd + "\\" + jsDir + "\db01.js"

        with open (db01, "r") as JSONfile:
            for line in JSONfile:
                if lineCount > 0:
                    JString += line.replace("'","").replace("+","").replace(";","")
                lineCount += 1

        self.data = json.loads(JString)

    def getLastID(self):
        ID = 0
        for entry in self.data['ENTRIES']:
            if int(ID) < int(entry['ID']):
                ID = entry['ID']
        return ID

    def entryExists(self, entry):
        for DEntry in self.data['ENTRIES']:
            if DEntry['ID'] == entry['ID']:
                return True
        return False

    def addToData(self, entry):
        self.data['ENTRIES'].append(entry)

    def replaceData(self, entry):
        for DEntry in self.data['ENTRIES']:
            if DEntry['ID'] == entry['ID']:
                for e in DEntry:
                    DEntry[e] = entry[e]

    def encodeData(self):
        fileString = "var YahrzeitList = '{ \"Yahrzeits\": [' + \n"
        for entry in self.data['ENTRIES']:
            line = json.dumps(entry)
            fileString += "'" + line + ",' + \n"
        fileString += " ']}';"
        #print(fileString)
        fileString = fileString[0:fileString.rfind(",")] + fileString[fileString.rfind(",")+1:]
        return fileString

    def copyPIC(self, src):
        cwd = os.getcwd()
        cwd = cwd[0:cwd.find("/BeisChayim")] + "/BeisChayim"
        pic = src[src.rfind("/"):]
        target = cwd + "/" + picDir + "/" + pic
        if platform.find('win') > -1:
            cwd = cwd[0:cwd.find("\\BeisChayim")] + "\\BeisChayim"
            target = cwd + "\\" + picDir + "\\" + pic
        #print("Copying: " + src + " to: " + cwd + "\\" + picDir + "\\" + pic)
        copyfile(src, target)

    def copyPDF(self, src):
        cwd = os.getcwd()
        cwd = cwd[0:cwd.find("/BeisChayim")] + "/BeisChayim"
        pic = src[src.rfind("/"):]
        target = cwd + "/" + pdfDir + "/" + pic
        if platform.find('win') > -1:
            cwd = cwd[0:cwd.find("\\BeisChayim")] + "\\BeisChayim"
            target = cwd + "\\" + picDir + "\\" + pic
        print("Copying: " + src + " to: " + cwd + "\\" + picDir + "\\" + pic)
        copyfile(src, target)

    def replaceOldData(self, fileString):
        cwd = os.getcwd()
        cwd = cwd[0:cwd.find("/BeisChayim")] + "/BeisChayim"

        db01 = cwd + "/" + jsDir + "/db01.js"
        if platform.find('win') > -1:
            db01 = cwd + "\\" + jsDir + "\db01.js"

        fd = open(db01, "w+")
        fd.write(fileString)
        fd.close()

    def writeStagingData(self, fileString):
        cwd = os.getcwd()
        cwd = cwd[0:cwd.find("/BeisChayim")] + "/BeisChayim"
        filename = cwd + "/" + dataStaging + "/db01.js"
        if platform.find('win') > -1:
            cwd = cwd[0:cwd.find("\\BeisChayim")] + "\\BeisChayim"
            filename = cwd + "\\" + dataStaging + "\\db01.js"

        fd = open(filename, "w+")
        fd.write(fileString)
        fd.close()
        # in case user closes and reopens the file!
        self.replaceOldData(fileString)

    def showData(self):
        if self.var == 2:
            return

        for entry in self.data['ENTRIES']:
            print(entry["ID"] + "==> " + entry["Name"])

        pp = pprint.PrettyPrinter(indent=2)
        pp.pprint(self.data)

#dataI = dataInterface(1, [])
#data = dataI.getData()
#dataI.encodeData()
