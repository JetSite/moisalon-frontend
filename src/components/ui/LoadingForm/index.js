import React from "react";
import { Container } from "../../../styles/common";
import { Button, Group, InputFull, InputSmall, SkeletonWrap } from "./styled";

const LoadingForm = () => {
  return (
    <Container>
      <div>
        <Group>
          <SkeletonWrap width={"40%"} height={40} />
          <SkeletonWrap width={"100%"} height={15} />
          <SkeletonWrap width={"60%"} height={15} />
          <Button variant="rect" width={130} />
          <Button variant="rect" width={170} />
          <Button variant="rect" width={150} />
          <Button variant="rect" width={140} />
          <Button variant="rect" width={130} />
          <Button variant="rect" width={170} />
          <Button variant="rect" width={150} />
        </Group>
        <Group>
          <SkeletonWrap width={"40%"} height={40} />
          <SkeletonWrap width={"100%"} height={15} />
          <SkeletonWrap width={"60%"} height={15} />
          <InputSmall variant="rect" />
          <InputSmall variant="rect" />
          <InputSmall variant="rect" />
        </Group>
        <Group>
          <SkeletonWrap width={"40%"} height={40} />
          <SkeletonWrap width={"100%"} height={15} />
          <SkeletonWrap width={"60%"} height={15} />
          <InputFull variant="rect" />
          <InputFull variant="rect" />
          <InputFull variant="rect" />
        </Group>
      </div>
    </Container>
  );
};

export default LoadingForm;
