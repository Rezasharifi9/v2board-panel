type Field = {
  title: string
  type?:
    | 'Date'
    | 'DateDay'
    | 'Text'
    | 'File'
    | 'Image'
    | 'Number'
    | 'Status'
    | 'stringArray'
    | 'Link'
    | 'QRCode'
  key: string
}

type Resource = {
  id: string
  add?: boolean
  fields?: Field[]
}

export type { Resource, Field }
