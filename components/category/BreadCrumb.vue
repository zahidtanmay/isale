<template>
  <v-row>
    <v-breadcrumbs :items="bread">

      <template v-slot:item="{item}">
        <v-breadcrumbs-item
          @click="routeLink(item.val, item.href)"
          :class="item.disabled ? 'bread-crumb-link-disabled' : 'bread-crumb-link-active'"
        >
          {{item.text}}
        </v-breadcrumbs-item>
      </template>
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </v-row>

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'CategoryBreadCrumb',

    computed: {
      ...mapGetters({
        currentNav: 'nav/getCurrentNav',
        navLinks: 'nav/getNavLinks',
        categories: 'bootstrap/getCategories'
      }),

    },

    data: () => ({
      bread: []
    }),

    methods: {

      routeLink (val, link) {
        console.log('brd link', link)

        const currentNav = val

        this.$router.push(`/${link}`)

        this.$store.commit('nav/setCurrentNav', currentNav)

      },

      async setBread () {
        const {categoryId, subCategoryId, childId} = this.currentNav
        const categories = this.categories
        const cat = await categories.findIndex(category => parseInt(category.id) === categoryId)
        const scat = cat >= 0 ? await categories[cat]['subCategories'].findIndex(category => parseInt(category.id) === subCategoryId) : -1
        let parent = Object.assign({}, categories[cat])
        let bread = []
        console.log(subCategoryId, scat)
        if (subCategoryId !=null && childId != null) {
          bread = [
            {
              text: categories[cat]['name'],
              href: categories[cat]['slug'],
              disabled: false,
              val: { categoryId: categoryId, subCategoryId: null, childId: null }
            },
            {
              text: categories[cat]['child'][scat]['name'],
              href: categories[cat]['child'][scat]['slug'],
              disabled: false,
              val: { categoryId: categoryId, subCategoryId: subCategoryId, childId: null }
            },
            {
              text: categories[cat]['child'][scat]['child'][chi]['name'],
              href: categories[cat]['child'][scat]['child'][chi]['slug'],
              disabled: true,
              val: { categoryId: categoryId, subCategoryId: subCategoryId, childId: childId }
            }

          ]
        } else if (subCategoryId != null && scat >= 0) {
          bread = [
            {
              text: categories[cat]['name'],
              href: categories[cat]['slug'],
              disabled: false,
              val: { categoryId: categoryId, subCategoryId: null, childId: null }
            },
            {
              text: categories[cat]['subCategories'][scat]['name'],
              href: categories[cat]['subCategories'][scat]['slug'],
              disabled: true,
              val: { categoryId: categoryId, subCategoryId: subCategoryId, childId: null }
            }
          ]
        } else {
          bread = [
            {
              text: parent.name,
              href: parent.name,
              disabled: true,
              val: { categoryId: categoryId, subCategoryId: null, childId: null }
            }
          ]
        }

        this.bread = bread
      },

    },

    async mounted() {
      this.setBread()
    },

    watch: {
      currentNav (val) {
        console.log('current nav watching', val)
      }
    }

  }
</script>

<style lang="scss">
  .bread-crumb-link-disabled { color: rgba(0, 0, 0, 0.38); }
  .bread-crumb-link-active { color: $nav-active-color; cursor: pointer;}
</style>
