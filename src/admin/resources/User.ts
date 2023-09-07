import type { Resource } from '../Undertheground'

const User: Resource = {
  id: 'user',
  add: true,
  fields: [
    { title: 'user.Name', key: 'Name' },
    { title: 'user.PlanName', key: 'PlanName' },
    { title: 'user.DaysLeft', key: 'DaysLeft' },
    { title: 'user.RemainingVolume', key: 'RemainingVolume' },
    { title: 'user.UsedVolume', key: 'UsedVolume' },
    { title: 'user.ExpireDate', key: 'ExpireDate' },
    { title: 'user.SubLink', key: 'SubLink', type: 'Link' },
    { title: 'کد QR', key: 'SubLink', type : 'QRCode' },
  ],
}

export default User
