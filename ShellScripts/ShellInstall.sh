# reinstall shell scripts
cd $HOME/bin
cp $HOME/code/BeisChayim/ShellScripts/*.sh $HOME/bin
cp $HOME/code/BeisChayim/ShellScripts/startUp $HOME/bin
mv $HOME/bin/editConfig.sh editConfig
mv $HOME/bin/BChCycle01.sh $HOME/bin/BChCycle01
mv $HOME/bin/ConfigInstall.sh $HOME/bin/ConfigInstall
mv $HOME/bin/editCrontab.sh editCrontab
mv $HOME/bin/turnOn.sh turnOn
mv $HOME/bin/cleanUp.sh cleanUp
mv $HOME/bin/readEmail.sh readEmail

rm $HOME/bin/ShellInstall.sh

chmod 555 $HOME/bin/BChCycle01
chmod 555 $HOME/bin/ConfigInstall
chmod 555 $HOME/bin/startUp
chmod 555 $HOME/bin/editConfig
chmod 555 $HOME/bin/editCrontab
chmod 555 $HOME/bin/turnOn
chmod 555 $HOME/bin/cleanUp

cd $HOME/code/BeisChayim/python
sed -i -e 's#@@@@@#'$HOME'#g'  cleanup01.py
sed -i -e 's#@@@@@#'$HOME'#g' collect.py
sed -i -e 's#@@@@@#'$HOME'#g' csv2jsond.py
