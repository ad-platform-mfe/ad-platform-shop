<template>
  <t-card :bordered="false">
    <div class="action-bar">
      <t-button @click="handleCreate">新建商品</t-button>
      <div class="filter-group">
        <t-input
          v-model="searchKeyword"
          placeholder="请输入商品名称"
          class="search-input"
          @enter="fetchData"
        >
          <template #suffix-icon>
            <t-icon-search @click="fetchData" />
          </template>
        </t-input>
        <t-button @click="fetchData">查询</t-button>
      </div>
    </div>

    <t-table
      row-key="id"
      :data="tableData"
      :columns="columns"
      :loading="isLoading"
      :pagination="pagination"
      @page-change="onPageChange"
      stripe
      hover
    >
      <template #cover="{ row }">
        <t-image :src="row.cover" fit="cover" class="product-cover" />
      </template>
      <template #status="{ row }">
        <t-tag
          :theme="row.status === 'published' ? 'success' : 'warning'"
          variant="light"
        >
          {{ row.status === 'published' ? '已上架' : '未上架' }}
        </t-tag>
      </template>
      <template #op="{ row }">
        <t-space>
          <t-button theme="primary" variant="text" @click="handleEdit(row)"
            >编辑</t-button
          >
          <t-popconfirm content="确认删除吗" @confirm="handleDelete(row)">
            <t-button theme="danger" variant="text">删除</t-button>
          </t-popconfirm>
        </t-space>
      </template>
    </t-table>

    <t-dialog
      v-model:visible="isDialogVisible"
      :header="dialogTitle"
      width="600px"
      :on-confirm="onDialogConfirm"
    >
      <t-form ref="form" :data="formData" :rules="rules" label-align="top">
        <t-form-item label="商品名称" name="name">
          <t-input
            v-model="formData.name"
            placeholder="请输入商品名称"
          ></t-input>
        </t-form-item>
        <t-form-item label="商品描述" name="description">
          <t-textarea
            v-model="formData.description"
            placeholder="请输入商品描述"
          ></t-textarea>
        </t-form-item>
        <t-form-item label="价格" name="price">
          <t-input-number
            v-model="formData.price"
            :min="0"
            :step="10"
            placeholder="请输入价格"
          ></t-input-number>
        </t-form-item>
        <t-form-item label="状态" name="status">
          <t-radio-group v-model="formData.status">
            <t-radio value="published">上架</t-radio>
            <t-radio value="draft">下架</t-radio>
          </t-radio-group>
        </t-form-item>
        <t-form-item label="店铺" name="store_id">
          <t-select v-model="formData.store_id" placeholder="请选择店铺">
            <t-option
              v-for="store in storeList"
              :key="store.id"
              :value="store.id"
              :label="store.name"
            ></t-option>
          </t-select>
        </t-form-item>
        <t-form-item label="商品总数" name="totalCount">
          <t-input-number
            v-model="formData.totalCount"
            :min="0"
            :step="1"
            placeholder="请输入商品总数"
          ></t-input-number>
        </t-form-item>
        <t-form-item label="可销售数量" name="availableCount">
          <t-input-number
            v-model="formData.availableCount"
            :min="0"
            :step="1"
            placeholder="请输入可销售数量"
          ></t-input-number>
        </t-form-item>
      </t-form>
    </t-dialog>
  </t-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  Card as TCard,
  Button as TButton,
  Input as TInput,
  Table as TTable,
  Image as TImage,
  Tag as TTag,
  Space as TSpace,
  Popconfirm as TPopconfirm,
  Dialog as TDialog,
  Form as TForm,
  FormItem as TFormItem,
  Textarea as TTextarea,
  InputNumber as TInputNumber,
  RadioGroup as TRadioGroup,
  Radio as TRadio,
  Select as TSelect,
  Option as TOption,
  MessagePlugin,
  type PageInfo,
  type TableProps,
  type FormInstanceFunctions,
  type FormRules
} from 'tdesign-vue-next'
import { SearchIcon as TIconSearch } from 'tdesign-icons-vue-next'
import type { Product } from './types'
// 导入API函数
import { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  searchProducts 
} from '@/api/product'
// 导入商铺API
import { getAllStores } from '@/api/store'

const tableData = ref<Product[]>([])
const isLoading = ref(false)
const searchKeyword = ref('')
const storeList = ref<{id: string, name: string}[]>([])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

const isDialogVisible = ref(false)
const dialogMode = ref<'create' | 'edit'>('create')
const formData = ref<Partial<Product>>({})
const form = ref<FormInstanceFunctions | null>(null)

const dialogTitle = computed(() =>
  dialogMode.value === 'create' ? '新建商品' : '编辑商品'
)

const rules: Record<string, any> = {
  name: [{ required: true, message: '商品名称必填', type: 'error' }],
  price: [{ required: true, message: '价格必填', type: 'error' }],
  status: [{ required: true, message: '状态必选', type: 'error' }],
  store_id: [{ required: true, message: '请选择店铺', type: 'error' }],
  totalCount: [{ required: true, message: '商品总数必填', type: 'error' }],
  availableCount: [{ required: true, message: '可销售数量必填', type: 'error' }]
}

