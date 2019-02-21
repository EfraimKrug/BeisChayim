# reinstall shell scripts
cd $HOME/bin
cp $HOME/$1/BeisChayim/ShellScripts/*.sh $HOME/bin
mv $HOME/bin/BChCycle01.sh $HOME/bin/BChCycle01
mv $HOME/bin/editCrontab.sh editCrontab
mv $HOME/bin/turnOn.sh turnOn
mv $HOME/bin/cleanUp.sh cleanUp
mv $HOME/bin/readEmail.sh readEmail
mv $HOME/bin/setRun.sh setRun
mv $HOME/bin/setView.sh setView
mv $HOME/bin/CONreinstall.sh CONreinstall
mv $HOME/bin/CONreinstallCurrent.sh CONreinstallCurrent
mv $HOME/bin/CONCollect.sh CONCollect


rm $HOME/bin/ShellInstall.sh

chmod 555 $HOME/bin/BChCycle01
chmod 555 $HOME/bin/editCrontab
chmod 555 $HOME/bin/turnOn
chmod 555 $HOME/bin/cleanUp
chmod 555 $HOME/bin/setView
chmod 555 $HOME/bin/setRun
chmod 555 $HOME/bin/CONreinstall
chmod 555 $HOME/bin/CONreinstallCurrent
chmod 555 $HOME/bin/CONCollect

cd $HOME/$1/BeisChayim/python
sed -i -e 's#X@~@~@X#'$HOME/$1'#g' cleanup01.py
sed -i -e 's#X@~@~@X#'$HOME/$1'#g' collect.py
sed -i -e 's#X@~@~@X#'$HOME/$1'#g' csv2jsond.py
sed -i -e 's#X@~@~@X#'$HOME/$1'#g' json2csv.py
sed -i -e 's#X@~@~@X#'$HOME/$1'#g' readRunCheck.py

cd $HOME/$1/BeisChayim/console
sed -i -e 's#X@-@X#'$HOME'#g' profile.py
sed -i -e 's#X@~@~@X#'$HOME/$1'#g' profile.py
