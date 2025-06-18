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
  MessagePlugin,
  type PageInfo,
  type TableProps,
  type FormInstanceFunctions,
  type FormRules
} from 'tdesign-vue-next'
import { SearchIcon as TIconSearch } from 'tdesign-icons-vue-next'
import { mockProducts } from './_mock'
import type { Product } from './types'

const tableData = ref<Product[]>([])
const isLoading = ref(false)
const searchKeyword = ref('')

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
  status: [{ required: true, message: '状态必选', type: 'error' }]
}

const columns: TableProps['columns'] = [
  { colKey: 'name', title: '商品名称', ellipsis: true },
  { colKey: 'cover', title: '封面', width: 120 },
  {
    colKey: 'price',
    title: '价格',
    width: 100,
    sorter: (a, b) => a.price - b.price
  },
  { colKey: 'status', title: '状态', width: 100 },
  {
    colKey: 'createdAt',
    title: '创建时间',
    width: 180,
    sorter: (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  },
  { colKey: 'op', title: '操作', width: 150 }
]

const fetchData = async () => {
  isLoading.value = true
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    const filteredData = mockProducts.filter((p) =>
      p.name.includes(searchKeyword.value)
    )
    pagination.value.total = filteredData.length

    const startIndex =
      (pagination.value.current - 1) * pagination.value.pageSize
    const endIndex = startIndex + pagination.value.pageSize
    tableData.value = filteredData.slice(startIndex, endIndex)
  } catch (error) {
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
  formData.value = { status: 'draft', price: 0 }
  isDialogVisible.value = true
}

const handleEdit = (row: Product) => {
  dialogMode.value = 'edit'
  formData.value = { ...row }
  isDialogVisible.value = true
}

const handleDelete = async (row: Product) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))
  const index = mockProducts.findIndex((p) => p.id === row.id)
  if (index > -1) {
    mockProducts.splice(index, 1)
  }
  fetchData()
  MessagePlugin.success('删除成功')
}

const onDialogConfirm = async () => {
  const result = await form.value?.validate()
  if (result === true) {
    await new Promise((resolve) => setTimeout(resolve, 300))
    if (dialogMode.value === 'create') {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.value.name || '',
        description: formData.value.description || '',
        price: formData.value.price ?? 0,
        status: formData.value.status || 'draft',
        cover:
          'https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&w=400',
        createdAt: new Date().toISOString()
      }
      mockProducts.unshift(newProduct)
      MessagePlugin.success('新建成功')
    } else {
      const index = mockProducts.findIndex((p) => p.id === formData.value.id)
      if (index > -1) {
        mockProducts[index] = { ...mockProducts[index], ...formData.value }
      }
      MessagePlugin.success('更新成功')
    }
    fetchData()
    isDialogVisible.value = false
  }
}

onMounted(() => {
  fetchData()
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
