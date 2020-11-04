<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-toolbar color="#f8f1f1" dark flat prominent>
            <v-container>
              <v-toolbar-title class="text-center" style="text-align: center">
                <h1
                  class="font-weight-bold display-2 teal--text"
                  style="color: #16697a"
                >
                  Create Surgery Type
                </h1>
              </v-toolbar-title>
            </v-container>

            <!-- <v-text-field
        append-icon="mdi-microphone"
        class="mx-4"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      ></v-text-field> -->

            <template v-slot:extension>
              <v-tabs v-model="tabs" color="#16697a" centered>
                <v-tab style="color: teal" v-for="item in items" :key="item">
                  {{ item }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card class="mx-auto">
                <!-- <v-card-title>Add Surgery Type</v-card-title> -->
                <v-card-text>
                  <v-form @submit.prevent="createSurgeryType">
                    <v-row justify="center">
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Surgery Type"
                          outlined
                          required
                          v-model="type"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-textarea
                          rows="12"
                          background-color="grey lighten-2"
                          label="Add Description"
                          v-model="description"
                          required
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-btn color="teal" style="color: white" large
                        @click="createSurgeryType"
                        >Create</v-btn
                      >
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!-- --------------------------description ends here---------------- -->

            <v-tab-item>
              <v-card class="mx-auto">
                <!-- <v-card-title>Add Surgery Type</v-card-title> -->
                <v-card-text>
                  <v-row justify="center">
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        rows="5"
                        background-color="grey lighten-2"
                        label="The Week Before"
                        required
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        rows="5"
                        background-color="grey lighten-2"
                        label="The Night Before"
                        required
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        rows="5"
                        background-color="grey lighten-2"
                        label="The Day of Procedure"
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-btn color="teal" style="color: white" large
                      >Create</v-btn
                    >
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- -----------------prepare ends here------------------ -->

            <v-tab-item>
              <v-card class="mx-auto">
                <!-- <v-card-title>Add Surgery Type</v-card-title> -->
                <v-card-text>
                  <v-row justify="center">
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        rows="12"
                        background-color="grey lighten-2"
                        label="During the Procedure"
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-btn color="teal" style="color: white" large
                      >Create</v-btn
                    >
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <!-- ---------------------Visit ends here-------------- -->

            <v-tab-item>
              <v-card class="mx-auto">
                <!-- <v-card-title>Add Surgery Type</v-card-title> -->
                <v-card-text>
                  <v-row justify="center">
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        rows="5"
                        background-color="grey lighten-2"
                        label="How to help/care at Home"
                        required
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        rows="5"
                        background-color="grey lighten-2"
                        label="When to be concerned"
                        required
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        rows="5"
                        background-color="grey lighten-2"
                        label="Follow Up"
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-btn color="teal" style="color: white" large
                      :loading="isLoading"
                      >Create</v-btn
                    >
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <!-- ------------------------Home Care ends here-------------- -->
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template> 

<script>
import axios from "../../axios";
export default {
  data() {
    return {
      tabs: null,
      type: "",
      description: "",
      isLoading: false,
      items: ["Procedure", "Prepare", "Visit", "Home Care"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  methods: {
    createSurgeryType() {
      this.isLoading = true;
       axios()
        .post("/surgeryTypes/addSurgeryType", {
          type: this.type,
          description: this.description
        })
        .then((response) => {
          console.log(response.data);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.data);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>