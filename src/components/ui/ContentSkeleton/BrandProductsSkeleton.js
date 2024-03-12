import React from "react";
import styled from "styled-components";
import { Skeleton } from "@material-ui/lab";
import Header from "../../pages/Brand/ViewBrand/components/Header";
import { laptopBreakpoint } from "../../../../styles/variables";
import FilterCatalog from "../../ui/FilterCatalog";

const Wrapper = styled.div`
  padding: 0 140px;
  margin-top: 80px;
  margin-bottom: 80px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 70px;
  }
`;

const LinesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
  flex-wrap: wrap;
`;

const SkeletonRectSmall = styled(Skeleton)`
  margin-bottom: 35px;
`;

const SkeletonRectBig = styled(Skeleton)`
  margin-top: 20px;
  margin-bottom: 40px;
  width: 1160px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

const BrandProductsSkeleton = ({
  brand,
  productCategories,
  setFilter,
  selectedProduct,
  setSelectedProduct,
  filter,
}) => {
  return (
    <>
      <Header brand={brand} />
      <Wrapper>
        <FilterCatalog
          productCategories={productCategories}
          variant="black"
          type="product"
          setFilterProduct={setFilter}
          selectedProduct={selectedProduct}
          filterProduct={filter}
          setSelectedProduct={setSelectedProduct}
        />
      </Wrapper>
      <Wrapper>
        <LinesWrapper>
          <SkeletonRectSmall variant="rect" width={173} height={369} />
          <SkeletonRectSmall variant="rect" width={173} height={369} />
          <SkeletonRectSmall variant="rect" width={173} height={369} />
          <SkeletonRectSmall variant="rect" width={173} height={369} />
          <SkeletonRectSmall variant="rect" width={173} height={369} />
          <SkeletonRectSmall variant="rect" width={173} height={369} />
          <SkeletonRectSmall variant="rect" width={173} height={369} />
          <SkeletonRectSmall variant="rect" width={173} height={369} />
          <SkeletonRectSmall variant="rect" width={173} height={369} />
          <SkeletonRectSmall variant="rect" width={173} height={369} />
          <SkeletonRectSmall variant="rect" width={173} height={369} />
          <SkeletonRectSmall variant="rect" width={173} height={369} />
        </LinesWrapper>
      </Wrapper>
    </>
  );
};

export default BrandProductsSkeleton;
