Gowod

#  Install Project

 `npx react-native init MyApp --template react-native-template-typescript`
 Erreur sur le run ios, 
 Comment :   `use_flipper!
                            post_install do |installer|
                            flipper_post_install(installer)
                        end`

`pod deintegrate`
`pod install`

Après run appli correct 

yarn or npm install

create .env and add 
PORT=3000

SERVER=http://localhost:3000

create db.config.js on /backend and add 
module.exports = {
    HOST: "localhost",
    PORT: 27017,
    DB: "app"
  };
