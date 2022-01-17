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
            { rel: 'icon', type: 'image/x-icon', href: '/helmet.ico' },
            { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css' },
            { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
        ],
        script: [
            { src: "//cdn.jsdelivr.net/npm/sweetalert2@11" },
            { src: "/js/jquery.min.js" },
            { src: "/js/bootstrap.bundle.min.js" },
            { src: "/js/bootadmin.min.js" },

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
    plugins: [
        '~/plugins/crypto.js',
        '~/plugins/random.js'
    ],


    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/dotenv',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        'nuxt-uid-module',
        'vue-sweetalert2/nuxt',
        '@nuxtjs/toast',
        '@nuxtjs/pwa', ['@nuxtjs/firebase',
            {
                config: {
                    apiKey: "AIzaSyB0gvg_pkm98XxGtY16W9dBlD8RgN98x2I",
                    authDomain: "markettukang-4459b.firebaseapp.com",
                    projectId: "markettukang-4459b",
                    storageBucket: "markettukang-4459b.appspot.com",
                    messagingSenderId: "442534122988",
                    appId: "1:442534122988:web:ae35472d19b4d87f68dcc9",
                    measurementId: "G-E1HTL401YC"
                },
                services: {
                    auth: true,
                    firestore: true,
                    functions: true,
                    storage: true,
                    database: true,
                    messaging: true,
                    performance: true,
                    analytics: true,
                    remoteConfig: true
                }
            }
        ]
    ],


    router: {
        middleware: ['auth']
    },

    auth: {
        redirect: {
            login: '/login',
            home: '/',
            logout: '/login'
        },
        strategies: {
            local: {
                token: {
                    property: "data.token"
                },
                endpoints: {
                    login: {
                        url: '/api/v1/auth/login_admin',
                        method: 'post',
                        propertyName: 'data.token',
                    },
                    logout: false,
                    user: {
                        url: '/api/v1/auth/users',
                        method: 'get',
                        propertyName: 'data',
                    },
                },
                autoFetchUser: true,
            },
        },
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: 'https://backend-market-tukang.herokuapp.com',
        // baseURL: 'http://ec2-18-142-122-133.ap-southeast-1.compute.amazonaws.com:8080',
        // baseURL: 'http://localhost:8080'
    },
    env: {
        // API_BASE_URL: 'http://localhost:8080/api/v1',
        // BASE_URL: 'http://localhost:8080'
        API_BASE_URL: 'https://backend-market-tukang.herokuapp.com/api/v1',
        BASE_URL: 'https://backend-market-tukang.herokuapp.com'
            // API_BASE_URL: 'http://ec2-18-142-122-133.ap-southeast-1.compute.amazonaws.com:8080/api/v1',
            // BASE_URL: 'http://ec2-18-142-122-133.ap-southeast-1.compute.amazonaws.com:8080'
    },


    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        splitChunks: {
            layouts: true
        },
        extend(config, ctx) {
            // Include the compiler version of Vue so that wp-content works
            config.resolve.alias["vue$"] = "vue/dist/vue.esm.js"
        }
    },
}