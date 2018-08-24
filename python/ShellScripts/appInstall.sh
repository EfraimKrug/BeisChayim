# install beisChayim
# note - install python
# note - install firefox - configure options->download->always ask
[ -e ~/Downloads ] || echo "No Downloads folder: please create ~/Downloads"
[ -e ~/Downloads/BeisChayim-version01.zip ] || echo "No zip file! Please download BeisChayim-version01.zip (github/EfraimKrug)"
[ -e ~/bcCode ] || mkdir ~/bcCode
cp ~/Downloads/BeisChayim-version01.zip ~/bcCode/BeisChayim.zip
cd ~/bcCode
unzip BeisChayim.zip
#
rm BeisChayim.zip
mv BeisChayim-version01 beisChayim
mv ~/bcCode/beisChayim/python/ShellScripts/BChStep01.sh ~/bin/BChStep01
mv ~/bcCode/beisChayim/python/ShellScripts/BChCycle01.sh ~/bin/BChCycle01
mv ~/bcCode/beisChayim/python/ShellScripts/ConfigInstall ~/bin/ConfigInstall
#
mv ~/bcCode/beisChayim/python/ShellScripts/xinitrc ~/.xinitrc
chmod +x ~/bin/BChStep01
chmod +x ~/bin/BChCycle01
chmod +x ~/bin/ConfigInstall
echo "You need to create a 'yahrzeits.csv' file and put it in ~/bcCode/beisChayim/data/yahrzeits.csv"
