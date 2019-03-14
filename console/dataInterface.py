from profile import *

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

    def getData(self):
        return self.data

    def getConfig(self):
        configData = dict()

        with open(configDir + self.filename) as fl:
            for line in fl:
                varString = line[line.rfind("{")+1:line.find("}")]
                varData = varString.split(",")
                for x in varData:
                    x = x.replace('\"','')
                    y = x.split(":")
                    configData[y[0]] = y[1]
        return configData

    def writeNewConfig(self, s):
        print("writing config to: " + installDir + self.filename)
        fd = open(installDir + self.filename, "w+")
        fd.write(s)
        fd.close()

    def buildData(self):
        lineCount = 0
        JString = '{ "ENTRIES": ['
        with open (jsDir + "/db01.js", "r") as JSONfile:
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

    def writeStagingData(self, fileString):
        fd = open(dataStaging + "/db01.js", "w+")
        fd.write(fileString)
        fd.close()

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
