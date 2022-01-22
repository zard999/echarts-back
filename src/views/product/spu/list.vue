<template>
  <div>
    <el-card>
      <CategoryList @changeCategoryId="changeCategoryId" />
    </el-card>
    <el-card style="margin-top:20px">
      <div v-show="isShowFlag === 1">
        <el-button type="primary" icon="el-icon-plus" @click="addSpuForm"
          >添加SPU</el-button
        >

        <el-table :data="pageList" style="width: 100%;margin:20px 0" border>
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <HintButton
                type="success"
                icon="el-icon-plus"
                title="添加SKU"
                size="mini"
              ></HintButton>
              <HintButton
                @click="updateSpuForm(row)"
                type="warning"
                icon="el-icon-edit"
                title="修改SPU"
                size="mini"
              ></HintButton>
              <HintButton
                type="info"
                icon="el-icon-info"
                title="查看SPU的SKU列表"
                size="mini"
              ></HintButton>
              <HintButton
                type="danger"
                icon="el-icon-delete"
                title="删除SPU"
                size="mini"
              ></HintButton>
            </template>
          </el-table-column>
        </el-table>

        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="getPageList"
          :current-page="page"
          :page-sizes="[2, 4, 6]"
          :page-size="size"
          layout="prev, pager, next, jumper, ->, sizes,total"
          style="text-align:center"
          :total="total"
        >
        </el-pagination>
      </div>

      <SpuForm
        v-show="isShowFlag === 2"
        :visible.sync="isShowFlag"
        @success="success"
        ref="spuForm"
      >
      </SpuForm>

      <SkuForm v-show="isShowFlag === 3" ref="skuForm"> </SkuForm>
    </el-card>
  </div>
</template>

<script>
import SkuForm from './components/SkuForm/list.vue'
import SpuForm from './components/SpuForm/list.vue'
export default {
  name: 'Spu',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',

      // 分页
      page: 1,
      size: 2,
      total: 5,
      pageList: [],

      isShowFlag: 1
    }
  },

  methods: {
    // 获取category子组件id
    changeCategoryId({ categoryId, level }) {
      if (level === 1) {
        // 重置数据
        this.category2Id = ''
        this.category3Id = ''
        this.pageList = []

        this.category1Id = categoryId
      } else if (level === 2) {
        // 重置数据
        this.category3Id = ''
        this.pageList = []

        this.category2Id = categoryId
      } else {
        this.category3Id = categoryId
        this.getPageList()
      }
    },

    // 获取分页数据
    async getPageList(pageNum = 1) {
      this.page = pageNum
      const { page, size, category3Id } = this
      const result = await this.$API.spu.getPageList(page, size, category3Id)
      if (result.code === 200) {
        this.pageList = result.data.records
        this.total = result.data.total
      }
    },

    // 改变size
    handleSizeChange(size) {
      this.size = size
      this.getPageList()
    },

    // 添加SpuForm
    addSpuForm() {
      this.$refs.spuForm.getInitAddData(this.category3Id)
      this.isShowFlag = 2
    },

    // 去修改SpuForm
    updateSpuForm(spu) {
      this.$refs.spuForm.getInitUpdateData(spu, this.category3Id)
      this.isShowFlag = 2
    },

    // 保存成功
    success() {
      this.isShowFlag = 1
      this.getPageList()
    }
  },

  components: {
    SpuForm,
    SkuForm
  }
}
</script>

<style></style>
