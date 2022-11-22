for lessfile in $(find ./lib/**/ -name "*.less"); do
cssfile=$(echo $lessfile | sed 's/\.less$/.css/i')
echo "Compiling $lessfile to $cssfile";
rm -f $cssfile;
lessc --js --rewrite-urls=local -rp=./src --autoprefix $lessfile > $cssfile;
done;
