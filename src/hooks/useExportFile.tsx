import type { WriteFile } from '@/enhancers/exportToXSLX'
import exportToXSLX from '@/enhancers/exportToXSLX'
import { TOKEN } from '@/lib/storage-keys'
import { getCookie } from 'cookies-next'
import { useState } from 'react'
import type { XLSX$Utils } from 'xlsx'

const useExportFile = (data: string) => {
  const [loading, setLoading] = useState(false)

  const exportBTNClickHandler = async (writeFile: WriteFile, utils: XLSX$Utils) => {
    setLoading(true)
    try {
      await exportToXSLX(getCookie(TOKEN)!.toString(), data, writeFile, utils)
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.error('Export to XSLX Error:', error.message)
      }
    }
    setLoading(false)
  }

  return { exportBTNClickHandler, loading }
}

export default useExportFile
