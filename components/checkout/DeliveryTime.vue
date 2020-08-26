<template>
  <v-card-text>

    <v-row>

      <v-col md="6">
        <v-select
          v-model="day"
          :items="days"
          item-text="state"
          item-value="abbr"
          label="Select Day"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>

      <v-col md="6">
        <v-select
          v-model="time"
          :items="times"
          item-text="title"
          item-value="value"
          label="Select Time"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>

    </v-row>




    <span class="caption grey--text text--darken-1">
            When your delivery will arrive
          </span>
  </v-card-text>
</template>

<script>
  export default {
    name: 'DeliveryTime',
    data: () => ({
      select: '',
      days: [],
      times: [
        {title: '9:00 AM - 10:00 AM', value: '9:00 AM - 10:00 AM'},
        { title: '10:00 AM - 11:00 AM', value: '10:00 AM - 11:00 AM' },
        { title: '11:00 AM - 12:00 PM', value: '11:00 AM - 12:00 PM' },
        { title: '12:00 PM - 1:00 PM', value: '12:00 PM - 1:00 PM' },
        { title: '1:00 PM - 2:00 PM', value: '1:00 PM - 2:00 PM' },
        { title: '2:00 PM - 3:00 PM', value: '2:00 PM - 3:00 PM' },
        { title: '3:00 PM - 4:00 PM', value: '3:00 PM - 4:00 PM' },
        { title: '4:00 PM - 5:00 PM', value: '4:00 PM - 5:00 PM' },
        { title: '5:00 PM - 6:00 PM', value: '5:00 PM - 6:00 PM' },
        { title: '6:00 PM - 7:00 PM', value: '6:00 PM - 7:00 PM' },
        { title: '7:00 PM - 8:00 PM', value: '7:00 PM - 8:00 PM' },
        { title: '8:00 PM - 9:00 PM', value: '8:00 PM - 9:00 PM' },
        { title: '9:00 PM - 10:00 PM', value: '9:00 PM - 10:00 PM' },
        ]
    }),

    computed: {
      time: {
        get() {
          return this.$store.state.checkout.deliveryTime
        },
        set(val) {
          this.$store.commit('checkout/SET_DELIVERY_TIME', val)
        }
      },
      day: {
        get() {
          return this.$store.state.checkout.deliveryDay
        },
        set(val) {
          this.$store.commit('checkout/SET_DELIVERY_DAY', val)
        }
      }
    },

    mounted() {
      let curr = new Date;
      let days = []
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const weekDays = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      ]

      for (let i = 0; i < 7; i++) {
        let date = curr.getDate() + i
        let month = monthNames[curr.getMonth()]
        let day = new Date().setDate(date)
        let dayName = weekDays[new Date(day).getDay()]
        days.push(dayName + ' - ' + date + ' ' + month)
      }

      this.days = days
    }
  }
</script>
