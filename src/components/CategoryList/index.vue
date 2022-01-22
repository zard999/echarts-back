<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="category1Id"
          placeholder="请选择"
          @change="getCategory2List"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in category1List"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select
          v-model="category2Id"
          placeholder="请选择"
          @change="getCategory3List"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in category2List"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select
          v-model="category3Id"
          placeholder="请选择"
          @change="getCategory3"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in category3List"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      category1List: [],
      category2List: [],
      category3List: [],

      category1Id: '',
      category2Id: '',
      category3Id: ''
    }
  },
  mounted() {
    this.getCategory1List()
  },

  methods: {
    async getCategory1List() {
      const result = await this.$API.category.getCategory1()
      if (result.code === 200) {
        this.category1List = result.data
      }
    },

    async getCategory2List() {
      // 重置数据
      this.category2List = []
      this.category2Id = ''
      this.category3List = []
      this.category3Id = ''
      // 向父组件传id
      this.$emit('changeCategoryId', { categoryId: this.category1Id, level: 1 })
      const result = await this.$API.category.getCategory2(this.category1Id)
      if (result.code === 200) {
        this.category2List = result.data
      }
    },

    async getCategory3List() {
      // 重置数据
      this.category3List = []
      this.category3Id = ''
      // 向父组件传id
      this.$emit('changeCategoryId', { categoryId: this.category2Id, level: 2 })
      const result = await this.$API.category.getCategory3(this.category2Id)
      if (result.code === 200) {
        this.category3List = result.data
      }
    },

    getCategory3() {
      // 向父组件传id
      this.$emit('changeCategoryId', { categoryId: this.category3Id, level: 3 })
    }
  }
}
</script>

<style></style>
