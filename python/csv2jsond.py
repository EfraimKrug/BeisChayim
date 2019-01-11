import csv

def recycledLine(line):
	if(line[2] == "RECYCLED"):
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
		newline.append("'{\"ID\":\"" + l2[0][0] + "\"")
		#newline.append("\"BGround\":\"\"")
		if len(l2[1]) > 0:
			newline.append("\"Name\":\"" + l2[1][0] + "\"")
		else:
			newline.append("\"Name\":\"\"")

		if len(l2[4]) > 0:
			newline.append("\"HName\":\"" + l2[4][0] + "\"")
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
			newline.append("\"HDate\":\"" + l2[7][0] + "\"")
		else:
			newline.append("\"HDate\":\"\"")

		if len(l2) < 24:
			newline.append("\"MournBy\":\"\"")
		else:
			if len(l2[24]) > 0:
				newline.append("\"MournBy\":\"" + l2[24][0] + "\"")
			else:
				newline.append("\"MournBy\":\"\"")

		if len(l2) < 27:
			newline.append("\"Relationship\":\"\"")
		else:
			if len(l2[27]) > 0:
				newline.append("\"Relationship\":\"" + l2[27][0] + "\"")
			else:
				newline.append("\"Relationship\":\"\"")

		if recycledLine(l2):
			newline.append("\"Pic01\":\"\"" + l2[28][0] + "\"")
			newline.append("\"Pic02\":\"\"" + l2[29][0] + "\"")
			newline.append("\"PDF01\":\"\"" + l2[30][0] + "\"")
			newline.append("\"PDF02\":\"\"" + l2[31][0] + "\"")
			newline.append("\"PDF03\":\"\"" + l2[32][0] + "\"")
			newline.append("\"PDF04\":\"\"" + l2[33][0] + "\"")
			newline.append("\"PDF05\":\"\"" + l2[34][0] + "\"")
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

		if linecount > 1:
			if linecount < len(l):
				print(','.join(newline) + "},' + ")
			else:
				print(','.join(newline) + "}]}';")
