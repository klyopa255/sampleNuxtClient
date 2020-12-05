# stajWebClient

## Requirements

- NodeJS 12.18.3
- Supervisor / SystemD / PM2 or other service management system

## Build Setup

1. Upload project into application root directory
2. Install project requirements using NPM (`npm install` command)
3. Build application for serving via nuxt-server (`npm run build` command)
4. Run nuxt-server using you preffered service management system and proxy requests from nginx to nuxt (`npm run start` command)
5. OPTIONAL. Build application as SPA-apllication (`npm run generate` command) SPA-application stored in dist directory.

### Host and port configuration

Default host and port can be changed .env file

### API URL

API url can be changed in .env file

###

### Nginx and SPA-application:

The following directive in your site configuration will direct all requests to the index.html front controller:

```
location / {
     try_files $uri $uri/ /index.html;
}
```

### Google map API key:

1. Go to the [Google Cloud Platform Console](https://cloud.google.com/console/google/maps-apis/overview).
2. Click the project drop-down and select or create the project for which you want to add an API key.
3. Click the menu button and select APIs & Services > Credentials.
4. On the Credentials page, click + Create Credentials > API key. The API key created dialog displays the newly created API key.
5. Click Close. The new API key is listed on the Credentials page under API Keys.

### Nginx and proxy requests to nuxt-server:

The following directive in your site configuration will direct all requests to the nuxt-server:

```
location / {
    proxy_pass         http://127.0.0.1:3000;
    proxy_redirect     off;
    proxy_set_header   Host $host;
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Host $server_name;
}
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
