<template>
  <v-row justify="center">
    <v-col md="8">
      <v-card flat outlined>

        <v-card-title>
          <span class="headline font-weight-light">Info</span>
          <v-spacer></v-spacer>
          <v-btn fab depressed small @click="isEditing = !isEditing">
            <v-icon v-if="isEditing">mdi-close</v-icon>
            <v-icon v-else>mdi-pencil</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>

          <v-form
            ref="form"
            v-model="valid"
          >

            <v-text-field
              type="text"
              label="Name"
              v-model="name"
              :rules="[rules.required]"
              persistent-hint
              :disabled="!isEditing"
              value="John Doe"
            ></v-text-field>

            <v-text-field
              v-model="phone"
              label="Phone"
              :rules="numberRules"
              persistent-hint
              :disabled="!isEditing"
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="Email"
              :rules="emailRules"
              persistent-hint
              :disabled="!isEditing"
            ></v-text-field>

          </v-form>

        </v-card-text>



        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!isEditing || !valid" color="success" @click="save">Save</v-btn>
        </v-card-actions>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'ProfileInfo',
    data: () => ({
      valid: false,
      user: {},
      rules: {
        required: value => !!value || 'Required.',
      },
      emailRules: [v => !v ||  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'],
      numberRules: [
        v => !!v || 'Number is required',
        v => (v && v.length === 13) || 'Number must be of 13 digits appending 88',
        v => (v && v[0] === '8' && v[1] === '8' && v[2] === '0' && v[3] === '1' && (v[4] === '3' || v[4] === '4' || v[4] === '5' || v[4] === '6' || v[4] === '7' || v[4] === '8' || v[4] === '9')) || 'Invalid Number',
      ],
      hasSaved: false,
      isEditing: null,
      model: null
    }),

    methods: {
      save () {
        this.isEditing = !this.isEditing
        this.hasSaved = true
        const user = {
          name: this.user.name || this.$store.state.auth.user.name,
          phoneNumber: this.user.phone || this.$store.state.auth.user.phoneNumber,
          email: this.user.email || this.$store.state.auth.user.email,
          customerId: this.$store.state.auth.user.id
        }

        this.$store.dispatch('profile/updateProfile', user)
      },
    },

    computed: {
      name: {
        get() {
          return this.$auth.user.name
        },
        set(val) {
          this.user.name = val
        }
      },
      phone: {
        get() {
          return this.$store.state.auth.user.phoneNumber
        },
        set(val) {
          this.user.phone = val
        }
      },

      email: {
        get() {
          return this.$store.state.auth.user.email
        },
        set(val) {
          this.user.email = val
        }
      }
    }
  }
</script>
