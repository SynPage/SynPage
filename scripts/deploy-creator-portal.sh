DEST=$1

cd ../creator-portal
npm run build

cd build
tar -czf creator-portal.tar.gz *

scp creator-portal.tar.gz $DEST:/tmp/
ssh $DEST "sh /opt/StealthMode/scripts/update-creator-portal.sh"