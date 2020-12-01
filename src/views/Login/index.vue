<template>
  <div>
    Login~~~
    <br><br>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <br><br>
    <el-row>
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary"
                 plain>主要按钮</el-button>
      <el-button type="success"
                 plain>成功按钮</el-button>
      <el-button type="info"
                 plain>信息按钮</el-button>
      <el-button type="warning"
                 plain>警告按钮</el-button>
      <el-button type="danger"
                 plain>危险按钮</el-button>
    </el-row>
    <br><br>
    <el-row>
      <el-button round>圆角按钮</el-button>
      <el-button type="primary"
                 round>主要按钮</el-button>
      <el-button type="success"
                 round>成功按钮</el-button>
      <el-button type="info"
                 round>信息按钮</el-button>
      <el-button type="warning"
                 round>警告按钮</el-button>
      <el-button type="danger"
                 round>危险按钮</el-button>
    </el-row>
    <br><br>
    <el-row>
      <el-button icon="el-icon-search"
                 circle></el-button>
      <el-button type="primary"
                 icon="el-icon-edit"
                 circle></el-button>
      <el-button type="success"
                 icon="el-icon-check"
                 circle></el-button>
      <el-button type="info"
                 icon="el-icon-message"
                 circle></el-button>
      <el-button type="warning"
                 icon="el-icon-star-off"
                 circle></el-button>
      <el-button type="danger"
                 icon="el-icon-delete"
                 circle></el-button>
    </el-row>
    <br><br>
    <el-radio-group v-model="radio1">
      <el-radio-button label="上海"></el-radio-button>
      <el-radio-button label="北京"></el-radio-button>
      <el-radio-button label="广州"></el-radio-button>
      <el-radio-button label="深圳"></el-radio-button>
    </el-radio-group>
    <br><br>
    <div class="radio">
      排序：
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>
    <br>
    <el-timeline :reverse="reverse">
      <el-timeline-item v-for="(activity, index) in activities"
                        :key="index"
                        :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio1: '上海',
      radio2: '上海',
      radio3: '上海',
      radio4: '上海',
      reverse: true,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    };
  }
}
</script>
<style lang="scss">
</style>