const Salon = () => {};

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/moskva/salon",
      permanent: true,
    },
  };
}

export default Salon;
