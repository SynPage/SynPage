$SCHEMA = "openapi-schema.yml"
$venv = $args[0]
$activate = Get-ChildItem -Path $venv -Filter Scripts/activate.ps1

npm install
Invoke-Expression $activate.FullName
python ../api/manage.py spectacular --file $SCHEMA
npx @openapitools/openapi-generator-cli generate -i $SCHEMA -g typescript-fetch -o ..\browser-extension\src\client\generated
