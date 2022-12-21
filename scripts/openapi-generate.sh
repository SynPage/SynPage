SCHEMA="../api/openapi/schema.yaml"

npm install
. ../api/venv/bin/activate
python ../api/manage.py generateschema --file $SCHEMA
npx @openapitools/openapi-generator-cli generate -i $SCHEMA -g typescript-axios -o ../creator-portal/src/generated
cp -r "../creator-portal/src/generated" "../web-extension/src/generated"
