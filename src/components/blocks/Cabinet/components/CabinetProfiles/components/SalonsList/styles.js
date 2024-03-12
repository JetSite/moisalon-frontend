import styled from "styled-components";

export const SalonsContent = styled.div`
  margin-bottom: 82px;
  margin-top: 97px;
  padding-top: 15px;
`;

export const Title = styled.h3`
  margin-bottom: 40px;
  font-size: 22px;
  font-weight: 600;
`;

export const ListWrapper = styled.div`
  max-width: 572px;
  margin-bottom: 78px;

  a {
    display: block;
    color: #000;
    &:not(:last-child) {
      margin-bottom: 11px;
    }
  }
`;

export const ItemWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 172px;
  padding: 19px 78px 27px 78px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  }

  &:before {
    content: "";
    position: absolute;
    top: 19px;
    left: 35px;
    width: 31px;
    height: 31px;
    border-radius: 50%;
    background: ${({ logoUrl }) =>
      logoUrl ? `url(${logoUrl}) no-repeat center` : "#e3e3e3"};
    background-size: cover;
  }
`;

export const TopInfo = styled.div`
  padding: 4px 0 16px 16px;
  border-bottom: 1px solid #e3e3e3;
`;

export const BottomInfo = styled.div`
  padding-top: 14px;
  padding-left: 16px;
`;

export const Name = styled.h5`
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
`;

export const Address = styled.p`
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
`;

export const WorkingPlaces = styled.div`
  min-height: 43px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 50px;
`;

export const Published = styled.div`
  min-height: 43px;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Info = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-transform: uppercase;
`;

export const AdditionalText = styled.p`
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
`;
