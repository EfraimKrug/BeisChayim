cd $HOME/bin
sed -i -e 's/chromium-browser/firefox/g' BChCycle01
sed -i -e 's/chromium-browser/firefox/g' ConfigInstall
sed -i -e 's/chromium-browser/firefox/g' startUp
sed -i -e 's/--start-fullscreen//g' BChCycle01
sed -i -e 's/--start-fullscreen//g' ConfigInstall 
sed -i -e 's/--start-fullscreen//g'  startUp
