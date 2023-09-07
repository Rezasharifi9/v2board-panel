import { toast } from 'react-toastify'

const handleError = (e: unknown) => {
  if (typeof e == 'object' && e !== null && 'message' in e && typeof e.message == 'string') {
    toast.error(e.message)
  } else if (typeof e == 'object' && e !== null && 'message' in e && Array.isArray(e.message)) {
    e.message.map((m) => {
      if (typeof m == 'string') toast.error(m)
    })
  }
}

export default handleError
