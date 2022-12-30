$SCHEMA = "openapi-schema.yml"

npm install
python ../api/manage.py generateschema --file $SCHEMA
npx @openapitools/openapi-generator-cli generate -i $SCHEMA -g typescript-fetch -o ..\creator-portal\src\generated
cp -Path "..\creator-portal\src\generated" -Destination "..\web-extension\src\generated" -Recurse
