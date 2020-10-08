module.exports = [
  {
    type: 'item',
    isHeader: true,
    name: 'MAIN NAVIGATION'
  },
  {
    type: 'tree',
    icon: 'fa fa-newspaper-o',
    name: 'News Management',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Notice',
        router: {
          name: 'Notice'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Update',
        router: {
          name: 'Update'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Event',
        router: {
          name: 'Event'
        }
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-users',
    name: 'Community Management',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Free board',
        router: {
          name: 'FreeBoard'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Information board',
        router: {
          name: 'InformationBoard'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: 'Image board',
        router: {
          name: 'ImageBoard'
        }
      }
    ]
  },

  {
    type: 'item',
    icon: 'fa fa-question-circle',
    name: 'Q&A Management',
    badge: {
      type: 'String',
      data: '5'
    },
    router: {
      name: 'QaManagement'
    }
  },

  {
    type: 'item',
    icon: 'fa fa-comments',
    name: 'FAQ Management',
    router: {
      name: 'FaqManagement'
    }
  },

  {
    type: 'item',
    icon: 'fa fa-user',
    name: 'User Management',
    router: {
      name: 'UserManagement'
    }
  }
]
