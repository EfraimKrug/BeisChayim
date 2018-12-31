import csv
print ("var YahrzeitList = '{ \"Yahrzeits\": [' +")
with open('@@@@@/bcCode/BeisChayim/data/out01') as csvfile:
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

		newline.append("\"Pic01\":\"\"")
		newline.append("\"Pic02\":\"\"")
		newline.append("\"PDF01\":\"\"")
		newline.append("\"PDF02\":\"\"")
		newline.append("\"PayLevel\":\"\"")
		newline.append("\"Comments01\":\"\"")

		if linecount > 1:
			if linecount < len(l):
				print(','.join(newline) + "},' + ")
			else:
				print(','.join(newline) + "}]}';")
