const Page = () => {
  return <p></p>
}

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/login',
    },
  }
}

export default Page
