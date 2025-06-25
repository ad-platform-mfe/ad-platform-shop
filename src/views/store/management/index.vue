<template>
  <t-card :bordered="false">
    <div class="action-bar">
      <t-button @click="handleCreate">新建店铺</t-button>
      <div class="filter-group">
        <t-input
          v-model="searchKeyword"
          placeholder="请输入店铺名称"
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
        <t-form-item label="店铺名称" name="name">
          <t-input
            v-model="formData.name"
            placeholder="请输入店铺名称"
          ></t-input>
        </t-form-item>
        <t-form-item label="店铺地址" name="address">
          <t-input
            v-model="formData.address"
            placeholder="请输入店铺地址"
          ></t-input>
        </t-form-item>
        <t-form-item label="联系电话" name="phone">
          <t-input
            v-model="formData.phone"
            placeholder="请输入联系电话"
          ></t-input>
        </t-form-item>

        <t-form-item label="店铺描述" name="description">
          <t-textarea
            v-model="formData.description"
            placeholder="请输入店铺描述"
          ></t-textarea>
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
  Tag as TTag,
  Space as TSpace,
  Popconfirm as TPopconfirm,
  Dialog as TDialog,
  Form as TForm,
  FormItem as TFormItem,
  Textarea as TTextarea,
  RadioGroup as TRadioGroup,
  Radio as TRadio,
  MessagePlugin,
  type PageInfo,
  type TableProps,
  type FormInstanceFunctions,
  type FormRules
} from 'tdesign-vue-next'
import { SearchIcon as TIconSearch } from 'tdesign-icons-vue-next'
import type { Store } from './types'
// 导入API函数
import { 
  getAllStores, 
  getStoreById, 
  createStore, 
  updateStore, 
  deleteStore 
} from '@/api/store'

// 导入模拟数据（开发阶段使用）
import { mockStores } from './_mock'

const tableData = ref<Store[]>([])
const isLoading = ref(false)
const searchKeyword = ref('')

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

const isDialogVisible = ref(false)
const dialogMode = ref<'create' | 'edit'>('create')
const formData = ref<Partial<Store>>({})
const form = ref<FormInstanceFunctions | null>(null)

const dialogTitle = computed(() =>
  dialogMode.value === 'create' ? '新建店铺' : '编辑店铺'
)

const rules: Record<string, any> = {
  name: [{ required: true, message: '店铺名称必填', type: 'error' }],
  address: [{ required: true, message: '店铺地址必填', type: 'error' }],
  phone: [{ required: true, message: '联系电话必填', type: 'error' }],

}

const columns: TableProps['columns'] = [
  { colKey: 'name', title: '店铺名称', ellipsis: true },
  { colKey: 'address', title: '店铺地址', ellipsis: true },
  { colKey: 'phone', title: '联系电话', width: 120 },


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
    // 调用API获取店铺数据
    const response = await getAllStores()
    
    if (response.code === 0) {
      let stores = response.data
      
      // 如果有搜索关键词，进行客户端过滤
      if (searchKeyword.value) {
        stores = stores.filter((store: Store) => 
          store.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
        )
      }
      
      pagination.value.total = stores.length
      
      // 客户端分页处理
      const startIndex = (pagination.value.current - 1) * pagination.value.pageSize
      const endIndex = startIndex + pagination.value.pageSize
      tableData.value = stores.slice(startIndex, endIndex)
    } else {
      MessagePlugin.error(response.msg || '获取店铺数据失败')
      // 开发阶段使用模拟数据
      tableData.value = mockStores
      pagination.value.total = mockStores.length
    }
  } catch (error) {
    console.error('获取店铺数据错误:', error)
    MessagePlugin.error('数据加载失败')
    // 开发阶段使用模拟数据
    tableData.value = mockStores
    pagination.value.total = mockStores.length
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
  formData.value = {}
  isDialogVisible.value = true
}

const handleEdit = async (row: Store) => {
  dialogMode.value = 'edit'
  isLoading.value = true
  try {
    // 获取最新的店铺详情
    const response = await getStoreById(row.id)
    if (response.code === 0) {
      formData.value = response.data
    } else {
      MessagePlugin.error(response.msg || '获取店铺详情失败')
      // 开发阶段使用模拟数据
      formData.value = { ...row }
      return
    }
  } catch (error) {
    console.error('获取店铺详情错误:', error)
    MessagePlugin.error('获取店铺详情失败')
    // 开发阶段使用模拟数据
    formData.value = { ...row }
    return
  } finally {
    isLoading.value = false
  }
  isDialogVisible.value = true
}

const handleDelete = async (row: Store) => {
  isLoading.value = true
  try {
    // 调用删除API
    const response = await deleteStore(row.id)
    if (response.code === 0) {
      MessagePlugin.success('删除成功')
      fetchData() // 重新加载数据
    } else {
      MessagePlugin.error(response.msg || '删除失败')
    }
  } catch (error) {
    console.error('删除店铺错误:', error)
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
      const storeData = {
        name: formData.value.name,
        address: formData.value.address,
        phone: formData.value.phone,
        description: formData.value.description
      }
      
      let response
      if (dialogMode.value === 'create') {
        // 创建新店铺
        response = await createStore(storeData)
        if (response.code === 0) {
          MessagePlugin.success('新建成功')
        } else {
          MessagePlugin.error(response.msg || '创建失败')
          return
        }
      } else {
        // 更新店铺
        response = await updateStore(formData.value.id as string, storeData)
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
      console.error('保存店铺错误:', error)
      MessagePlugin.error(dialogMode.value === 'create' ? '创建失败' : '更新失败')
    } finally {
      isLoading.value = false
    }
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
</style>