# reinstall shell scripts
cd $HOME/bin
cp $HOME/bcCode/BeisChayim/ShellScripts/*.sh $HOME/bin
cp $HOME/bcCode/BeisChayim/ShellScripts/startUp $HOME/bin
mv $HOME/bin/editConfig.sh editConfig
mv $HOME/bin/BChCycle01.sh $HOME/bin/BChCycle01
mv $HOME/bin/ConfigInstall.sh $HOME/bin/ConfigInstall
mv $HOME/bin/editCrontab.sh editCrontab

chmod 555 $HOME/bin/BChCycle01
chmod 555 $HOME/bin/ConfigInstall
chmod 555 $HOME/bin/startUp
chmod 555 $HOME/bin/editConfig
chmod 555 $HOME/bin/editCrontab

cd $HOME/BeisChayim/python
sed -i -e 's#\/pi\/#\/efraim\/#g' cleanup01.py
sed -i -e 's#\/pi\/#\/efraim\/#g' collect.py
sed -i -e 's#\/pi\/#\/efraim\/#g' csv2jsond.py
