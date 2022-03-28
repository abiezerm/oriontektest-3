
// Suponiendo que los datos estén en un servicio web.

const API_CLIENTS_URL = ""

// ... y obtendriamos un objeto JSON parecido a este:

const CLIENTS_JSON = `{
    "clients": [
        {
            "name": "Edgard Allan Poe",
            "addresses": [
                {
                    "name": "Principal",
                    "address": "Boston, Massachusetts",
                    "active": true
                },
                {
                    "name": "Work",
                    "address": "Baltimore, Meryland",
                    "active": true
                }
            ]
        },
        {
            "name": "Carol Lewis",
            "addresses": [
                {
                    "name": "Principal",
                    "address": "Birmingham (Estados Unidos)",
                    "active": true
                }
            ]
        },
        {
            "name": "Malba TahanMalba Tahan",
            "addresses": [
                {
                    "name": "Principal",
                    "address": "State of São Paulo, Brasil",
                    "active": true
                },
                {
                    "name": "Work",
                    "address": "Rio de Janeiro",
                    "active": false
                },
                {
                    "name": "Family",
                    "address": "Portugal",
                    "active": true
                }
            ]
        }
    ]
}`


const ClientApp = {
    data() {
        return {
            message: "",
            message_type: "info",
            search: "",
            clients: [],
            clients_result: [],
            current_client: null,
            new_client: {
                name: "",
                addresses: [],
            },
            new_address: {
                name: "",
                address: "",
                active: true,
            }

        }
    },
    mounted() {

        // Cargamos los clientes de la API.
        this.getData(API_CLIENTS_URL, function(app, data) {
            app.clients = data.clients;
            app.clients_result = data.clients;
        });

    },
    methods: {

        /**
         * Realiza una solicitud GET a la URL que contiene los datos en JSON.
         * @param {string} url URL del servicio web que contiene los datos.
         * @param {function} callback Función que se ejecutará si la respuesta 
         * es exitosa. Debe recibir 2 argumentos (Vue instance y los datos recibidos).
         */
        getData(url, callback) {
            let data = JSON.parse(CLIENTS_JSON);
            callback(this, data);
            return;
            // Suponiendo que los datos se encuentren en una API rest. 
            // Se ejecutaría este código:

            fetch(url) 
            .then(response => response.json())
            .then(data => {
                callback(this, data);
            })
            .catch(error => {
                this.showMessage(error, "danger");
            })
        },

        /**
         * Obtiene las direcciones activas del cliente indicado.
         * @param {Object} client El objeto cliente que contiene los datos.
         * @returns {Array} Un array de objetos con las direcciones activas.
         */
        getActiveAddresses(client) {
            return client.addresses.filter(address => address.active);
        },

        onSearch() {
            let search = this.search.toLowerCase();
            this.clients_result = this.clients.filter(e => e.name.toLowerCase().includes(search));
        },

        onSaveNewAddress() {
            if (this.new_address.name && this.new_address.address) {
                this.current_client.addresses.push({...this.new_address});
                this.new_address.name = "";
                this.new_address.address = "";
            }
        },

        onInactiveAddress(address) {
            address.active = false;
        },

        onSelectClient(client) {
            this.current_client = client;
            this.new_address = {
                name: "",
                address: "",
                active: true,
            }
        },

        onSaveNewClient() {
            if (this.new_client.name) {
                this.clients.push({...this.new_client});
                this.new_client.name = "";
            }
        },

        showMessage(message, type="info") {
            this.message = message;
            this.message_type = type || "info";

            setTimeout(() => {
                this.message = "";
                this.message_type = "info";
            }, 5000);
        } 
    }
}