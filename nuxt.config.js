export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Panel Market Tukang',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://cdn.datatables.net/1.11.3/css/dataTables.bootstrap4.min.css' },
            { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css' },
            { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
        ],
        script: [
            { src: "//cdn.jsdelivr.net/npm/sweetalert2@11" },
            { src: "https://code.jquery.com/jquery-3.3.1.min.js" },
            { src: "/js/jquery.min.js" },
            { src: "/js/bootstrap.bundle.min.js" },
            { src: "/js/bootadmin.min.js" },
            { src: "https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js" },
            { src: "https://cdn.datatables.net/1.11.3/js/dataTables.bootstrap4.min.js" }
        ],
    },
    loading: { color: 'red' },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/bootstrap.min.css',
        '@/assets/css/fontawesome-all.min.css',
        '@/assets/css/bootadmin.min.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        'vue-sweetalert2/nuxt',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
}