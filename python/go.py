    import subprocess as sp
    import time
    def browse(url, how_long):
        child = sp.Popen("firefox %s" % url, shell=True)
        time.sleep(how_long)
        child.terminate()
    browse("http://www.python.org", 3)
    child = sp.Popen(['firefox', '-p',  'foo', '-no-remote', url])
