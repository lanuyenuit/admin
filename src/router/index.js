import Vue from 'vue'
import Router from 'vue-router'
// News Management
import Notice from 'components/my_components/news_management/Notice.vue'
import Update from 'components/my_components/news_management/Update.vue'
import Event from 'components/my_components/news_management/Event.vue'

// Community Management
import FreeBoard from 'components/my_components/community_management/FreeBoard.vue'
import InformationBoard from 'components/my_components/community_management/InformationBoard.vue'
import ImageBoard from 'components/my_components/community_management/ImageBoard.vue'

import QaManagement from 'components/my_components/QaManagement.vue'
import FaqManagement from 'components/my_components/FaqManagement.vue'
import UserManagement from 'components/my_components/UserManagement.vue'

// UI Element Groups
import Icons from 'pages/ui-elements/Icons.vue'
import Buttons from 'pages/ui-elements/Buttons.vue'
import Sliders from 'pages/ui-elements/Sliders.vue'
import Timeline from 'pages/ui-elements/Timeline.vue'
import Modals from 'pages/ui-elements/Modals.vue'

// forms
import GeneralElements from 'pages/forms/GeneralElements.vue'
import AdvancedElements from 'pages/forms/AdvancedElements.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/update',
      name: 'Update',
      component: Update
    },
    {
      path: '/event',
      name: 'Event',
      component: Event
    },
    {
      path: '/free/board',
      name: 'FreeBoard',
      component: FreeBoard
    },
    {
      path: '/information/board',
      name: 'InformationBoard',
      component: InformationBoard
    },
    {
      path: '/umage/board',
      name: 'ImageBoard',
      component: ImageBoard
    },

    {
      path: '/qa/management',
      name: 'QaManagement',
      component: QaManagement
    },
    {
      path: '/faq/management',
      name: 'FaqManagement',
      component: FaqManagement
    },
    {
      path: '/user/management',
      name: 'UserManagement',
      component: UserManagement
    },
    {
      path: '/ui-elements/icons',
      name: 'Icons',
      component: Icons
    },
    {
      path: '/ui-elements/buttons',
      name: 'Buttons',
      component: Buttons
    },
    {
      path: '/ui-elements/sliders',
      name: 'Sliders',
      component: Sliders
    },
    {
      path: '/ui-elements/timeline',
      name: 'Timeline',
      component: Timeline
    },
    {
      path: '/ui-elements/modals',
      name: 'Modals',
      component: Modals
    },
    {
      path: '/forms/general-elements',
      name: 'GeneralElements',
      component: GeneralElements
    },
    {
      path: '/forms/advanced-elements',
      name: 'AdvancedElements',
      component: AdvancedElements
    }
  ],
  linkActiveClass: 'active'
})
