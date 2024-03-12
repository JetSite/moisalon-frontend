import { Wrapper, Tag } from "./styled";

const Tags = ({ tags, queryTag }) => {
  return (
    <Wrapper>
      {tags?.map((item, i) => (
        <Tag key={i} onClick={() => queryTag(item)}>
          {item}
        </Tag>
      ))}
    </Wrapper>
  );
};

export default Tags;
