import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 80px;
  margin-bottom: 61px;
`;

export const Review = styled.div`
  width: 100%;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  padding: 40px;
`;

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const Name = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

export const Text = styled.p`
  font-size: 14px;
  line-height: 27px;
`;

export const Button = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 176px;
  height: 28px;
  margin-top: 54px;
  border: 1px solid #000;
  border-radius: 50px;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  cursor: pointer;
`;

export const NoReviews = styled.div`
  min-height: 50px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
`;
