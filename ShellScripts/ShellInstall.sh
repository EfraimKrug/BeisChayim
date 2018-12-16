# reinstall shell scripts
cp $HOME/bcCode/BeisChayim/ShellScripts/*.sh $HOME/bin
cp $HOME/bcCode/BeisChayim/ShellScripts/startUp $HOME/bin
cd $HOME/bin
chmod 555 $HOME/bin/*.sh
chmod 555 $HOME/bin/startUp
mv $HOME/bin/BChCycle01.sh $HOME/bin/BChCycle01
mv $HOME/bin/ConfigInstall.sh $HOME/bin/ConfigInstall
