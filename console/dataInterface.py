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

    def getLastID(self):
        ID = 0
        for entry in self.data['ENTRIES']:
            if int(ID) < int(entry['ID']):
                ID = entry['ID']
        return ID

    def showData(self):
        if self.var == 2:
            return

        for entry in self.data['ENTRIES']:
            print(entry["ID"] + "==> " + entry["Name"])

        pp = pprint.PrettyPrinter(indent=2)
        pp.pprint(self.data)
