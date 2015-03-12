cd ../focus/
git pull origin master
npm install --no-optional
gulp browserify
cd ../focus-components/
git pull origin master
npm install --no-optional
gulp componentify
gulp browserify
npm run example
