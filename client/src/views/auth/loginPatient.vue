<template>
  <v-container>
    <v-row align-content-md="center" justify="center" align="center">
      <v-col cols="auto">
        <v-card width="600" class="pa-5 mt-10">
          <v-card-title>
            <span class="font-weight-bold">Login Here</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="User ID"
                    :maxlength="12"
                    type="text"
                    v-model="user.patientID"
                  ></v-text-field>
                  <v-row>
                    <v-col cols="auto">
                      <v-btn
                        class="primary mb-3"
                        @click="login"
                        :loading="isLoading"
                        >Submit</v-btn
                      >
                      <v-spacer></v-spacer>
                      <!-- <span class="mb-3">
                                            <router-link class="text-decoration-none" to="/auth/forgot">Forgot Password ?</router-link>
                                        </span>
                                        <v-spacer></v-spacer>
                                        <span class="mb-3">
                                            <router-link class="text-decoration-none" to="/auth/register">Don't have an account ?</router-link>
                                        </span> -->
                    </v-col>
                  </v-row>
                </v-col>
                <v-snackbar
                  v-model="snackbar"
                  top
                  right
                  :color="color"
                  timeout="3000"
                  :vertical="vertical"
                  >{{ message }}</v-snackbar
                >
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["response"],
  data() {
    return {
      user: {
        patientID: "",
      },
      vertical: true,
      valid: false,
      snackbar: false,
      isLoading: false,
      color: "success",
      message: this.response,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$store
        .dispatch("loginPatient", this.user)
        .then((response) => {
          this.isLoading = false;
          if (this.$store.getters.role == "Patient") {
            this.$router.push("/user/profile/surgeryDetails");
          } 
        })
        .catch((err) => {
          this.isLoading = false;
          this.snackbar = true;
          this.color = "error";
          this.message = "PLease enter valid userID";
          console.log(err);
        });
    },
  },
};
</script>
