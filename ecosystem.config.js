module.exports = {
  apps: [
    {
      name: 'stajWebClient',
      exec_mode: 'cluster',
      instances: process.env.INSTANCES, // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
    },
  ],
}
