import { useState, useEffect } from 'react';
import { MainContainer } from '../../../../../styles/common';
import { Wrapper, Content, TitleWrapper, Title } from './styled';
import Tabs from './components/Tabs';
import Slider from '../../../../blocks/Slider';
import { IBeautyCategories, IFeed } from '@/types/feed';
import useAuthStore from '@/store/authStore';
import { getStoreData } from '@/store/utils';

interface Props {
  beautyCategories: IBeautyCategories[];
  beautyAllContent: IFeed[];
  title: string;
}

const Ribbon = ({ title, beautyCategories, beautyAllContent }: Props) => {
  const [activeTab, setActiveTab] = useState<string | null>('');
  const [categories, setCategories] = useState<
    { id: string; title: string }[] | null
  >(null);
  const [allContent, setAllContent] = useState<IFeed[] | null>(null);
  const [categoryContent, setCategoryContent] = useState<IFeed[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { city } = useAuthStore(getStoreData);

  useEffect(() => {
    if (beautyCategories?.length > 0) {
      setCategories([
        { id: '', title: 'Все' },
        ...beautyCategories.map(category => ({
          id: category.id,
          title: category.title,
        })),
      ]);
    }
    setAllContent(beautyAllContent);
  }, [beautyCategories, beautyAllContent]);

  useEffect(() => {
    if (!activeTab) {
      setCategoryContent(null);
      return;
    }

    const category = beautyCategories.find(cat => cat.id === activeTab);
    setCategoryContent(category?.feeds || []);
  }, [activeTab, beautyCategories]);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setCategoryContent(null);
      return;
    }
    setActiveTab(null);
  }, [searchQuery]);

  const changeActiveTab = (id: string) => {
    setActiveTab(id !== activeTab ? id : null);
    setSearchQuery('');
  };

  const renderItems = categoryContent ?? allContent ?? [];

  return (
    <Wrapper>
      <MainContainer>
        <Content>
          <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper>
          <Tabs
            activeTab={activeTab}
            changeActiveTab={changeActiveTab}
            tabs={categories}
          />
          <Slider
            city={city}
            type="ribbon"
            items={renderItems}
            title=""
            bgColor="#000"
            pb={30}
            pl={20}
            noPadding
          />
        </Content>
      </MainContainer>
    </Wrapper>
  );
};

export default Ribbon;
