#testing json - line by line...
import sys

i = 0
def getHeaders():
    return 'Id,"Deceased Name","Deceased First Name","Deceased Last Name","Deceased Hebrew",Gender,"English Date","Hebrew Date","English Observance","Next Date",Notes,Plaque,Relationship,"External Id","2 Adar Observe","Buried Date","Buried Location","Maiden Name","After Sunset",Pronoun,Mourner,"Normalized 2 Adar Observe","Plot Number","Plaque Number","Mourner 1 Name","Mourner 1 Id","Mourner 1 Account Id","Deceased Is Mourner 1\'s","Mourner 2 Name","Mourner 2 Id","Mourner 2 Account Id","Deceased Is Mourner 2\'s","Mourner 3 Name","Mourner 3 Id","Mourner 3 Account Id","Deceased Is Mourner 3\'s","Mourner 4 Name","Mourner 4 Id","Mourner 4 Account Id","Deceased Is Mourner 4\'s","Mourner 5 Name","Mourner 5 Id","Mourner 5 Account Id","Deceased Is Mourner 5\'s"\n'

def addQuotes(field):
    return '"' + field + '"'

def getLine(line):
    newLine = line['ID'] + "," + addQuotes(line['Name']) + "," + addQuotes('RECYCLED') + ",," + addQuotes(line['HName']) + ",,"
    newLine += addQuotes(line['EDate']) + "," + addQuotes(line['HDate']) + ",,,,,,,,,,,,,,,,,,"
    newLine += addQuotes(line['MournBy']) + ",,,,"
    newLine += addQuotes(line['Pic01']) + "," + addQuotes(line['Pic02']) + "," + addQuotes(line['PDF01']) + ","
    newLine += addQuotes(line['PDF02']) + ","  + addQuotes(line['PDF03']) + ","  + addQuotes(line['PDF04']) + ","  + addQuotes(line['PDF05']) + ","
    newLine += addQuotes(line['PayLevel']) + ","  + addQuotes(line['Comments01']) + "\n"
    return newLine


with open ("/home/efraiim/code/BeisChayim/js/db01.js", "r") as JSONfile:
    fd = open("nYahrzeits.csv", "w")
    fd.write(getHeaders())
    for line in JSONfile:
        if(line.find("[") > -1):
            continue
        line = line[line.find("'"):line.rfind("'")+1]
        line = line.replace("},","}")
        line = line.replace("]}", "")
        l = eval(line)
        if len(l) > 0:
            l2 = eval(l)
            fd.write(getLine(l2))

fd.close()
