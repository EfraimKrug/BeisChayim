# install beisChayim
# note - install python
# note - install firefox - configure options->download->always ask
[ -e $HOME/Downloads ] || echo "No Downloads folder: please create $HOME/Downloads"
[ -e $HOME/Downloads/BeisChayim-version03.zip ] || echo "No zip file! Please download BeisChayim-version03.zip (github/EfraimKrug)"
[ -e $HOME/bcCode ] || mkdir $HOME/bcCode
mv $HOME/Downloads/BeisChayim-version03.zip $HOME/bcCode/BeisChayim.zip
cd $HOME/bcCode
unzip $HOME/bcCode/BeisChayim.zip
#
rm $HOME/bcCode/BeisChayim.zip
mv $HOME/bcCode/BeisChayim-version03 $HOME/bcCode/beisChayim
#mv $HOME/bcCode/beisChayim/python/ShellScripts/BChStep01.sh $HOME/bin/BChStep01
#mv ~/bcCode/beisChayim/python/ShellScripts/BChCycle01.sh ~/bin/BChCycle01
cp $HOME/bcCode/beisChayim/python/ShellScripts/ShellInstall.sh $HOME/bin/ShellInstall
#sed -i 's/$HOME/\/home\/efraim/g' ShellInstall
#
#mv $HOME/bcCode/beisChayim/python/ShellScripts/.xinitrc $HOME/.xinitrc
#chmod +x  $HOME/.xinitrc
#
chmod 555 $HOME/bin/ShellInstall
$HOME/bin/ShellInstall
echo "You need to create a 'yahrzeits.csv' file and put it in $HOME/bcCode/beisChayim/data/yahrzeits.csv"
