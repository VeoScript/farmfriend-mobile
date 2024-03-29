export const links = [
  {
    'access': ['FARMERS', 'LGU_NGO'],
    'name': 'Check Weather',
    'icon': 'cloud-lightning',
    'route': 'CheckWeatherScreen'
  },
  {
    'access': ['FARMERS', 'LGU_NGO'],
    'name': 'Suggested Crops to Plant',
    'icon': 'compass',
    'route': 'SuggestedCropsToPlantScreen'
  },
  {
    'access': ['FARMERS', 'LGU_NGO'],
    'name': 'Province Suggested Crops',
    'icon': 'map-pin',
    'route': 'SuggestedCropsViaLocation'
  },
  {
    'access': ['FARMERS', 'LGU_NGO'],
    'name': 'Future Suggested Crops',
    'icon': 'activity',
    'route': 'SuggestedCropsFutureScreen'
  },
  {
    'access': ['LGU_NGO'],
    'name': 'Add Programs',
    'icon': 'plus',
    'route': 'AddProgramsScreen'
  },
  {
    'access': ['LGU_NGO', 'FARMERS'],
    'name': 'Search Programs',
    'icon': 'search',
    'route': 'SearchProgramsScreen'
  },
  {
    'access': ['ADMIN'],
    'name': 'Add Crops',
    'icon': 'plus',
    'route': 'AddCropsScreen'
  },
  {
    'access': ['ADMIN'],
    'name': 'Search Crops',
    'icon': 'heart',
    'route': 'SearchCropsScreen'
  },
  {
    'access': ['ADMIN'],
    'name': 'User Farmers',
    'icon': 'users',
    'route': 'UserFarmersScreen'
  },
  {
    'access': ['ADMIN'],
    'name': 'User LGU/NGO',
    'icon': 'users',
    'route': 'UserLguNgoScreen'
  },
]

export const settingsLinks = [
  {
    'access': ['FARMERS', 'LGU_NGO'],
    'name': 'Notifications',
    'icon': 'bell',
    'route': 'NotificationsScreen'
  },
  {
    'access': ['ADMIN', 'LGU_NGO', 'FARMERS'],
    'name': 'View Rates',
    'icon': 'star',
    'route': 'ViewRatesScreen'
  },
  {
    'access': ['ADMIN'],
    'name': 'View Reports',
    'icon': 'list-unordered',
    'route': 'ViewReportsScreen'
  },
  {
    'access': ['FARMERS', 'LGU_NGO'],
    'name': 'Rate App',
    'icon': 'star',
    'route': 'RateAppScreen'
  },
  {
    'access': ['FARMERS', 'LGU_NGO'],
    'name': 'Report Here',
    'icon': 'alert',
    'route': 'ReportHereScreen'
  },
  {
    'access': ['ADMIN', 'FARMERS', 'LGU_NGO'],
    'name': 'Edit Account',
    'icon': 'pencil',
    'route': 'EditAccountScreen'
  },
]