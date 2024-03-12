const Brand = () => {};

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/moskva/brand",
      permanent: true,
    },
  };
}

export default Brand;
