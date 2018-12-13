# reinstall shell scripts
cp $HOME/bcCode/beisChayim/python/ShellScripts/*.sh $HOME/bin
cd $HOME/bin
mv $HOME/bin/appInstall.sh $HOME/bin/appInstall
mv $HOME/bin/BChCycle01.sh $HOME/bin/_BChCycle01
#mv $HOME/BChCycle02.sh $HOME/BChCycle02
#mv $HOME/BChStep01.sh $HOME/BChStep01
##### mv $HOME/bin/ShellInstall.sh $HOME/bin/ShellInstall
mv $HOME/bin/ConfigInstall.sh $HOME/bin/_ConfigInstall
chmod 555 $HOME/bin/*.sh
