<template>
  <v-container>
    <!--<div class="my-2">-->
    <!--<v-btn x-large color="teal" dark width="100%">Sign up with facebook</v-btn>-->
    <!--</div>-->
    <!--<div class="my-2">-->
    <!--<v-btn x-large color="primary" dark width="100%">Login With Email</v-btn>-->
    <!--</div>-->

    <div v-if="val === 0">
      <div>Please provide your mobile phone number</div>
    </div>

    <div v-if="val === 1">
      <div>We've sent a 6-digit one time PIN in your phone +880{{mobile}}</div>
    </div>

    <v-form
      ref="form"
      v-model="valid"
    >

      <v-row v-if="val === 0">
        <v-col cols="12">
          <v-text-field
            prepend-icon="mdi-cellphone"
            prefix="+880"
            :counter="10"
            :rules="numberRules"
            required
            v-model="mobile"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="val === 1">
        <v-col cols="12">
          <v-text-field
            :counter="6"
            :rules="otpRules"
            required
            label="OTP"
            type="number"
            v-model="otp"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <div class="my-2" v-if="val === 0">
      <v-btn :disabled="!valid" x-large color="success" @click="sendOtp()">Login</v-btn>
    </div>

    <div class="my-2" v-if="val === 1">
      <v-btn :disabled="!valid" x-large color="success" @click="verify()">Verify</v-btn>
      <v-btn :disabled="timer !== 0" x-large color="success" @click="sendOtp()">Send Again ({{timer}})</v-btn>
    </div>


  </v-container>

</template>

<script>
  export default {
    name: 'LoginForm',

    data: () => ({
      valid: false,
      val: 0,
      mobile: '',
      otp: '',
      interval: null,
      numberRules: [
        v => !!v || 'Number is required',
        v => (v && v.length === 10) || 'Number must be of 10 digit',
        v => (v && v[0] === '1' && (v[1] === '3' || v[1] === '4' || v[1] === '5' || v[1] === '6' || v[1] === '7' || v[1] === '8' || v[1] === '9')) || 'Invalid Number',
      ],

      otpRules: [
        v => !!v || 'OTP is required',
        v => (v && v.length === 6) || 'OTP must be of 6 digit',
      ],

      timer: 0

    }),

    computed: {



    },

    methods: {
      async sendOtp() {
        await this.$refs.form.validate()
        let r = await this.$store.dispatch('profile/sendOtp', this.mobile)
        if (r) {
          this.val++
          this.startTimer()
        }

      },

      verify() {
        let r = this.$store.dispatch('profile/verifyOtp', { mobile: `880${this.mobile}`, otp: this.otp })
        if(r) {
          this.val = 0
          clearInterval(this.interval)
          this.$store.commit('component/setLoginDialog', false)
          this.otp = ''
          this.mobile = ''
        }
      },

      startTimer() {
        this.timer = 180
        this.interval = setInterval(() => {this.timer--}, 1000)
      }
    },

    watch: {
      timer (val) {
        if (val <= 0) {
          clearInterval(this.interval)
        }
      }
    }

  }
</script>
