import { NImage, NSpace, NSwitch } from 'naive-ui'
import dayjs from 'dayjs'
import { user } from '@/apis/permission/user'
import { usePermission } from '@/hooks/usePermission'
import { VTableColumnEditBtn, VTableColumnRemoveBtn } from '@/components/VTable'

export const columns = [
  {
    type: 'selection',
    fixed: 'left',
    align: 'center',
    width: 50,
  },
  {
    key: 'avatar',
    title: '头像',
    align: 'center',
    width: 80,
    render(row: any) {
      return h('div', { class: 'text-0px flex-center ' }, h(NImage, { src: row.avatar, objectFit: 'cover', width: 40, height: 40, style: { width: '40px', height: '40px', borderRadius: '3px' } }))
    },
  },
  {
    key: 'username',
    title: '用户名',
    align: 'center',
  },
  {
    key: 'name',
    title: '姓名',
    align: 'center',
  },
  {
    key: 'nickName',
    title: '昵称',
    align: 'center',
  },
  {
    key: 'departmentName',
    title: '部门名称',
    align: 'center',
  },
  {
    key: 'roleName',
    title: '角色',
    align: 'center',
  },
  {
    key: 'status',
    title: '状态',
    align: 'center',
    width: 80,
    render(row: any) {
      return h(NSwitch, {
        value: row.status,
        uncheckedValue: 0,
        checkedValue: 1,
        onUpdateValue: async (val: number) => {
          try {
            row.status = val
            await user.update({ ...row, status: val })
          }
          catch (err) {
            row.status = !val
          }
        },
      })
    },
  },
  {
    key: 'phone',
    title: '手机号',
    align: 'center',
  },
  {
    key: 'createTime',
    title: '创建时间',
    align: 'center',
    width: 180,
    render(row: any) {
      return dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
  },
]

export function actionColumn({ onEdit, onRemove }: any) {
  const { hasPermission } = usePermission()

  return {
    width: 140,
    render(row: any) {
      return h(NSpace, { align: 'center', justify: 'center' }, () => [
        hasPermission(['permission:user:update']) && h(VTableColumnEditBtn, { showIcon: false, onClick: () => onEdit({ id: row.id }) }),
        hasPermission(['permission:user:delete']) && h(VTableColumnRemoveBtn, { showIcon: false, fn: () => onRemove([row.id]) }),
      ])
    },
  }
}
