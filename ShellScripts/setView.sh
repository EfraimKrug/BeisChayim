CODE_DIRECTORY=bcCode
echo '//var RunPhase = { "phase01": {"run_type":"security"}};' > $HOME/$CODE_DIRECTORY/BeisChayim/config/RunPhase
echo 'var RunPhase = { "phase01": {"run_type":"view"}};'  >> $HOME/$CODE_DIRECTORY/BeisChayim/config/RunPhase
$HOME/bin/turnOn $CODE_DIRECTORY
