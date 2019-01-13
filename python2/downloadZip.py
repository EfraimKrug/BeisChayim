import urllib

url = 'http://www.github.com/EfraimKrug/BeisChayim/archive/master.zip'

print "downloading with urllib"
urllib.urlretrieve(url, "junk/code.zip")
