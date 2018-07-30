import csv
with open('inLoad.csv') as csvfile:
	lineread = csv.reader(csvfile, delimiter=',', quotechar='"')
	l = list(lineread)
	for a in l:
		x = csv.reader(a, delimiter=',', quotechar="'")
		l2 = list(x)
		idx = 1
		for b in l2:
			print("{{" + str(idx) + ":" + str(b).replace("'", "") + "}}")
			idx = idx + 1	
