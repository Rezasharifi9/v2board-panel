import type { ReactNode } from 'react'

type ContainerProps = {
  title: string
  children: ReactNode
  cols?: boolean
}

const ViewContainer = ({ children, cols }: ContainerProps) => {
  return (
    <div className="flex flex-col gap-8 justify-between h-full">
      <div
        className={cols ? 'grid grid-cols-1 sm:grid-cols-2 gap-8 ' : 'flex flex-col gap-8 flex-1'}
      >
        {children}
      </div>
    </div>
  )
}

export default ViewContainer
