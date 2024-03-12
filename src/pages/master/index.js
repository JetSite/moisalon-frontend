const Master = () => {};

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/moskva/master",
      permanent: true,
    },
  };
}

export default Master;
