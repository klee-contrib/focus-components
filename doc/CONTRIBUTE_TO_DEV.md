# How to contribute ?

## You are a *developer*

### Prerequisites

You must have installed the following softwares on you computer:
* [`Git bash`](https://git-for-windows.github.io/)
* [`Atom`](https://atom.io/) or [`Webstorm`](https://www.jetbrains.com/webstorm/) or your favorite IDE

First, the project must be cloned on you local machine. To do it, use the following command line.

```bash
git clone https://github.com/KleeGroup/focus-components.git
```

### 1. Update your project

Be sure to be positionned on the right branch `develop`.

```bash
git checkout develop
```

Synchronize the branch. To do so, execute the following command to synchronize latest modifications on your local repository:

```bash
git fetch
```

Then, execute the following command to download the latest version (latest modification) of the branch `develop`:

```bash
git pull
```

Your are "up-to-date" on the `develop` branch.

### 2. Fork the branch develop

As we don't want FOCUS developers to commit directly on this branch, you have to fork it and submit [Git pull requests](https://help.github.com/articles/using-pull-requests/).

To create a new branch, you can use this command:

```bash
git checkout -b fix-panel
```

Your current local branch is now `fix-panel`.

Choose the branch name you prefer. However, we recommend using the following prefixes:
* `fix-`[name of the fix]
* `feature-`[name of the new feature]

> `Fix-` branch must be used to fix some code issues.
>
> `Feature-` branch must be used to develop new features.

### 3. Realize your developments : update / fix / add new feature

1. develop your new feature or fix the issue you've detected
2. update the __tests__ ; *that's really important as we want to guarantee the best developer and user exeprience*
3. before pushing the result of your work, please increase the version number of FOCUS-COMPONENTS in the `package.json` file. For example:

```JSON
{
  ...
  "version": "0.7.3-beta1",
  ...
}
```

> What's really important is to increase the version number and suffix it by `-beta[number]`.
>
> For example, if the version number is currently 0.7.2 (corresponding to the latest release number), please update it to `0.7.3-beta1`.

### 5. Commit your developments

Once you've finished your developments, push it to the github server. To do so, you have to:

1. identify your modifications and add file for a commit. For example:
```bash
git add src/components/panel/index.js
```

2. commit your modification by using the command:
```bash
git commit -m '[panel] the purpose of your commit'
```

3. your commit is local, so don't forget to push it on the github repository, by using this command:
```bash
git push
```

### 6. Create a pull request

Once you finished your developments and commited it, you can create a [pull request](https://help.github.com/articles/using-pull-requests/) so your work can be merged to the `develop` branch, so that the FOCUS community enjoys.

## 1. Create the pull request

Two ways of creating it :

When you consult project's Github page https://github.com/KleeGroup/focus-components, a message is displayed encouraging you to create a pull request. Then click on `Compare & pull request` button.

![github_create_pr](https://cloud.githubusercontent.com/assets/5349745/10515715/03969b34-7355-11e5-96db-db651a17bcb4.PNG)

Other solution to create a pull request, by clicking on pull request icon : 

![image](https://cloud.githubusercontent.com/assets/5349745/10517633/e3c27b3a-735d-11e5-9677-13edcec43bab.png)


> Follow the following Pull request template, depending on the type of content you wish to submit:
>
> * You propose a new feature, please read [how to write a pull request to share a new feature](https://github.com/KleeGroup/focus-components/tree/develop/doc/PR_FEATURE_TEMPLATE.md)
> * You propose a fix, please read [how to write a pull request to share a fix](https://github.com/KleeGroup/focus-components/tree/develop/doc/PR_FIX_TEMPLATE.md)

## You are a *FOCUS administrator*

Role of FOCUS administrator is to validate pull requests.

Below the procedure of validation:

1. Add a label `Review needed`
2. Read the pull request
3. Comment the code, or open discution with the developer if needed
4. If the pull request suits the FOCUS team, validate it and merge it.
5. Complete the current draft release note to add the feature / fix to the note.
