name="db01-old"
if [[ -e $name.js ]] ; then
    i=0
    while [[ -e $name-$i.js ]] ; do
        let i++
    done

    let j=$i-3

    oldname=$name-$j
    name=$name-$i
    rm "$oldname".js
fi
touch "$name".js

cp ~/code/beisChayim/js/db01.js ~/code/beisChayim/js/"$name".js
cp ~/code/beisChayim/data/out02 ~/code/beisChayim/js/db01.js
python ~/code/beisChayim/python/collect.py > ~/code/beisChayim/data/out03
mv ~/code/beisChayim/data/\$\$BC\$\$* ~/code/beisChayim/data/used
cp ~/code/beisChayim/data/out03 ~/code/beisChayim/js/db01.js
