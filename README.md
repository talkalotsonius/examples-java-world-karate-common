# examples-java-world-karate-common
This repo is used in conjunction with the project `java-karate-tests` in [examples-java-world](https://github.com/talkalotsonius/examples-java-world)
it serves as a demonstration how to use and integrate a common repository to serve 
common test cases and configuration over multiple projects.
Very handy should you need to automate large projects running very similar tests.

##  Integration & Installation
### Integration
To bind this Common-Repository you need to integrate it as a git-submodule tracking the master branch 
under the respective Karate project:
```
git submodule add --name karate-common -b master https://github.com/talkalotsonius/examples-java-world-karate-common.git common
```
to the `<PROJECT_NAME>/src/test/resources` folder.

Update an already existing submodule by the following init command:
```
git submodule update --init --recursive
```

### Installation
Afterwards it's essential to relative symlink these two files
to the `<PROJECT_NAME>/src/test/resources` directory:
```shell
cd <PROJECT_NAME>/src/test/resources
ln -s ./common/karate-base.js karate-base.js
ln -s ./common/logback-test.xml logback-test.xml
```
