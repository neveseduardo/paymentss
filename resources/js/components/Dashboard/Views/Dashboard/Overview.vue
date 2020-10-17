<template>

</template>
<script>
import Loading from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'
import TaskList from './Widgets/TaskList'

export default {
  components: {
    TaskList,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data () {
    return {
      statsCards: [
        {
          type: 'warning',
          icon: 'nc-icon nc-globe',
          title: 'Capacity',
          value: '105GB',
          footerText: 'Updated now',
          footerIcon: 'nc-icon nc-refresh-69'
        },
        {
          type: 'success',
          icon: 'nc-icon nc-money-coins',
          title: 'Revenue',
          value: '$1,345',
          footerText: 'Last day',
          footerIcon: 'nc-icon nc-calendar-60'
        },
        {
          type: 'danger',
          icon: 'nc-icon nc-vector',
          title: 'Errors',
          value: '23',
          footerText: 'In the last hour',
          footerIcon: 'nc-icon nc-bell-55'
        },
        {
          type: 'info',
          icon: 'nc-icon nc-favourite-28',
          title: 'Followers',
          value: '+45',
          footerText: 'Updated now',
          footerIcon: 'nc-icon nc-refresh-69'
        }
      ],
      activeUsersChart: {
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          series: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610]
        }
      },
      emailsCampaignChart: {
        data: {
          labels: ["12pm", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
          series: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
        }
      },
      activeCountriesChart: {
        data: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
          series: [80, 78, 86, 96, 83, 85, 76, 75, 88, 90]
        }
      },
      activityChart: {
        data: {
          labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
          datasets: [
            {
              label: "Data",
              borderColor: '#fcc468',
              fill: true,
              backgroundColor: '#fcc468',
              hoverBorderColor: '#fcc468',
              borderWidth: 8,
              data: [100, 120, 80, 100, 90, 130, 110, 100, 80, 110, 130, 140, 130, 120, 130, 80, 100, 90, 120, 130],
            },
            {
              label: "Data",
              borderColor: '#4cbdd7',
              fill: true,
              backgroundColor: '#4cbdd7',
              hoverBorderColor: '#4cbdd7',
              borderWidth: 8,
              data: [80, 140, 50, 120, 50, 150, 60, 130, 50, 130, 150, 100, 110, 80, 140, 50, 140, 50, 110, 150],
            }
          ]
        }
      }

    }
  }
}

</script>
<style>

</style>
