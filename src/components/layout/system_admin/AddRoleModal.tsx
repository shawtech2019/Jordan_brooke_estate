import { useState } from 'react'
import Modal from './Modal'
import { permissionGroups } from '../../data/permissions'

interface AddRoleModalProps {
  open: boolean
  onClose: () => void
  onCreate: (roleName: string) => void
}

type PermissionSelection = Record<string, boolean>

function buildInitialSelection(): PermissionSelection {
  const selection: PermissionSelection = {}
  permissionGroups.forEach((group) => {
    group.rows.forEach((row) => {
      selection[`${group.title}::${row.label}`] = false
    })
  })
  return selection
}

export default function AddRoleModal({ open, onClose, onCreate }: AddRoleModalProps) {
  const [roleName, setRoleName] = useState('')
  const [baseTemplate, setBaseTemplate] = useState('Blank')
  const [selection, setSelection] = useState<PermissionSelection>(buildInitialSelection)
  const [error, setError] = useState('')

  const toggleRow = (key: string) =>
    setSelection((prev) => ({ ...prev, [key]: !prev[key] }))

  const toggleGroup = (groupTitle: string, rows: { label: string }[], checkAll: boolean) =>
    setSelection((prev) => {
      const next = { ...prev }
      rows.forEach((row) => {
        next[`${groupTitle}::${row.label}`] = checkAll
      })
      return next
    })

  const resetForm = () => {
    setRoleName('')
    setBaseTemplate('Blank')
    setSelection(buildInitialSelection())
    setError('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleCreate = () => {
    if (!roleName.trim()) {
      setError('Give the role a name before creating it.')
      return
    }
    onCreate(roleName.trim())
    resetForm()
    onClose()
  }

  const selectedCount = Object.values(selection).filter(Boolean).length

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add New Role"
      description="Create a role and choose which permissions it starts with. You can fine-tune access later from the matrix."
      widthClassName="max-w-3xl"
      footer={
        <>
          <button
            onClick={handleClose}
            className="rounded-md border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="rounded-md border border-slate-300 bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Create Role
          </button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="role-name" className="mb-1 block text-sm font-medium text-slate-700">
              Role name
            </label>
            <input
              id="role-name"
              type="text"
              value={roleName}
              onChange={(e) => {
                setRoleName(e.target.value)
                if (error) setError('')
              }}
              placeholder="e.g. Regional Manager"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-accent"
            />
            {error && <p className="mt-1 text-xs font-medium text-status-denied">{error}</p>}
          </div>
          <div>
            <label
              htmlFor="base-template"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Start from template
            </label>
            <select
              id="base-template"
              value={baseTemplate}
              onChange={(e) => setBaseTemplate(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-brand-accent"
            >
              <option>Blank</option>
              <option>Property Manager</option>
              <option>Leasing Agent</option>
              <option>Facility Manager</option>
              <option>Finance/Investors</option>
              <option>Security Personel</option>
            </select>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Permissions</p>
            <span className="text-xs text-slate-500">{selectedCount} selected</span>
          </div>
          <div className="space-y-4 rounded-lg border border-slate-200 p-4">
            {permissionGroups.map((group) => {
              const allChecked = group.rows.every(
                (row) => selection[`${group.title}::${row.label}`]
              )
              return (
                <div key={group.title}>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">{group.title}</p>
                    <button
                      onClick={() => toggleGroup(group.title, group.rows, !allChecked)}
                      className="text-xs font-medium text-brand-accent hover:underline"
                    >
                      {allChecked ? 'Clear all' : 'Select all'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {group.rows.map((row) => {
                      const key = `${group.title}::${row.label}`
                      return (
                        <label
                          key={key}
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <input
                            type="checkbox"
                            checked={!!selection[key]}
                            onChange={() => toggleRow(key)}
                            className="h-4 w-4 rounded border-slate-300 text-brand-accent focus:ring-brand-accent"
                          />
                          {row.label}
                        </label>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Modal>
  )
}
