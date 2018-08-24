import urllib

url = 'http://www.github.com/EfraimKrug/beisChayim/archive/master.zip'

print "downloading with urllib"
urllib.urlretrieve(url, "junk/code.zip")
