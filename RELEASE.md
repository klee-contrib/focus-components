In order to release a new version of focus on both **github** and **npm**, you have to follow these steps:

1. Get the latest version of the sources on the `master` branch with a `git pull origin master`
2. Increase the version in the `package.json` file (maybe it has already be done check [npm](https://www.npmjs.com/package/focusjs-components) website  
3. Go on the **Release** branch with a `git checkout release`
4. Be sure to have the latest version of the release branch with a `git pull origin release`
5. Merge all changes from **master** branch into **release** branch with a `git merge master`
6. Perform a `npm run build` (Just to be sure)
7. Commit all build's product onto the release branch (it consists of the `focus-components.{js,css}` from the `dist` directory).
8. Create a git tag `git tag -a vX.Y.Z -m 'Focus components vX.Y.Z'`
9. Push the tag on github `git push origin --tags`
10. Publish the npm package with `npm publish` command
11. It should be OK
12. Go on github release page: [Focus-components releases](https://github.com/KleeGroup/focus-components/releases) and draft a new release with a release note detailing all the changes and bug fixes.

![release](https://cloud.githubusercontent.com/assets/286966/9245340/8b696b1a-41a3-11e5-981d-f0a0653605fa.gif)

12. You can now go back on `master` branch and increase the package version on the latest digit: `X.Y.Z+1`
