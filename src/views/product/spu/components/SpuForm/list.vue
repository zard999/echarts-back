<template>
  <div>
    <el-form :model="spuForm" ref="form" label-width="100px">
      <el-form-item label="SPU名称">
        <el-input v-model="spuForm.spuName" placeholder="SPU名称"></el-input
      ></el-form-item>

      <el-form-item label="品牌">
        <el-select v-model="spuForm.tmId" placeholder="请选择品牌">
          <el-option
            :label="trademark.tmName"
            :value="trademark.id"
            v-for="trademark in trademarkList"
            :key="trademark.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input
          v-model="spuForm.description"
          type="textarea"
          rows="4"
          placeholder="SPU描述"
        ></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlePictureSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          value=""
          :placeholder="
            UnSelectedSaleAttrList.length
              ? `还有${UnSelectedSaleAttrList.length}项未选择`
              : '没有啦！！'
          "
          v-model="UnSelectedSaleNameAndId"
        >
          <el-option
            :label="UnSelectedSaleAttr.name"
            :value="`${UnSelectedSaleAttr.id}:${UnSelectedSaleAttr.name}`"
            v-for="UnSelectedSaleAttr in UnSelectedSaleAttrList"
            :key="UnSelectedSaleAttr.id"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" @click="addSaleAttr"
          >添加销售属性</el-button
        >

        <el-table :data="spuForm.spuSaleAttrList" border style="width: 100%">
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="150">
          </el-table-column>
          <el-table-column label="属性值名称列表">
            <template slot-scope="{ row }">
              <el-tag
                style="margin-right:10px"
                closable
                v-for="spuSaleAttrValue in row.spuSaleAttrValueList"
                :key="spuSaleAttrValue.id"
                >{{ spuSaleAttrValue.saleAttrValueName }}</el-tag
              >
              <el-input
                v-if="row.inputVisible"
                style="width:100px;height:30px"
                size="mini"
                ref="inp"
                v-model="row.inputValue"
                @blur="handleBtn(row)"
                @keyup.enter.native="handleBtn(row)"
              ></el-input>
              <el-button v-else size="mini" @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="spuForm.spuSaleAttrList.splice($index, 1)"
              >
                <HintButton
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  title="删除销售属性"
                  slot="reference"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      // 照片墙
      dialogImageUrl: '',
      dialogVisible: false,
      // 初始化数据列表
      saleAttrList: [],
      trademarkList: [],
      spuImageList: [],

      // 收集数据
      category3Id: '',
      spuForm: {
        category3Id: '',
        description: '',
        spuName: '',
        tmId: '',

        spuImageList: [
          //   {
          //     imgName: 'string',
          //     imgUrl: 'string',
          //   }
        ],
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 0,
          //     saleAttrName: 'string',
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleAttrId: 0,
          //         isChecked: 'string',
          //         saleAttrValueName: 'string',
          //         spuId: 0
          //       }
          //     ]
          //   }
        ]
      },

      UnSelectedSaleNameAndId: ''
    }
  },
  methods: {
    //  移除
    handleRemove(file, fileList) {
      this.spuForm.spuImageList = fileList
    },
    // 上传成功
    handlePictureSuccess(response, file, fileList) {
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 初始化添加页面请求数据
    async getInitAddData(category3Id) {
      this.category3Id = category3Id
      console.log(category3Id)
      // 销售属性
      const promise1 = this.$API.spu.getSaleAttrList()
      // 品牌属性
      const promise2 = this.$API.trademark.getList()

      const promise = await Promise.all([promise1, promise2])
      this.saleAttrList = promise[0].data
      this.trademarkList = promise[1].data
    },

    // 初始化修改页面请求数据
    async getInitUpdateData(spu, category3Id) {
      this.category3Id = category3Id
      // 销售属性
      const promise1 = this.$API.spu.getSaleAttrList()
      // 品牌属性
      const promise2 = this.$API.trademark.getList()
      // 图片数据
      const promise3 = this.$API.sku.getSpuImageList(spu.id)
      // spu详情
      const promise4 = this.$API.spu.get(spu.id)

      // promise.all
      const promise = await Promise.all([
        promise1,
        promise2,
        promise3,
        promise4
      ])
      this.saleAttrList = promise[0].data
      this.trademarkList = promise[1].data

      let spuImageList = promise[2].data
      spuImageList.forEach(item => {
        item.name = item.imgName
        item.url = item.imgUrl
      })
      this.spuImageList = spuImageList

      this.spuForm = promise[3].data
    },

    // 添加销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.UnSelectedSaleNameAndId.split(
        ':'
      )
      let obj = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spuForm.spuSaleAttrList.push(obj)
      // 别忘记清除
      this.UnSelectedSaleNameAndId = ''
    },

    // 添加销售属性值
    addSaleAttrValue(row) {
      // 添加展示数据
      this.$set(row, 'inputVisible', true)
      // 因为之后要收集数据，所以提前加入一个收集数据的变量
      this.$set(row, 'inputValue', '')
      // 自动获取焦点
      this.$nextTick(() => {
        this.$refs.inp.focus()
      })
    },

    // 添加完成变成btn
    handleBtn(row) {
      // 1. 如果输入的值为空，则直接返回
      let inputValue = row.inputValue
      if (!inputValue) {
        return
      }
      // 2. 如果输入的值跟属性值属性的值相同，则重复
      let isRepeat = row.spuSaleAttrValueList.some(
        item => item.saleAttrValueName === inputValue
      )
      if (isRepeat) {
        row.inputValue = ''
        this.$message.error('输入的值重复，请重新输入！！')
        return
      }
      let obj = {
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: row.inputValue
      }
      row.spuSaleAttrValueList.push(obj)
      row.inputValue = ''
      row.inputVisible = false
    },

    // 保存
    async save() {
      // 1. 收集数据
      let { spuForm, spuImageList, category3Id } = this
      // 2. 处理数据
      spuForm.category3Id = category3Id
      spuForm.spuImageList = spuImageList.map(item => {
        return {
          imgName: item.name,
          imgUrl: item.imgUrl || item.response.data
        }
      })
      spuForm.spuSaleAttrList.forEach(item => {
        delete item.inputValue
        delete item.inputVisible
      })
      // 3. 发请求
      try {
        const result = await this.$API.spu.addUpdate(spuForm)
        if (result.code === 200) {
          this.$message.success('保存成功')
          //  跳回spu页面
          this.$emit('success')
          // 清除数据
          this.removeData()
        } else {
          this.$message.error('请求保存失败')
        }
      } catch (error) {
        this.$message.error('获取请求保存失败')
      }
    },

    removeData() {
      Object.assign(this._data, this.$options.data())
    },

    cancel() {
      this.$emit('update:visible', 1)
      this.removeData()
    }
  },

  computed: {
    UnSelectedSaleAttrList() {
      return this.saleAttrList.filter(saleAttr => {
        return this.spuForm.spuSaleAttrList.every(item => {
          return item.saleAttrName !== saleAttr.name
        })
      })
    }
  }
}
</script>

<style></style>
