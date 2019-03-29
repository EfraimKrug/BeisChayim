import csv

def setField(field):
	first = str(field)
	f1 = first.replace("&quot;","'")
	f2 = f1.replace("&quot;",'"')
	f3 = f2.replace("&comma;",",")
	f4 = f3.replace("&bslash;","\\")
	return f4

def recycledLine(line):
	if len(line[2]) == 0:
		return False

	if(line[2][0] == "RECYCLED"):
		return True

	return False

print ("var YahrzeitList = '{ \"Yahrzeits\": [' +")
with open('X@~@~@X/BeisChayim/data/out01') as csvfile:
	lineread = csv.reader(csvfile, delimiter=',', quotechar='"')

	l = list(lineread)
	linecount = 0

	for a in l:
		x = csv.reader(a, delimiter=',', quotechar="'")
		linecount = linecount + 1
		newline = []
		l2 = list(x)
		if not l2:
			continue
		newline.append("'{\"ID\":\"" + setField(l2[0][0]) + "\"")
		#newline.append("\"BGround\":\"\"")
		if len(l2[1]) > 0:
			newline.append("\"Name\":\"" + setField(l2[1][0]) + "\"")
		else:
			newline.append("\"Name\":\"\"")

		if len(l2[4]) > 0:
			newline.append("\"HName\":\"" + setField(l2[4][0]) + "\"")
		else:
			newline.append("\"HName\":\"\"")

		if len(l2[6]) > 1:
			if l2[6][0] == "0000-00-00":
				newline.append("\"EDate\":\"\"")
			else:
				newline.append("\"EDate\":\"" + l2[6][0] + "," + l2[6][1] + "\"")
		elif len(l2[6]) > 0:
			if l2[6][0] == "0000-00-00":
				newline.append("\"EDate\":\"\"")
			else:
				newline.append("\"EDate\":\"" + l2[6][0] + "\"")
		else:
			newline.append("\"EDate\":\"\"")

		if len(l2[7]) > 0:
			newline.append("\"HDate\":\"" + setField(l2[7][0]) + "\"")
		else:
			newline.append("\"HDate\":\"\"")

		if len(l2) < 24:
			newline.append("\"MournBy\":\"\"")
		else:
			if len(l2[24]) > 0:
				newline.append("\"MournBy\":\"" + setField(l2[24][0]) + "\"")
			else:
				newline.append("\"MournBy\":\"\"")

		if len(l2) < 27:
			newline.append("\"Relationship\":\"\"")
		else:
			if len(l2[27]) > 0:
				newline.append("\"Relationship\":\"" + setField(l2[27][0]) + "\"")
			else:
				newline.append("\"Relationship\":\"\"")


		if recycledLine(l2):
			if len(l2[29]) > 0:
				newline.append("\"Pic01\":\"" + setField(l2[29][0]) + "\"")
			else:
				newline.append("\"Pic01\":\"\"")

			if len(l2[30]) > 0:
				newline.append("\"Pic02\":\"" + setField(l2[30][0]) + "\"")
			else:
				newline.append("\"Pic02\":\"\"")

			if len(l2[31]) > 0:
				newline.append("\"PDF01\":\"" + setField(l2[31][0]) + "\"")
			else:
				newline.append("\"PDF01\":\"\"")

			if len(l2[32]) > 0:
				newline.append("\"PDF02\":\"" + setField(l2[32][0]) + "\"")
			else:
				newline.append("\"PDF02\":\"\"")

			if len(l2[33]) > 0:
				newline.append("\"PDF03\":\"" + setField(l2[33][0]) + "\"")
			else:
				newline.append("\"PDF03\":\"\"")

			if len(l2[34]) > 0:
				newline.append("\"PDF04\":\"" + setField(l2[34][0]) + "\"")
			else:
				newline.append("\"PDF04\":\"\"")

			if len(l2[35]) > 0:
				newline.append("\"PDF05\":\"" + setField(l2[35][0]) + "\"")
			else:
				newline.append("\"PDF05\":\"\"")

			if len(l2[36]) > 0:
				newline.append("\"PayLevel\":\"" + setField(l2[36][0]) + "\"")
			else:
				newline.append("\"PayLevel\":\"\"")

			if len(l2[37]) > 0:
				newline.append("\"Comments01\":\"" + setField(l2[37][0]) + "\"")
			else:
				newline.append("\"Comments01\":\"\"")
		else:
			newline.append("\"Pic01\":\"\"")
			newline.append("\"Pic02\":\"\"")
			newline.append("\"PDF01\":\"\"")
			newline.append("\"PDF02\":\"\"")
			newline.append("\"PDF03\":\"\"")
			newline.append("\"PDF04\":\"\"")
			newline.append("\"PDF05\":\"\"")
			newline.append("\"PayLevel\":\"\"")
			newline.append("\"Comments01\":\"\"")

		if linecount > 0:
			if linecount < len(l):
				print(','.join(newline) + "},' + ")
			else:
				print(','.join(newline) + "}]}';")
