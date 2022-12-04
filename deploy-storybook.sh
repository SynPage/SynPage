DEST=$1

yarn install
yarn build-storybook

cd storybook-static
tar -czf learner-extension.tar.gz *

scp learner-extension.tar.gz $DEST:/tmp/
ssh $DEST "sh /opt/SynPage/scripts/update-learner-extension.sh"
