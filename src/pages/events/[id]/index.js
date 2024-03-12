import { addApolloState, initializeApollo } from "../../../../apollo-client";
import { eventSearchById } from "../../../_graphql-legacy/events/eventSearchById";
import { getAll } from "../../../_graphql-legacy/advices/getAll";
import { getCategories } from "../../../_graphql-legacy/advices/getCategories";
import EventPage from "../../../components/pages/EventPage";

const EventDetailed = ({ event, beautyCategories, beautyAllContent }) => {
  return (
    <EventPage
      event={event}
      loading={false}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
    />
  );
};

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  const eventRes = await apolloClient.query({
    query: eventSearchById,
    variables: { id: params.id },
  });
  const categories = await apolloClient.query({
    query: getCategories,
    context: { uri: "https://moi.salon/graphql" },
  });
  const all = await apolloClient.query({
    query: getAll,
    context: { uri: "https://moi.salon/graphql" },
  });

  return addApolloState(apolloClient, {
    props: {
      event: eventRes?.data?.event,
      beautyCategories: categories?.data?.catagories,
      beautyAllContent: all.data?.pages,
    },
  });
}

export default EventDetailed;
