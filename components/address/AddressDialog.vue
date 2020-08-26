<template>

  <v-dialog v-model="dialog" max-width="500">
    <v-card class="text-center">
      <v-card-title>
        <span class="headline font-weight-light" v-if="activeAddress.id">Edit Location</span>
        <span class="headline font-weight-light" v-else>Add Location</span>
        <v-spacer />
        <v-icon aria-label="Close" @click="dialog = false">mdi-close</v-icon>
      </v-card-title>

      <v-card-text class="mt-4">
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            outlined
            v-model="name"
            label="Name"
            :rules="[rules.required]"
            persistent-hint
          ></v-text-field>

          <v-text-field
            outlined
            v-model="phone"
            label="Phone"
            :rules="numberRules"
            persistent-hint
          ></v-text-field>

          <v-select
            outlined
            :items="areas"
            v-model="area"
            item-text="name"
            item-value="id"
            label="Area"
            return-object
            :rules="[rules.required]"
            persistent-hint
          ></v-select>

          <v-textarea
            outlined
            name="address"
            label="Address"
            v-model="address1"
            rows="3"
            :rules="[rules.required]"
            persistent-hint
          ></v-textarea>

          <v-row>

            <v-col cols="6" md="4">
              <v-text-field
                outlined
                v-model="city"
                label="City"
                :rules="[rules.required]"
                persistent-hint
              ></v-text-field>
            </v-col>

            <v-col cols="6" md="4">
              <v-text-field
                outlined
                v-model="district"
                label="District"
                :rules="[rules.required]"
                persistent-hint
              ></v-text-field>
            </v-col>

            <v-col cols="6" md="4">
              <v-text-field
                outlined
                v-model="zip"
                label="Zip"
                :rules="[rules.required]"
                persistent-hint
              ></v-text-field>
            </v-col>

          </v-row>

        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="deep-purple lighten-2" text v-if="activeAddress.id" :disabled="!valid" @click="updateLocation">Update</v-btn>
        <v-btn color="deep-purple lighten-2" text v-else @click="addLocation">Add</v-btn>
      </v-card-actions>

    </v-card>

  </v-dialog>

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {

    name: 'AddressDialog',

    data: () => ({
      location: {},
      valid: false,
      rules: {
        required: value => !!value || 'Required.',
      },
      numberRules: [
        v => !!v || 'Number is required',
        v => (v && v.length === 13) || 'Number must be of 13 digits appending 88',
        v => (v && v[0] === '8' && v[1] === '8' && v[2] === '0' && v[3] === '1' && (v[4] === '3' || v[4] === '4' || v[4] === '5' || v[4] === '6' || v[4] === '7' || v[4] === '8' || v[4] === '9')) || 'Invalid Number',
      ],
    }),

    computed: {
      ...mapGetters({
        areas: 'bootstrap/getAreas',
        activeAddress: 'profile/getActiveAddress'
      }),

      dialog: {
        get () {
          return this.$store.state.component.addressDialog
        },
        set (val) {
          this.$store.commit('component/setAddressDialog', val)
        }
      },

      name: {
        get() {
          return this.$store.state.profile.activeAddress.locationName
        },
        set (val) {
          this.location.locationName = val
        }
      },

      phone: {
        get() {
          return this.$store.state.profile.activeAddress.phone
        },
        set (val) {
          this.location.phone = val
        }
      },

      address1: {
        get() {
          return this.$store.state.profile.activeAddress.address1
        },
        set (val) {
          this.location.address1 = val
        }
      },

      area: {
        get() {
          return this.$store.state.profile.activeAddress.areaId
        },
        set (val) {
          this.location.areaId = val.id
        }
      },

      city: {
        get() {
          return this.$store.state.profile.activeAddress.city
        },
        set (val) {
          this.location.city = val
        }
      },

      zip: {
        get() {
          return this.$store.state.profile.activeAddress.zip
        },
        set (val) {
          this.location.zip = val
        }
      },

      district: {
        get() {
          return this.$store.state.profile.activeAddress.district
        },
        set (val) {
          this.location.district = val
        }
      },
    },

    methods: {
      addLocation() {
        this.$store.dispatch('profile/addLocation', this.location)
      },

      updateLocation() {
        this.location.locationId = this.activeAddress.id
        this.$store.dispatch('profile/updateLocations', { ...this.activeAddress, ...this.location } )
      }
    }

  }
</script>
