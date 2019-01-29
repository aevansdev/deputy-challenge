<template>
  <div id="app" class="deputy-app">
    <!-- Header -->
    <header class="header-primary">
        <div class="content-wrap">
            <b-container>
                <b-row>
                    <b-col>
                        <a class="brand" href="#"></a>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </header>

    <!-- Main Content -->
    <section class="content-wrap">
        <b-container>
            <!-- Heading -->
            <h1 class="text-center">You're in good company</h1>

            <!-- Filters -->
            <b-row class="filters">
                <b-col class="d-flex align-items-center" sm="12" md="1">
                    <span class="filter-label">filter by</span>
                </b-col>
                <b-col sm="12" md="10">
                    <b-row>
                        <b-col sm="12" md="3">
                            <b-form-group>
                                <b-form-select v-model="selectedIndustry" id="industries" v-bind:plain="true">
                                    <option value="">Industries</option>
                                    <option v-for="(industry, index) in uniqueIndustries" v-bind:value="industry" :key="index">
                                        {{ industry }}
                                    </option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col sm="12" md="3">
                            <b-form-group>
                                <b-form-select v-model="selectedLocation" id="location" v-bind:plain="true">
                                    <option value="">Location</option>
                                    <option v-for="(location, index) in uniqueLocations" v-bind:value="location" :key="index">
                                        {{ location }}
                                    </option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col sm="12" md="3">
                            <b-form-group>
                                <b-form-select v-model="selectedCompanySize" id="company-size" v-bind:plain="true">
                                    <option value="">Company Size</option>
                                    <option v-for="(companySize, index) in uniqueCompanySizes" v-bind:value="companySize" :key="index">
                                        {{ companySize }}
                                    </option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col sm="12" md="3">
                            <b-form-group>
                                <b-form-select v-model="selectedUseCase" id="use-case" v-bind:plain="true">
                                    <option value="">Use Case</option>
                                    <option v-for="(useCase, index) in uniqueUseCases" v-bind:value="useCase" :key="index">
                                        {{ useCase }}
                                    </option>
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <!-- Tiles -->
            <b-row>
                <b-col sm="12" md="4" v-for="(client, index) in filteredClients" :key="index">
                    <div class="tile">
                        <img v-bind:src="client.image_url" alt="" />
                        <p class="description">{{ client.excerpt }}</p>
                        <p class="read-more">
                            <a href="#">Read more</a>
                        </p>
                        <p class="duration">{{ Math.ceil(client.word_count/wordsReadPerMinute) }} min read</p>
                    </div>
                </b-col>
            </b-row>

            <!-- Pagination -->
            <b-row>
                <b-col>
                    <b-pagination 
                        size="md"
                        align="center"
                        v-model="page"
                        :page-range="3"
                        :margin-pages="3"
                        :click-handler="clickCallback"
                        :prev-text="'Prev'"
                        :next-text="'Next'"
                        :total-rows="totalRows"
                        :per-page="resultsPerPage"
                    >
                    </b-pagination>
                </b-col>
            </b-row> 
        </b-container>
    </section>
  </div>
</template>

<script>
import Clients from './assets/clients.json'
import Settings from './assets/settings.json'
export default {
    name: 'app',
    data () {
        return {
            page: 1,
            resultsPerPage: Settings.resultsPerPage,
            pageCount: Math.ceil(Clients.length/Settings.resultsPerPage),
            totalRows: Clients.length,
            clients: Clients,
            wordsReadPerMinute: Settings.wordsReadPerMinute,
            selectedIndustry: '',
            selectedLocation: '',
            selectedCompanySize: '',
            selectedUseCase: ''
        }
    },
    methods: {
        clickCallback(pageNum) {
            this.page=pageNum; // Reset page to 1
        }
    },
    computed: {
        // loop through each set of elements to only return unique elements to the arrays 
        // which populate the option lists, then sort the results alphabetically or numerically.
        uniqueIndustries() {
            let industries = [];
            this.clients.forEach((client) => {
                if(industries.indexOf(client.industry) < 0 ) {
                    industries.push(client.industry);
                }
            });

            industries.sort();
            return(industries);
        },
        uniqueLocations() {
            let locations = [];
            this.clients.forEach((client) => {
                if(locations.indexOf(client.location) < 0) {
                    locations.push(client.location);
                }
            });

            locations.sort();
            return(locations);
        },
        uniqueCompanySizes() {
            let companySizes = [];
            this.clients.forEach((client) => {
                if(companySizes.indexOf(client.company_size) < 0) {
                    companySizes.push(client.company_size);
                }
            });

            companySizes.sort((a, b) => {
                let ax = parseInt(a);
                let bx = parseInt(b);
                return ax - bx;
            });

            return(companySizes);        
        },
        uniqueUseCases() {
            let useCases = [];
            this.clients.forEach((client) => {
                client.use_case.forEach((uc) => {
                    if(useCases.indexOf(uc) < 0) {
                        useCases.push(uc);
                    }
                })
            });

            useCases.sort();
            return(useCases);
        },
        filteredClients() {

            let clients = JSON.parse(JSON.stringify(this.clients));

            // Filter by Category
            if (this.selectedIndustry !== '') {
                const industry = this.selectedIndustry;
                clients = clients.filter((client) => client.industry === industry)
            }

            // Filter by Location
            if (this.selectedLocation !== '') {
                const location = this.selectedLocation;
                clients = clients.filter((client) => client.location === location)
            }

            // Filter by Company Size
            if (this.selectedCompanySize !== '') {
                const companySize = this.selectedCompanySize;
                clients = clients.filter((client) => client.companySize === companySize)
            }

            // Filter by Use Case
            if (this.selectedUseCase !== '') {
                const useCase = this.selectedUseCase;
                clients = clients.filter((client) => client.use_case.indexOf(useCase))
            }

            this.totalRows = clients.length;

            // Put me on the right page
            let page = this.page;
            if(clients.length > Settings.resultsPerPage) {
                clients = clients.splice((page-1) * Settings.resultsPerPage, Settings.resultsPerPage);
            }

            // Return the filtered and paginated results.
            return(clients);
        }
    }
}
</script>
