const formatDate = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'short',
  }).format(new Date(date))

  return formattedDate
}

export default formatDate