const columns: TableProps['columns'] = [
  { colKey: 'name', title: '商品名称', ellipsis: true },
  { colKey: 'cover', title: '封面', width: 120 },
  { 
    colKey: 'store', 
    title: '店铺', 
    width: 120,
    cell: (h, { row }) => {
      // 根据store_id查找对应的商铺名称
      const store = storeList.value.find(store => store.id === row.store_id)
      return store ? store.name : row.store || '未知商铺'
    }
  },
  {
    colKey: 'price',
    title: '价格',
    width: 100,
    sorter: (a, b) => a.price - b.price
  },
  {
    colKey: 'total_count',
    title: '商品总数',
    width: 100,
    sorter: (a, b) => a.total_count - b.total_count
  },
  {
    colKey: 'available_count',
    title: '可销售数量',
    width: 120,
    sorter: (a, b) => a.available_count - b.available_count
  },
  { colKey: 'status', title: '状态', width: 100 },
  {
    colKey: 'created_at',
    title: '创建时间',
    width: 180,
    sorter: (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  },
  { colKey: 'op', title: '操作', width: 150 }
]

const fetchData = async () => {
  isLoading.value = true
  try {
    // 调用API获取商品数据
    let response
    if (searchKeyword.value) {
      // 如果有搜索关键词，调用搜索API
      response = await searchProducts({ name: searchKeyword.value })
    } else {
      // 否则获取所有商品
      response = await getAllProducts()
    }
    
    if (response.code === 0) {
      const products = response.data
      pagination.value.total = products.length
      
      // 客户端分页处理
      const startIndex = (pagination.value.current - 1) * pagination.value.pageSize
      const endIndex = startIndex + pagination.value.pageSize
      tableData.value = products.slice(startIndex, endIndex)
    } else {
      MessagePlugin.error(response.msg || '获取商品数据失败')
    }
  } catch (error) {
    console.error('获取商品数据错误:', error)
    MessagePlugin.error('数据加载失败')
  } finally {
    isLoading.value = false
  }
}

const onPageChange = (pageInfo: PageInfo) => {
  pagination.value.current = pageInfo.current
  pagination.value.pageSize = pageInfo.pageSize
  fetchData()
}

const handleCreate = () => {
  dialogMode.value = 'create'
  formData.value = { 
    status: 'draft', 
    price: 0, 
    totalCount: 0, 
    availableCount: 0,
    store_id: storeList.value.length > 0 ? storeList.value[0].id : ''
  }
  isDialogVisible.value = true
}

const handleEdit = async (row: Product) => {
  dialogMode.value = 'edit'
  isLoading.value = true
  try {
    // 获取最新的商品详情
    const response = await getProductById(row.id)
    if (response.code === 0) {
      formData.value = response.data
    } else {
      MessagePlugin.error(response.msg || '获取商品详情失败')
      return
    }
  } catch (error) {
    console.error('获取商品详情错误:', error)
    MessagePlugin.error('获取商品详情失败')
    return
  } finally {
    isLoading.value = false
  }
  isDialogVisible.value = true
}

const handleDelete = async (row: Product) => {
  isLoading.value = true
  try {
    // 调用删除API
    const response = await deleteProduct(row.id)
    if (response.code === 0) {
      MessagePlugin.success('删除成功')
      fetchData() // 重新加载数据
    } else {
      MessagePlugin.error(response.msg || '删除失败')
    }
  } catch (error) {
    console.error('删除商品错误:', error)
    MessagePlugin.error('删除失败')
  } finally {
    isLoading.value = false
  }
}

const onDialogConfirm = async () => {
  const result = await form.value?.validate()
  if (result === true) {
    isLoading.value = true
    try {
      // 准备提交的数据
      const productData = {
        name: formData.value.name,
        description: formData.value.description,
        price: formData.value.price,
        status: formData.value.status,
        store_id: formData.value.store_id || 1, // 假设store字段对应后端的store_id
        totalCount: formData.value.totalCount,
        availableCount: formData.value.availableCount,
        cover: formData.value.cover || 'https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&w=400'
      }
      
      let response
      if (dialogMode.value === 'create') {
        // 创建新商品
        response = await createProduct(productData)
        if (response.code === 0) {
          MessagePlugin.success('新建成功')
        } else {
          MessagePlugin.error(response.msg || '创建失败')
          return
        }
      } else {
        // 更新商品
        response = await updateProduct(formData.value.id as string, productData)
        if (response.code === 0) {
          MessagePlugin.success('更新成功')
        } else {
          MessagePlugin.error(response.msg || '更新失败')
          return
        }
      }
      
      fetchData() // 重新加载数据
      isDialogVisible.value = false
    } catch (error) {
      console.error('保存商品错误:', error)
      MessagePlugin.error(dialogMode.value === 'create' ? '创建失败' : '更新失败')
    } finally {
      isLoading.value = false
    }
  }
}

// 获取商铺列表
const fetchStores = async () => {
  try {
    const response = await getAllStores()
    if (response.code === 0) {
      storeList.value = response.data.map((store: any) => ({
        id: store.id,
        name: store.name
      }))
    } else {
      MessagePlugin.error(response.msg || '获取商铺列表失败')
    }
  } catch (error) {
    console.error('获取商铺列表错误:', error)
    MessagePlugin.error('获取商铺列表失败')
  }
}

onMounted(() => {
  fetchData()
  fetchStores()
})
</script>

<style lang="less" scoped>
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .filter-group {
    display: flex;
    gap: 8px;
  }

  .search-input {
    width: 240px;
  }
}

.product-cover {
  width: 80px;
  height: 45px;
  border-radius: 4px;
  object-fit: cover;
}
</style>
