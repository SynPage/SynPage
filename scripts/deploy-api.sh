DEST=$1

cd ../api
. venv/bin/activate
rm dist/*
python3 setup.py sdist
deactivate

scp dist/synpage_platform-*.tar.gz $DEST:/tmp/
ssh $DEST "sh /opt/SynPage/scripts/update-api.sh"