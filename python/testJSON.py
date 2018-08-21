#testing json - line by line...
import json

i = 0
with open ("../js/db01.js", "r") as JSONfile:
    for line in JSONfile:
        i = i + 1
        if i == 2:
            first = line.find("'") + 1
            last = line.rfind("'") - 1
            jsonTxt = line[first:last]
            d = json.dumps(json.loads(jsonTxt))
            print d
            #print json.dumps(jsonTxt, sort_keys=True, indent=4, separators=(',', ': '))
