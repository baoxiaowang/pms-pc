<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title> 需求人天分析 </template>
      <template #extra>
        <a-link>{{ $t('workplace.viewMore') }}</a-link>
      </template>
      <Chart style="width: 100%; height: 347px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ToolTipFormatterParams } from '@/types/echarts';
  import useLoading from '@/hooks/loading';
  import {
    queryContentPublish,
    ContentPublishRecord,
  } from '@/api/visualization';
  import useChartOption from '@/hooks/chart-option';
  import { EChartsOption } from 'echarts';

  defineProps<{
    taskInfoList: any[];
  }>();

  const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
    return items
      .map(
        (el) => `<div class="content-panel">
    <p>
      <span style="background-color: ${
        el.color
      }" class="tooltip-item-icon"></span>
      <span>
      ${el.seriesName}
      </span>
    </p>
    <span class="tooltip-value">
      ${Number(el.value).toLocaleString()}
    </span>
  </div>`
      )
      .join('');
  };

  const { loading, setLoading } = useLoading(true);
  const xAxis = ref<string[]>([]);
  const textChartsData = ref<number[]>([]);
  const imgChartsData = ref<number[]>([]);
  const videoChartsData = ref<number[]>([]);
  const { chartOption } = useChartOption((isDark) => {
    return {
      title: {
        text: 'Accumulated Waterfall Chart',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter(params: any[]) {
          let tar: any;
          if (params[1] && params[1].value !== '-') {
            // eslint-disable-next-line prefer-destructuring
            tar = params[1];
          } else {
            // eslint-disable-next-line prefer-destructuring
            tar = params[2];
          }
          return tar && `${tar.name}<br/>${tar.seriesName} : ${tar.value}`;
        },
      },
      legend: {
        data: ['Expenses', 'Income', '潘子彦'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: {
        type: 'category',
        data: ['鲍小旺', '肖帅', '潘子彦'],
        axisTick: {
          alignWithLabel: true,
        },
      },
      xAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          silent: true,
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent',
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent',
            },
          },
          barWidth: 40,
          data: [100, 900, 1245],
        },
        {
          name: '肖帅',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'top',
          },
          data: [100],
        },
        {
          name: '鲍小旺',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'bottom',
          },
          data: ['-', 400],
        },
        {
          name: '潘子彦',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'bottom',
          },
          data: ['-', '-', 400],
        },
      ],
    } as EChartsOption;
  });
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: chartData } = await queryContentPublish();
      xAxis.value = chartData[0].x;
      chartData.forEach((el: ContentPublishRecord) => {
        if (el.name === '纯文本') {
          textChartsData.value = el.y;
        } else if (el.name === '图文类') {
          imgChartsData.value = el.y;
        }
        videoChartsData.value = el.y;
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<style scoped lang="less"></style>
