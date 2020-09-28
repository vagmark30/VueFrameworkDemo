<template>
  <div class="bookings" >
    <DxChart ref="chart" title="Bookings">
      <DxTooltip
        :enabled="true"
        :customize-tooltip="customizeTooltip"
      />
      <DxAdaptiveLayout :width="450"/>
      <DxSize :height="200"/>
      <DxCommonSeriesSettings type="bar"/>
    </DxChart>

    <DxPivotGrid
      id="pivotgrid"
      ref="grid"
      :data-source="dataSource"
      :allow-sorting-by-summary="true"
      :allow-filtering="true"
      :show-borders="true"
      :show-column-grand-totals="false"
      :show-row-grand-totals="false"
      :show-row-totals="false"
      :show-column-totals="false"
    >
      <DxFieldChooser
        :enabled="true"
        :height="400"
      />
    </DxPivotGrid>
    <br/>
          <v-data-table
          :headers="headers"
          :items="bookingsRestData"
          :items-per-page="15"
          class="elevation-1"
      >
    </v-data-table>
  </div>
</template>
<script>
const baseURI = 'http://127.0.0.1:10640/Bookings/'
//import gia fetch online data
// grammh 48 uncomment
// grammh 103-107 uncomment
// grammh 108 comment
// grammh 51 comment

// import { createStore } from 'devextreme-aspnet-data-nojquery';

//fetch offline data
import { bookingsData } from './data.js';

//link gia pivotgrid
//https://js.devexpress.com/Demos/WidgetsGallery/Demo/PivotGrid/Overview/Vue/GreenMist/
//data from web api 
//https://js.devexpress.com/Demos/WidgetsGallery/Demo/PivotGrid/WebAPIService/Vue/GreenMist/
import {
  DxChart,
  DxAdaptiveLayout,
  DxCommonSeriesSettings,
  DxSize,
  DxTooltip,
} from 'devextreme-vue/chart';

import {
  DxPivotGrid,
  DxFieldChooser
} from 'devextreme-vue/pivot-grid';


const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

export default {
  name: 'Bookings',
  components: {
    DxChart,
    DxAdaptiveLayout,
    DxCommonSeriesSettings,
    DxSize,
    DxTooltip,
    DxPivotGrid,
    DxFieldChooser
  },
  data() {
    return {
      bookingsRestData:[],
      headers: [
      {
          text: 'BookId',
          align: 'start',
          sortable: false,
          value: 'bookId',
      },
      { text: 'PickDate', value: 'pickDate' },
      { text: 'Model', value: 'carId.model' },
      { text: 'Amount', value: 'amount'}
      ],
      dataSource: {
        // remoteOperations: true,
        //   store: createStore({
        //   key: 'BookId',
        //   loadUrl: 'http://127.0.0.1:10640/Bookings/only/'
        // }),
        store:bookingsData,
        fields: [{
          caption: 'Model',
          width: 120,
          dataField: 'carId.model',
          area: 'row'
        },{
          dataField: 'pickDate',
          dataType: 'date',
          width: 120,
          area: 'column'
        }, {
          groupName: 'pickDate',
          groupInterval: 'month',
          visible: true
        }, {
          caption: 'Total',
          dataField: 'amount',
          dataType: 'number',
          summaryType: 'sum',
          format: 'currency',
          area: 'data'
        }]
      },
      customizeTooltip: function(args) {
        const valueText = currencyFormatter.format(args.originalValue);
        return {
          html: `${args.seriesName} | Total<div class='currency'>${valueText}</div>`
        };
      }
    };
  },
  created:function(){
    this.fetchBookings();
  },
  mounted() {
    const pivotGrid = this.$refs.grid.instance;
    const chart = this.$refs.chart.instance;
    pivotGrid.bindChart(chart, {
      dataFieldsDisplayMode: 'splitPanes',
      alternateDataFields: false
    });
    const dataSource = pivotGrid.getDataSource();
    setTimeout(function() {
      dataSource.expandHeaderItem('row', ['pickDate']);
      dataSource.expandHeaderItem('column', ['carId.model']);
    }, 0);
  },
    methods: {
    fetchBookings: function () {
      this.$http.get(baseURI)
      .then((result) => {
        this.bookingsRestData = result.data.result
      })
    },
  }
};
</script>

<style>
#pivotgrid {
    margin-top: 20px;
}
.currency {
    text-align: center;
}
</style>