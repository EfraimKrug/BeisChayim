# reinstall shell scripts
cd $HOME/bin
cp $HOME/bcCode/BeisChayim/ShellScripts/*.sh $HOME/bin
cp $HOME/bcCode/BeisChayim/ShellScripts/startUp $HOME/bin
mv $HOME/bin/BChCycle01.sh $HOME/bin/BChCycle01
mv $HOME/bin/ConfigInstall.sh $HOME/bin/ConfigInstall

chmod 555 $HOME/bin/BChCycle01
chmod 555 $HOME/bin/ConfigInstall
chmod 555 $HOME/bin/startUp
