<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    class="main-nav"
    width="250px"
    flat
  >

    <no-ssr>
      <v-list
        dense
        link
        v-for="(category, cat) in customCategories"
        :key="`spc-${category.name}`"
        class="main-side-nav-list"
        nav
      >
        <v-list-item
          link
          :to="category.slug"
          :key="category.name"
          class="mb-1"

        >
          <v-list-item-title>{{category.name}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </no-ssr>


    <v-divider class="my-3"></v-divider>

    <no-ssr>
      <v-list
        dense
        link
        v-for="(category, cat) in categories"
        :key="category.name"
        class="main-side-nav-list"
        nav
      >
        <template v-if="category.subCategories && category.subCategories.length > 0">

          <v-list-group
            group
            dense
            :key="category.name"
            :value="parseInt(category.id) === parseInt(currentNav.categoryId)"
            :ref="`cat-${cat}`"
            :to="category.slug"
            @click="$router.push(`/${category.slug}`)"
          >
            <!--@click.prevent="routeLink(cat, null, null, category.slug)"-->

            <template slot="activator">
              <v-list-item-icon class="main-nav-left-icon">
                <v-icon>{{ `mdi-${category.icon}` }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{category.name}}</v-list-item-title>
              </v-list-item-content>

            </template>

            <template v-for="(subCategory, scat) in category.subCategories">

              <template v-if="subCategory.child && subCategory.child.length > 0">

                <v-list-item
                  @click="routeLink(cat, scat)"
                  :to="linkChild.link"
                  link
                  :class="['sub-group-list', scat === currentNav.scat ? 'sub-group-active' : '']"
                >
                  <transition transition="scale-transition">
                    <v-list-item-icon v-if="scat === currentNav.scat"><v-icon color="nav-active-color" class="nav-active-icon">mdi-chevron-up</v-icon></v-list-item-icon>
                    <v-list-item-icon v-else><v-icon color="grey lighten-1">mdi-chevron-down</v-icon></v-list-item-icon>
                  </transition>

                  <v-list-item-title class="sub-group-title">{{linkChild.text}}</v-list-item-title>
                </v-list-item>


                <transition-group transition="expand-transition" class="py-0" group>
                  <template v-if="scat === currentNav.scat">
                    <v-list-item
                      v-for="(child, chi) in linkChild.child"
                      :key="child.text"
                      link
                      :to="child.link"
                    >
                      <v-list-item-title @click="routeLink(cat, scat, chi)" v-text="child.text" class="sub-group-child"></v-list-item-title>
                    </v-list-item>
                  </template>
                </transition-group>



              </template>

              <template v-else>

                <v-list-item
                  :key="subCategory.name"
                  link
                  :to="subCategory.slug"
                  class="single-sub-group"
                >
                  <v-list-item-icon class="main-nav-left-icon">
                    <v-icon>{{ `mdi-${subCategory.icon}` }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="subCategory.name">
                      <!--@click="routeLink(cat, scat)"-->
                    </v-list-item-title>
                  </v-list-item-content>

                </v-list-item>
              </template>

            </template>


          </v-list-group>

        </template>

        <template v-else>
          <v-list-item link :to="category.name" :key="category.name">
            <!--@click="routeLink(cat)"-->
            <v-list-item-icon class="main-nav-left-icon">
              <v-icon>{{ `mdi-${category.icon}` }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{category.name}}</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </template>

      </v-list>

    </no-ssr>




  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'NavDrawer',

    data: () => ({

    }),

    computed: {
      ...mapGetters({
        navLinks: 'nav/getNavLinks',
        currentNav: 'nav/getCurrentNav',
        categories: 'bootstrap/getCategories',
        customCategories: 'bootstrap/getCustomCategories'
      }),

      drawer: {
        get() {
          return this.$store.state.component.navDrawer
        },
        set(val) {
          this.$store.commit('component/setNavDrawer', val)
        }
      }
    },

    methods: {
      routeLink (cat = null, scat = null, chi = null, type='') {

        const currentNav = {cat: cat, scat: scat, chi: chi}
        if (type) {
          this.$router.push(`/${type}`)
        }

        this.$store.commit('nav/setCurrentNav', currentNav)

      }
    },

    // mounted() {
      // this.navList = this._.cloneDeep(this.navLinks)
    // },

    mounted(){
      console.log('landing nav')
    },

  }

</script>

<style lang="scss">

  .main-nav .v-navigation-drawer__content { margin-top: 8px !important; }

  .main-side-nav-list { padding: 0 !important; }

  .main-side-nav-list .v-list-item__title { font-weight: 200 !important; font-size: .8rem !important; }

  .main-nav .v-list-item--active { font-weight: 700 !important; color: $nav-active-color; }

  .v-list-item--active .v-list-item__title{ font-weight: 400 !important; }

  .sub-group-active .sub-group-title { font-weight: 700 !important; color: $nav-active-color; }

  .sub-group-child { padding-left: 30px !important; }

  .single-sub-group { padding-left: 30px !important; }

  .nav-active-icon { color: $nav-active-color !important; }

  .main-nav-left-icon { margin-right: 6px !important; height: 16px !important;}

  .v-list--dense .v-list-item { min-height: 30px !important; }

</style>
