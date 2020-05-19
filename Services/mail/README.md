
# Nodemailer

[![Nodemailer](https://raw.githubusercontent.com/nodemailer/nodemailer/master/assets/nm_logo_200x136.png)](https://nodemailer.com/about/)

Send e-mails from Node.js – easy as cake! 🍰✉️

[![NPM](https://nodei.co/npm/nodemailer.png?downloads=true&downloadRank=true&stars=true)](https://nodemailer.com/about/)

See [nodemailer.com](https://nodemailer.com/) for documentation and terms.

# Nodemailer

Generate config

[https://developers.google.com/people/quickstart/nodejs?pli=1&authuser=3]

Downoload your creadential and : cd src/config/nodemail_conf
RUN node setup_mail.js for generate your tokens


Or 

Nodemailer process :

To find your credentials api please go to [https://console.developers.google.com/apis/credentials?clientUpdateTime=2020-04-08T15:23:39.289601Z&project=rapid-spider-156721&authuser=3]
 - create your credentials
 - after this process you can get your ClientId and Client Secret

Now go to [https://developers.google.com/oauthplayground/](playground) for generate your AccessToken and Refresh token


Or By curl 


# Client id from Google Developer console
# Client Secret from Google Developer console
# Scope this is a space seprated list of the scopes of access you are requesting.

# Authorization link.  Place this in a browser and copy the code that is returned after you accept the scopes.
https://accounts.google.com/o/oauth2/auth?client_id=[Application Client Id]&redirect_uri=urn:ietf:wg:oauth:2.0:oob&scope=[Scopes]&response_type=code

# Exchange Authorization code for an access token and a refresh token.

curl \
--request POST \
--data "code=[Authentcation code from authorization link]&client_id=[Application Client Id]&client_secret=[Application Client Secret]&redirect_uri=urn:ietf:wg:oauth:2.0:oob&grant_type=authorization_code" \
https://accounts.google.com/o/oauth2/token

# Exchange a refresh token for a new access token.
curl \
--request POST \
--data 'client_id=[Application Client Id]&client_secret=[Application Client Secret]&refresh_token=[Refresh token granted by second step]&grant_type=refresh_token' \
https://accounts.google.com/o/oauth2/token
