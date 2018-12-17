import csv

def cleanField(field):
	first = str(field)
	f1 = first.replace("'", "&quot;")
	f2 = f1.replace('"', "&quot;")
	f3 = f2.replace(",", "&comma;")
	f4 = f3.replace("\\", "&bslash;")
	return f4


#print ("var YahrzeitList = '{ \"Yahrzeits\": [' +")
with open('/home/efraim/bcCode/BeisChayim/data/yahrzeits.csv') as csvfile:
	lineCount = 0
	lineread = csv.reader(csvfile, delimiter=',', quotechar='"')
	l = list(lineread)
	lineArray = []
	for field in l:
		if isinstance(field, list)  and len(field) > 0:
			for f in field:
				lineArray.append(cleanField(f))
		if lineCount > 0:
			print(",".join(lineArray))
		lineCount  = lineCount + 1
		lineArray = []
