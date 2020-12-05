export default function ({ app, $axios }, inject) {
  // Create a custom axios instance for public endpoints
  const pubAPI = $axios.create()

  // Create a custom axios instance for protected endpoints
  const privAPI = $axios.create()
  // Inject to context as $privAPI
  inject('privAPI', privAPI)

  // Inject to context as $pubAPI
  inject('pubAPI', pubAPI)
}
