# Softala3SuperAdaBackend
Backend for SuperAda project

# Test:
browser type: localhost:3000

# Run tests:
todo

# Run on localDatabase:
todo

# Setup guide

## Windows

Git pull project.
Recomended to use tortoiseSVN

Inside local repository

```
npm i -g nodemon
```

Try running nodemon - soft inside local repo
```
nodemon
```

```
//If nodemon isnt found in cmd try:
C:\>npm config get prefix
C:\Users\username\AppData\Roaming\npm

C:\>set PATH=%PATH%;C:\Users\username\AppData\Roaming\npm;

C:\>nodemon
```

install postgresql https://www.bigsql.org/postgresql/installers.jsp
NOTE install all 3 selectable paggages and set password to "admin"

try running again
```
nodemon
```

init db
```
TODO npm run db:migrate
```

try with browser
```
TODO
```
```diff
- UPON errors try this:
```
```
  Change port in index.js
  you can try port 30000 or any other. in netstat you can see all ports currently in use

  Change user and password in db.js
  its likely user is postgres if not go to bigsql manager and see the name of db owner
```

## Mac

git pull

Inside repo

```
npm i -g nodemon
```

Try runnin soft inside repo
```
nodemon
```

install postgre with brew:

```
$ brew update
$ brew doctor
$ brew install postgresql
$ initdb /usr/local/var/postgres -E utf8
$ gem install lunchy
$ mkdir -p ~/Library/LaunchAgents

--set launcher NOTE make sure to change version "9.2.1" to what ever you downloaded
$ cp /usr/local/Cellar/postgresql/9.2.1/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/

--launch dbserver
$ lunchy start postgres

-- to stop server when no longer in use type:
//$ lunchy stop postgres
```

now in terminal within repo initiate db tables
```
TODO npm run db:init
```

to make sure tables and db connection works run on browser
```
TODO
```
