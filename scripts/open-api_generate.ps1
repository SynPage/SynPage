$SCHEMA = "openapi-schema.yml"

npm install
../api/venv/Scripts/activate.ps1
python ../api/manage.py generateschema --file $SCHEMA
npx @openapitools/openapi-generator-cli generate -i $SCHEMA -g typescript-fetch -o ..\browser-extension\src\client\generated
