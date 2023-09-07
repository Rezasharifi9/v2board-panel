import type { Resource } from '@/admin/Undertheground'
import { useTranslation } from 'next-i18next'
import Pagination from '../Pagination'
import Modal from '../Modal'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { QrCodeIcon } from '@heroicons/react/20/solid'
import QRCode from 'react-qr-code'

type GridProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[] | undefined
  resource?: Resource
  loading: boolean
  pageNumber?: number
  setPageNumber?: (v: number) => void
  totalCount?: number
  onDelete?: (id: string) => void
}

export default function DataGrid({
  data,
  resource,
  loading,
  pageNumber,
  setPageNumber,
  totalCount,
}: GridProps) {
  const { t } = useTranslation('common')
  

  const [showQRCodeModal, setShowQRCodeModal] = useState(false)
  const selectedLink = useRef<string>()

  const fields = resource?.fields

  return (
    <div className="h-full flex flex-col justify-between flex-1 rounded-sm">
      <div className="w-full overflow-x-auto bg-light shadow-sm ">
        <table className="w-full table-auto ">
          <thead className="">
            <tr className="h-12 border border-gray-200 ">
              {fields &&
                fields.map((field, i) => (
                  <th
                    scope="col"
                    key={i}
                    className="text-sm py-1 px-1 border  border-gray-200 text-center font-bold"
                  >
                    <p className=" whitespace-nowrap break-keep">
                      {' '}
                      {t(field.title, { ns: 'table' })}
                    </p>
                  </th>
                ))}
            </tr>
          </thead>

          <tbody className="font-medium rounded-b-lg bg-white text-slate-600 ">
            {loading ? (
              <tr className="w-full py-3 border-b-[2px] last:border-0 border-gray-200">
                <td
                  className="p-4 text-sm text-gray-600 align-middle  whitespace-nowrap text-start"
                  colSpan={99}
                >
                  {t('loading')}
                </td>
              </tr>
            ) : data?.length ? (
              data.map((item, i) => (
                <tr
                  className="shadow-sm w-full py-4 border-b-[1px] text-center last:border-0 border-gray-200"
                  key={i}
                >
                  {fields &&
                    fields.map((field, j) => {
                      return (
                        <td
                          className="p-4 text-sm whitespace-nowrap"
                          onClick={() => {
                            if (field.type === 'Link') {
                              navigator.clipboard.writeText(item[field.key])
                              toast.success(t('link-copied-successfully'))
                            }
                            if (field.type === 'QRCode') {
                              selectedLink.current = item[field.key]
                              setShowQRCodeModal(true)
                            }
                          }}
                          key={j}
                        >
                          {item[field.key] != null ? (
                            field.type === 'Date' ? (
                              new Intl.DateTimeFormat('fa-IR', {
                                dateStyle: 'short',
                                timeStyle: 'short',
                              }).format(new Date(item[field.key]))
                            ) : field.type === 'DateDay' ? (
                              new Intl.DateTimeFormat('fa-IR', {
                                dateStyle: 'short',
                              }).format(new Date(item[field.key]))
                            ) : field.type === 'Text' ? (
                              (item[field.key] + '').substring(0, 25) + '...'
                            ) : field.type === 'Image' ? (
                              <a
                                href={item[field.key]}
                                className="font-bold"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {t('click')}
                              </a>
                            ) : field.type === 'Status' ? (
                              item[field.key] === true ? (
                                <div className="bg-light_green text-[12px] m-auto font-semibold h-[21px] w-[45px] text-center rounded-[8px] text-dark_green">
                                  {t('فعال')}
                                </div>
                              ) : (
                                <div className=" bg-red-200 text-[12px] m-auto font-semibold h-[21px] w-[62px] text-center rounded-[8px] text-red-600">
                                  {t('غیرفعال')}
                                </div>
                              )
                            ) : field.type === 'stringArray' ? (
                              item[field.key].map(
                                (value: string, index: number) =>
                                  `${value}${index === item[field.key].length - 1 ? '' : '، '}`
                              )
                            ) : field.type === 'Link' ? (
                              <div className="bg-light2 cursor-pointer text-sm py-1 px-2 w-fit m-auto rounded-lg">
                                {t('copy-link')}
                              </div>
                            ) : field.type === 'QRCode' ? (
                              <div className="cursor-pointer text-sm py-1 px-2 w-fit m-auto rounded-lg">
                                <QrCodeIcon className="h-8 w-8" />
                              </div>
                            ) : typeof item[field.key] === 'boolean' ? (
                              item[field.key] === true ? (
                                t('yes')
                              ) : (
                                t('no')
                              )
                            ) : (
                              item[field.key]
                            )
                          ) : field.key.split('.').length === 2 ? (
                            field.type === 'DateDay' ? (
                              new Intl.DateTimeFormat('fa-IR', {
                                dateStyle: 'short',
                              }).format(
                                new Date(item[field.key.split('.')[0]][field.key.split('.')[1]])
                              )
                            ) : (
                              item[field.key.split('.')[0]][field.key.split('.')[1]]
                            )
                          ) : (
                            '—'
                          )}
                        </td>
                      )
                    })}
                </tr>
              ))
            ) : (
              <tr className="w-full py-3 border-b-2 text-center last:border-0 border-gray-200">
                <td
                  className="p-4 text-sm text-gray-600 align-middle  whitespace-nowrap text-start"
                  colSpan={99}
                >
                  {t('not_found')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalCount && totalCount > 5 && pageNumber && setPageNumber ? (
        <Pagination
          limit={5}
          currentPage={pageNumber}
          paginate={setPageNumber}
          totalCount={totalCount}
        />
      ) : null}
      <Modal
        isOpen={showQRCodeModal}
        setIsOpen={setShowQRCodeModal}
        message={<QRCode value={selectedLink.current ?? ''} />}
        title={t('scan-QR-code')}
      />
    </div>
  )
}
