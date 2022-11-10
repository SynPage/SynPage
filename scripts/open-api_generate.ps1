$SCHEMA = "openapi-schema.yml"

npm install
python ../api/manage.py generateschema --file $SCHEMA
npx @openapitools/openapi-generator-cli generate -i $SCHEMA -g typescript-axios -o .\creator-portal\src\client

rm $SCHEMA