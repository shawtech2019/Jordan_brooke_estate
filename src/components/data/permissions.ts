import type { PermissionGroup, RoleColumn } from './types'

export const roleColumns: RoleColumn[] = [
  { key: 'adminGlobal', label: 'Admin Global' },
  { key: 'propertyManager', label: 'Property Manager' },
  { key: 'leasingAgent', label: 'Leasing Agent' },
  { key: 'facilityManager', label: 'Facility Manager' },
  { key: 'financeInvestors', label: 'Finance/ Investors' },
  { key: 'securityPersonel', label: 'Security Personel' },
]

export const permissionGroups: PermissionGroup[] = [
  {
    title: 'Property Management',
    rows: [
      {
        label: 'View Listings',
        values: {
          adminGlobal: 'Open',
          propertyManager: 'Open',
          leasingAgent: 'Open',
          facilityManager: 'Open',
          financeInvestors: 'Open',
          securityPersonel: 'Open',
        },
      },
      {
        label: 'Edit properties',
        values: {
          adminGlobal: 'Open',
          propertyManager: 'Limited',
          leasingAgent: 'Limited',
          facilityManager: 'Limited',
          financeInvestors: 'Limited',
          securityPersonel: 'Limited',
        },
      },
      {
        label: 'Delete Units',
        values: {
          adminGlobal: 'Open',
          propertyManager: 'Denied',
          leasingAgent: 'Denied',
          facilityManager: 'Denied',
          financeInvestors: 'Denied',
          securityPersonel: 'Denied',
        },
      },
    ],
  },
  {
    title: 'Sales & Rental',
    rows: [
      {
        label: 'Track Leads',
        values: {
          adminGlobal: 'Open',
          propertyManager: 'Open',
          leasingAgent: 'Open',
          facilityManager: 'Open',
          financeInvestors: 'Denied',
          securityPersonel: 'Denied',
        },
      },
      {
        label: 'Generate Contracts',
        values: {
          adminGlobal: 'Open',
          propertyManager: 'Limited',
          leasingAgent: 'Limited',
          facilityManager: 'Limited',
          financeInvestors: 'Limited',
          securityPersonel: 'Limited',
        },
      },
      {
        label: 'E-Sign Integration',
        values: {
          adminGlobal: 'Open',
          propertyManager: 'Denied',
          leasingAgent: 'Denied',
          facilityManager: 'Denied',
          financeInvestors: 'Denied',
          securityPersonel: 'Denied',
        },
      },
    ],
  },
  {
    title: 'Facilities',
    rows: [
      {
        label: 'Submit Requests',
        values: {
          adminGlobal: 'Grant Access',
          propertyManager: 'Limited',
          leasingAgent: 'Denied',
          facilityManager: 'Denied',
          financeInvestors: 'Denied',
          securityPersonel: 'Denied',
        },
      },
      {
        label: 'Assign Tasks',
        values: {
          adminGlobal: 'Grant Access',
          propertyManager: 'Limited',
          leasingAgent: 'Limited',
          facilityManager: 'Denied',
          financeInvestors: 'Limited',
          securityPersonel: 'Denied',
        },
      },
      {
        label: 'Vendor Access',
        values: {
          adminGlobal: 'Grant Access',
          propertyManager: 'Denied',
          leasingAgent: 'Denied',
          facilityManager: 'Denied',
          financeInvestors: 'Denied',
          securityPersonel: 'Denied',
        },
      },
    ],
  },
  {
    title: 'Financials',
    rows: [
      {
        label: 'View Cash Flow',
        values: {
          adminGlobal: 'Grant Access',
          propertyManager: 'Open',
          leasingAgent: 'Open',
          facilityManager: 'Limited',
          financeInvestors: 'Limited',
          securityPersonel: 'Denied',
        },
      },
      {
        label: 'Collect Payments',
        values: {
          adminGlobal: 'Grant Access',
          propertyManager: 'Limited',
          leasingAgent: 'Limited',
          facilityManager: 'Limited',
          financeInvestors: 'Limited',
          securityPersonel: 'Denied',
        },
      },
      {
        label: 'Process Payouts',
        values: {
          adminGlobal: 'Grant Access',
          propertyManager: 'Denied',
          leasingAgent: 'Denied',
          facilityManager: 'Denied',
          financeInvestors: 'Limited',
          securityPersonel: 'Denied',
        },
      },
    ],
  },
]
