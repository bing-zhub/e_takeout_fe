#! /bin/bash
echo '################################# Clean Dist Directory #################################'
rm -rf ./dist
echo '################################# Build Admin App #################################'
npm run build:prod
echo '################################# Build  Complete  #################################'
echo '################################# Zip Dist #################################'
zip -r -q -o ~/Desktop/dist/admin.zip ./dist/*
echo '################################# Zip Complete #################################'
echo '################################# Upload to Your Server #################################'