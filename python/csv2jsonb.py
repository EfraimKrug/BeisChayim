import csv
print ("var YahrzeitList = '{ \"Yahrzeits\": [' +")
with open('inLoad.csv') as csvfile:
	lineread = csv.reader(csvfile, delimiter=',', quotechar='"')
	l = list(lineread)

	linecount = 0

	for a in l:
		x = csv.reader(a, delimiter=',', quotechar="'")
		linecount = linecount + 1
		newline = []
		l2 = list(x)
		newline.append("'{\"ID\":\"" + str(linecount) + "\"")
		newline.append("\"BGround\":\"\"")

		newline.append("\"Name\":\"" + l2[0][0] + "\"")
		if len(l2[1]) > 0:
			newline.append("\"HName\":\"" + l2[1][0] + "\"")
		else:
			newline.append("\"HName\":\"\"")

		if len(l2[2]) > 1:
			newline.append("\"EDate\":\"" + l2[2][0] + "," + l2[2][1] + "\"")
		elif len(l2[2]) > 0:
			newline.append("\"EDate\":\"" + l2[2][0] + "\"")
		else:
			newline.append("\"EDate\":\"\"")

		if len(l2[3]) > 0:
			newline.append("\"HDate\":\"" + l2[3][0] + "\"")
		else:
			newline.append("\"HDate\":\"\"")

		newline.append("\"Pic01\":\"\"")
		newline.append("\"Pic02\":\"\"")
		newline.append("\"FBook\":\"\"")
		newline.append("\"Comments01\":\"\"")
		newline.append("\"Mourner\":\"\"")
		newline.append("\"Relationship\":\"\"")

		if linecount > 1:
			if linecount < len(l):
				print(','.join(newline) + "},' + ")
			else:
				print(','.join(newline) + "}]}';")
