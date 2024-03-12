import { addApolloState, initializeApollo } from "../../../../apollo-client";
import { educationSearchById } from "../../../_graphql-legacy/education/educationSearchById";
import EducationPage from "../../../components/pages/EducationPage";
import { getCategories } from "../../../_graphql-legacy/advices/getCategories";
import { getAll } from "../../../_graphql-legacy/advices/getAll";
import { educationReviews } from "../../../_graphql-legacy/education/educationReviews";
import { scoreEducation } from "../../../_graphql-legacy/education/scoreEducation";

const EducationDetailed = ({
  educationData,
  beautyCategories,
  beautyAllContent,
  dataReviews,
  dataScoreRes,
}) => {
  return (
    <EducationPage
      dataReviews={dataReviews}
      educationData={educationData}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
      dataScoreRes={dataScoreRes}
      loading={false}
    />
  );
};

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  const eduRes = await apolloClient.query({
    query: educationSearchById,
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
  const reviews = await apolloClient.query({
    query: educationReviews,
    variables: { id: params.id },
  });
  const score = await apolloClient.query({
    query: scoreEducation,
    variables: { id: params.id },
  });

  return addApolloState(apolloClient, {
    props: {
      educationData: eduRes?.data?.edu,
      beautyCategories: categories?.data?.catagories,
      beautyAllContent: all.data?.pages,
      dataReviews: reviews?.data?.comments || [],
      dataScoreRes: score?.data,
    },
  });
}

export default EducationDetailed;
